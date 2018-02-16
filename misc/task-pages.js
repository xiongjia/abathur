'use strict';

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const gulpif = require('gulp-if');
  const path = require('path');
  const { dirs, conf } = opts;

  gulp.task('pages', [ 'sass', 'js', 'assets' ], () => {
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
    const injHdrBlock = '<posthtml-head-elements></posthtml-head-elements>';
    const injItems = gulp.src([
      dirs.DIST + '/css/**/*.css',
      dirs.DIST + '/js/**/jquery*.js',
      dirs.DIST + '/js/**/bootstrap*.js',
      dirs.DIST + '/js/**/bundle*.js'
    ], { read: false });
    const headElements = require('posthtml-head-elements')({
      headElements: dirs.HDR_ELEMENTS
    });

    const exp = require('posthtml-expressions')({
      locals: { ...conf }
    });

    return gulp.src([ dirs.ORG_STAGE + '/**/*.html' ])
      .pipe(injectStr.before('<title>', injHdrBlock))
      .pipe(posthtml(() => ({
        plugins: [ include, headElements, exp ],
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
