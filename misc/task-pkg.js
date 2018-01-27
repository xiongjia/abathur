'use strict';

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const { dirs, conf } = opts;

  gulp.task('deploy', function() {
    const rsync = require('gulp-rsync');
    const rsyncOpt = {
      root: dirs.DIST + '/',
      hostname: conf.DEPLOY_HOST,
      destination: conf.DEPLOY_DEST,
      archive: true,
      silent: false,
      compress: true
    };

    return gulp.src(dirs.DIST + '/**')
      .pipe(rsync(rsyncOpt));
  });
};
