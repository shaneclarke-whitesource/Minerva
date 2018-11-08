'use strict';

var gulp = require('gulp');

// Require task files
var sample = require('./tasks/sample');
var jasmine = require('./tasks/jasmine');

// Connect task files to gulp
gulp.task('sample', sample.run());
gulp.task('jasmine', jasmine.run());


gulp.task('default', ['sample']);
gulp.task('test:unit', ['jasmine']);