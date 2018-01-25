'use strict';

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const del = require('del');
  const { dirs } = opts;

  gulp.task('clean:all', () => del([ dirs.DEST, dirs.BUILD ]));
  gulp.task('clean:orgOutput', () => del([ dirs.BUILD + '/output' ]));
  gulp.task('clean:pages', () => del([ dirs.DIST + '/**/*.html' ]));
  gulp.task('clean:css', () => del([ dirs.DIST + '/css/**/*' ]));
  gulp.task('clean:js', () => del([ dirs.DIST + '/js/**/*' ]));
};
