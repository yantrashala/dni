'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('mochaTest', function(cb) {
  gulp.src(['./index.js'])
    .pipe(istanbul({
      includeUntested: true
      // Covering files
    }))
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp.src(['test/*-test.js'])
        .pipe(mocha({
          timeout: 15000
        }))
        // Creating the reports after tests runned
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});

// default task
gulp.task('default', ['mochaTest']);
