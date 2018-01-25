'use strict';

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const gulpif = require('gulp-if');
  const path = require('path');
  const { dirs, conf } = opts;

  gulp.task('pages', () => {
    const posthtml = require('gulp-posthtml');
    const htmlbeautify = require('gulp-html-beautify');
    const htmlmin = require('gulp-htmlmin');
    const include = require('posthtml-include')({
      root: path.join(__dirname, '..', dirs.SRC)
    });

    /* TODO
     *   1. update html head
     *   2. inject js & css
     */
    return gulp.src([ dirs.ORG_OUTPUT + '/**/*.html' ])
      .pipe(posthtml(() => ({
        plugins: [ include ],
        options: {}
      })))
      .pipe(gulpif(conf.DEBUG, htmlbeautify({ indentSize: 2 })))
      .pipe(gulpif(!conf.DEBUG, htmlmin({ collapseWhitespace: true })))
      .pipe(gulp.dest(dirs.DIST));
  });
};
