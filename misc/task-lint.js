'use strict';

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const eslint = require('gulp-eslint');
  gulp.task('lint', [ 'lint:js' ]);
  gulp.task('lint:js', () => {
    const jsSrc = [
      '**/*.js',
      '!node_modules/**',
      '!dist/**',
      '!content/assets/js/**'
    ];
    return gulp.src(jsSrc)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  });
};
