'use strict';

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const { dirs, conf } = opts;

  gulp.task('sass', [ 'clean:css' ], () => {
    const gulpif = require('gulp-if');
    const sass = require('gulp-sass');
    const rev = require('gulp-rev');
    const cleanCSS = require('gulp-clean-css');

    const sassOpts = {
      outputStyle: 'nested',
      precison: 6,
      errLogToConsole: true,
      includePaths: [ dirs.SRC_BOOTSTRAP_SASS + '/assets/stylesheets' ]
    };

    return gulp.src([ dirs.SRC + '/**/*.scss' ])
      .pipe(sass(sassOpts))
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(gulpif(!conf.DEBUG, rev()))
      .pipe(gulp.dest(dirs.DIST_CSS));
  });
};
