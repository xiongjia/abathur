'use strict';

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const del = require('del');
  const { dirs } = opts;

  gulp.task('clean', [ 'clean:all' ]);
  gulp.task('clean:all', () => del([ dirs.BUILD ]));
  gulp.task('clean:dist', () => del([ dirs.DIST ]));
  gulp.task('clean:orgOutput', () => del([ dirs.BUILD + '/output/**/*' ]));
  gulp.task('clean:orgStage', () => del([ dirs.BUILD + '/stage/**/*' ]));
  gulp.task('clean:pages', () => del([ dirs.DIST + '/**/*.html' ]));
  gulp.task('clean:css', () => del([ dirs.DIST + '/css/**/*' ]));
  gulp.task('clean:js', () => del([ dirs.DIST + '/js/**/*' ]));
  gulp.task('clean:projects', () => del([ dirs.DIST + '/projects/**/*' ]));

  gulp.task('clean:pkg:sitemap', () => del([ dirs.DIST + '/sitemap*.xml' ]));
  gulp.task('clean:assets:img', () => del([ dirs.DIST + '/assets/img/**/*' ]));
  gulp.task('clean:assets:dat', () => del([ dirs.DIST + '/assets/data/**/*' ]));
  gulp.task('clean:assets:fav', () => {
    return del([
      dirs.DIST + '/assets/favicon*.{ico,png}',
      dirs.DIST + '/fav*.{ico,png}'
    ]);
  });
  gulp.task('clean:assets:cfg', () => del([ dirs.DIST + '/.htaccess' ]));
};
