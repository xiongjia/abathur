'use strict';

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const { dirs, conf } = opts;

  gulp.task('serv', () => {
    const browserSync = require('browser-sync').create();
    browserSync.init({
      server: { baseDir: dirs.DIST },
      browser: conf.BROWSER
    });
  });
};
