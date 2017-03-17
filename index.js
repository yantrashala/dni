#!/usr/bin/env node
var npm = require('npm');
var fs = require('fs');
var read = require('fs').createReadStream;
var unpack = require('tar-pack').unpack;
var path = require('path');
var fse = require('fs-extra')

var inputModuleName = process.argv[2];
var locationPath = process.argv[3];
var moduleLocation;
var dni = {};

dni.deployAndInstall = function(input, cb){
  if (input != null){
    moduleLocation = './'+ input +'/';
    npm.load(function (err) {
      if (err) { cb(err);} else{
      dni.packModule(input, moduleLocation, cb);
    }
    });
  }
  else{
    console.error('Module name not specified');
  }
}

dni.packModule = function(input, moduleLocation, cb){
  npm.commands.pack([input],true, function (err, files) {
    if (err) { cb(err) }
    else {
      var packagePath;
      console.log('Created .tgz file',files);
      packagePath = path.join(process.cwd(),files[0]);
      dni.ensureLocation(packagePath, input, moduleLocation, files[0], cb);
    }
  });
}

dni.ensureLocation = function(packagePath, input, moduleLocation, file, cb){
  if(locationPath != undefined){
    fse.ensureDir(locationPath, function (err, data) {
      if (err) cb(err)
      moduleLocation = path.join(locationPath,input);
    });
  }
  dni.unpackModule(packagePath, input, moduleLocation, file, cb);
}

dni.unpackModule = function(packagePath, input, moduleLocation, file, cb){
  read(packagePath)
  .pipe(unpack(moduleLocation+'/',{'keepFiles':true}, function (err) {
    if (err) { cb(err) }
    else {
      console.log('Extraction done');
      dni.npmInstall(input, moduleLocation, file, cb);
    }
  }));
}

dni.npmInstall = function(input, moduleLocation, file, cb){
  npm.commands.install(moduleLocation,[''],function(err,data){
    if (err) {console.log(err); cb(err) }
    else{
      console.log('npm install done');
      dni.unlinkTar(file, cb);
    }
  });
}

dni.unlinkTar = function(file, cb){
  fs.unlink(file,function(err, data) {
    if (err) { cb(err) }
    else {cb(null,'DONE')}
  });
}

if(!module.parent) {
  dni.deployAndInstall(inputModuleName, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
  });
}

module.exports = dni;
