'use strict';

const gulp = require('gulp');
const Jasmine = require('jasmine');
const jasmine = new Jasmine();

jasmine.loadConfig({
    spec_dir: './',
    spec_files: [
        '**/*[sS]pec.js',
        '!./node_modules/**/*'
    ],
    helpers: ['helpers/**/*.js'],
    random: true,
    seed: null,
    stopSpecOnExpectationFailure: true
});

jasmine.jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

const JasmineTerminalReporter = require('jasmine-terminal-reporter');

const reporter = new JasmineTerminalReporter({
    isVerbose: true,
    includeStrackTrace: true,
    showColors: true
});

function run () {
    jasmine.env.clearReporters();
    jasmine.addReporter(reporter);
    jasmine.execute();
};

module.exports.run = run;