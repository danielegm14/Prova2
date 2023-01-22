  // Requiring Gulp
//var gulp = require("gulp");
var del = require("del");
var exec = require("child_process").exec;
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var replace = require("gulp-replace");
var prompt = require("gulp-prompt");
var fs = require("fs");


const { series } = require('gulp');

// The `clean` function is not exported so it can be considered a private task.
// It can still be used within the `series()` composition.
function clean(cb) {
  // body omitted
  cb();
}

// The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function build(cb) {
  // body omitted
  cb();
}

exports.build = build;
exports.default = series(clean, build);