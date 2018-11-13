'use strict';

var gulp = require('gulp');

// Require task files
var sample = require('./tasks/sample');
var compudoc = require('./tasks/compudoc');

// Connect task files to gulp
gulp.task('sample', sample.run());
gulp.task('compudoc', compudoc.run());

gulp.task('default', ['sample']);
gulp.task('compudoc', ['compudoc']);