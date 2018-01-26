'use strict';


exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const { dirs } = opts;

  gulp.task('fonts', () => {
    const src = [ dirs.SRC_BOOTSTRAP_SASS + '/assets/fonts/**/*' ];
    return gulp.src(src).pipe(gulp.dest(dirs.DIST_FONTS));
  });
};
