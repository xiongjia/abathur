'use strict';

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const gulpif = require('gulp-if');
  const path = require('path');
  const { dirs, conf } = opts;

  gulp.task('pages', [ 'sass', 'js' ], () => {
    const posthtml = require('gulp-posthtml');
    const htmlbeautify = require('gulp-html-beautify');
    const htmlmin = require('gulp-htmlmin');
    const injectStr = require('gulp-inject-string');
    const inject = require('gulp-inject');

    const include = require('posthtml-include')({
      root: path.join(__dirname, '..', dirs.SRC)
    });
    const injCSSBlock = '<!-- inject:css --><!-- endinject -->';
    const injJSBlock = '<!-- inject:js --><!-- endinject -->';
    const injItems = gulp.src([
      dirs.DIST + '/**/*.css',
      dirs.DIST + '/**/jquery*.js',
      dirs.DIST + '/**/bootstrap*.js',
      dirs.DIST + '/**/bundle*.js'
    ], { read: false });


    /* TODO
     *   1. update html head
     *   2. inject js & css
     */
    return gulp.src([ dirs.ORG_OUTPUT + '/**/*.html' ])
      .pipe(posthtml(() => ({
        plugins: [ include ],
        options: {}
      })))
      .pipe(injectStr.after('</title>', injCSSBlock))
      .pipe(injectStr.before('<div id="postamble"', injJSBlock))
      .pipe(inject(injItems, { ignorePath: dirs.DIST + '/', relative: false }))
      .pipe(gulpif(conf.DEBUG, htmlbeautify({ indentSize: 2 })))
      .pipe(gulpif(!conf.DEBUG, htmlmin({ collapseWhitespace: true })))
      .pipe(gulp.dest(dirs.DIST));
  });
};
