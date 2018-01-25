'use strict';

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const gutil = require('gulp-util');
  const { EmacsExec } = require('./emacs-exec.js');
  const emacsExec = new EmacsExec({...opts, ...{ logger: gutil.log }});

  gulp.task('org-exports:full', [ 'clean:orgOutput' ], (cb) => {
    emacsExec.orgExport({ force: true }, cb);
  });

  gulp.task('org-exports:delta', (cb) => {
    emacsExec.orgExport({ force: false }, cb);
  });
};
