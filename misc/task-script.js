'use strict';

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const gulpif = require('gulp-if');
  const seq = require('gulp-sequence');
  const { dirs, conf } = opts;

  gulp.task('js', (cb) => seq('clean:js', [ 'js:libs', 'js:bundle' ])(cb));

  gulp.task('js:libs', () => {
    const libs = [
      dirs.SRC_JQUERY + '/dist/jquery.min.js',
      dirs.SRC_BOOTSTRAP_SASS + '/assets/javascripts/bootstrap.min.js'
    ];
    return gulp.src(libs).pipe(gulp.dest(dirs.DIST_JS));
  });

  gulp.task('js:bundle', () => {
    const source = require('vinyl-source-stream');
    const buffer = require('vinyl-buffer');
    const browserify = require('browserify');
    const uglify = require('gulp-uglify');
    const envify = require('envify/custom');
    const rev = require('gulp-rev');

    const ent = {
      entries: [ dirs.SRC + '/main.js' ],
      debug: conf.DEBUG
    };

    return browserify(ent)
      .transform('babelify', { presets: [ 'env' ] })
      .transform(envify({
        ENV_DEBUG: conf.DEBUG,
        ENV_VER: conf.VER
      }))
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(gulpif(!conf.DEBUG, uglify()))
      .pipe(gulpif(!conf.DEBUG, rev()))
      .pipe(gulp.dest(dirs.DIST_JS));
  });
};
