"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
sass.compiler = require("node-sass");

const sassCompiler = () => {
  return gulp
    .src("src/scss/styles.scss")
    .pipe(sass({ outlineStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("src/css"))
    .pipe(gulp.dest("dist/css"));
};

const htmlCompiler = () => {
  return gulp
    .src("./src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
};

const jsCompiler = () => {
  return gulp
    .src("src/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
};

const watch = () => {
  gulp.watch("src/scss/**/*.scss", sassCompiler);
  gulp.watch("src/index.html", htmlCompiler);
  gulp.watch("src/js/**/*.js", jsCompiler);
};

gulp.task("default", watch);
