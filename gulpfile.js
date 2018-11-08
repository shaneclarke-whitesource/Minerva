'use strict';

var gulp = require('gulp');
var sample = require('./tasks/sample');

gulp.task('sample', sample.run());
gulp.task('default', ['sample']);