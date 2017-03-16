#!/usr/bin/env node
var npm = require('npm');
var fs = require('fs');
var read = require('fs').createReadStream;
var unpack = require('tar-pack').unpack;
var path = require('path');

var inputModuleName = process.argv[2];
var packageName;
var dni = {};

dni.deployAndInstall = function(input, cb){
  if (input != null){
    npm.load(function (err) {
      if (err) { cb(err);} else{
      dni.packModule(input, cb);
    }
    });
  }
  else{
    console.error('Module name not specified!!!');
  }
}

dni.packModule = function(input, cb){
  npm.commands.pack([input],true, function (err, files) {
    if (err) { cb(err) }
    else {
      console.log('Created .tgz file!!!',files);
      var packagePath = path.join(process.cwd(),files[0]);
      dni.unpackModule(packagePath, input, files[0], cb);
    }
  });
}

dni.unpackModule = function(packagePath, input, file, cb){
  read(packagePath)
  .pipe(unpack('./'+ input +'/',{'keepFiles':true}, function (err) {
    if (err) { cb(err) }
    else {
      console.log('Extraction done!!!');
      dni.npmInstall(input, file, cb);
    }
  }));
}

dni.npmInstall = function(input, file, cb){
  npm.commands.install( './'+ input +'/',[''],function(err,data){
    if (err) {console.log(err); cb(err) }
    else{
      console.log('npm install done!!!');
      dni.unlinkTar(file, cb);
    }
  });
}

dni.unlinkTar = function(file, cb){
  fs.unlink(file,function(err, data) {
    if (err) { cb(err) }
    else {cb(null,'DONE!!!')}
  });
}

if(!module.parent) {
  dni.deployAndInstall(inputModuleName, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
  });
}

module.exports = dni;
