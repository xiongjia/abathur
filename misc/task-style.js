'use strict';

const uncssBootstrapIgnore = [
  /\.affix/,
  /\.alert/,
  /\.close/,
  /\.collaps/,
  /\.fade/,
  /\.has/,
  /\.help/,
  /\.in/,
  /\.modal/,
  /\.open/,
  /\.popover/,
  /\.tooltip/
];

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const { dirs, conf } = opts;

  gulp.task('sass', [ 'clean:css' ], () => {
    const gulpif = require('gulp-if');
    const sass = require('gulp-sass');
    const rev = require('gulp-rev');
    const cleanCSS = require('gulp-clean-css');
    const postcss = require('gulp-postcss');
    const uncss = require('postcss-uncss');

    const sassOpts = {
      outputStyle: 'nested',
      precison: 6,
      errLogToConsole: true,
      includePaths: [ dirs.SRC_BOOTSTRAP_SASS + '/assets/stylesheets' ]
    };

    const postcssPlugin = [
      uncss({
        html: [
          dirs.SRC + '/**/*.html',
          dirs.ORG_OUTPUT + '/**/*.html'
        ],
        ignore: [ ...uncssBootstrapIgnore, ...[ /#ab.*/, /#table.*/]]
      }),
    ];

    return gulp.src([ dirs.SRC + '/main.scss' ])
      .pipe(sass(sassOpts))
      .pipe(postcss(postcssPlugin))
      .pipe(gulpif(!conf.DEBUG, cleanCSS({
        level: { 1: {specialComments: 0} }
      })))
      .pipe(gulpif(!conf.DEBUG, rev()))
      .pipe(gulp.dest(dirs.DIST_CSS));
  });
};
