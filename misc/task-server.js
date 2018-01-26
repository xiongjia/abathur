'use strict';

exports = module.exports = (opts) => {
  const browserSync = require('browser-sync').create();
  const gulp = require('gulp');
  const { dirs, conf } = opts;
  const reload = (cb) => {
    browserSync.reload();
    cb();
  };

  gulp.task('serv', [ 'build' ], () => {
    browserSync.init({
      server: { baseDir: dirs.DIST },
      browser: conf.BROWSER
    });

    gulp.watch(dirs.BUILD + '/output/**/*.html', [ 'html-watch' ]);
    gulp.watch(dirs.SRC + '/**/*.scss', [ 'html-watch' ]);
    gulp.watch(dirs.SRC + '/assets/fav*.png', [ 'assets-watch:fav' ]);
    gulp.watch(dirs.SRC + '/assets/img/**/*', [ 'html-watch' ]);
    gulp.watch(dirs.SRC + '/**/*.js', [ 'html-watch' ]);
    gulp.watch(dirs.ORG_BASE + '/**/*.org', [ 'org-watch' ]);
  });

  gulp.task('assets-watch:fav', [ 'assets:fav' ], (cb) => reload(cb));
  gulp.task('html-watch', [ 'pages' ], (cb) => reload(cb));
  if (!conf.NO_ORG_EXPORT) {
    gulp.task('org-watch', [ 'org-exports:delta' ]);
  }
};
