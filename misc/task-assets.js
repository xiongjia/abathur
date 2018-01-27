'use strict';

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const gutil = require('gulp-util');
  const { dirs, conf } = opts;

  gulp.task('assets', [ 'assets:img', 'assets:fav', 'assets:cfg' ]);

  gulp.task('assets:img', [ 'clean:assets:img' ], () => {
    const imagemin = require('gulp-imagemin');
    return gulp.src(dirs.SRC + '/assets/img/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest(dirs.DIST + '/assets/img'));
  });

  gulp.task('assets:cfg', [ 'clean:assets:cfg' ], () => {
    const rename = require('gulp-rename');
    return gulp.src(dirs.SCRIPTS + '/htaccess')
      .pipe(rename('/.htaccess'))
      .pipe(gulp.dest(dirs.DIST));
  });

  gulp.task('assets:fav', [ 'clean:assets:fav' ], () => {
    const favicons = require('gulp-favicons');
    return gulp.src(dirs.SRC + '/assets/fav.png')
      .pipe(favicons({
        appName: conf.NAME,
        appDescription: conf.DESC,
        developerName: conf.DEV_NAME,
        developerURL: conf.DEV_URL,
        background: '#fff',
        theme_color: '#fff',
        path: '/',
        display: 'standalone',
        orientation: 'portrait',
        version: conf.VER,
        logging: false,
        online: false,
        pipeHTML: false,
        replace: false,
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false
        }
      }))
      .on('error', gutil.log)
      .pipe(gulp.dest(dirs.DIST_ASSETS));
  });
};
