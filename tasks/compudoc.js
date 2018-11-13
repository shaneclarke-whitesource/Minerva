'use strict'

const gulp = require('gulp')
const compodoc = require('@compodoc/gulp-compodoc');
 
function run (){
    gulp.src('src/**/*.ts')
    .pipe(compodoc({
        output: 'docs',
        tsconfig: 'src/tsconfig.json',
        serve: true,
        theme: 'readthedocs',
        watch: true
    }))
}

module.exports.run = run;