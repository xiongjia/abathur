'use strict';

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const { dirs, conf } = opts;

  gulp.task('deploy', () => {
    const rsync = require('gulp-rsync');
    const rsyncOpt = {
      root: dirs.DIST + '/',
      hostname: conf.DEPLOY_HOST,
      destination: conf.DEPLOY_DEST,
      chmod: 'ugo=rwX',
      compress: true,
      archive: true,
      delete: true
    };

    return gulp.src(dirs.DIST + '/**')
      .pipe(rsync(rsyncOpt));
  });

  gulp.task('sitemap', [ 'clean:pkg:sitemap' ], () => {
    const sitemap = require('gulp-sitemap');
    gulp.src(dirs.DIST + '/**/*.html', { read: false })
      .pipe(sitemap({
        siteUrl: conf.DEPLOY_SITE
      }))
      .pipe(gulp.dest(dirs.DIST));
  });
};
