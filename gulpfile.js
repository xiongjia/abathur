'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');

const argv = require('yargs').argv;
const pkg = require('./package.json');
const buildTM = new Date();

const conf = {
  NAME: pkg.name,
  DESC: pkg.description,
  DEBUG: !!argv.debug,
  BUILD_TS: buildTM.valueOf(),
  BUILD_TM: buildTM.toISOString(),
  POSTAMBLE: '<include src="components/postamble.html"></include>'
};

const dirs = {
  CONTENT: 'content',
  DIST: 'dist',
  DEST_CSS: 'dist/css',
  DEST_CSS_MAP: '.',
  DEST_FONTS: 'dist/fonts',
  DEST_JS: 'dist/js',
  DEST_JS_MAP: '.',
  BUILD: 'build',
  SRC: 'src',
  SRC_BOOTSTRAP_SASS: 'node_modules/bootstrap-sass',
  SRC_JQUERY: 'node_modules/jquery',
  EMACS_LOG: path.join('emacs-output.log'),
  EMACS_HOME: argv.emacsHome ||
    process.env._emacs_home ||
    process.env.HOME,
  ORG_BASE: path.join(__dirname, './content'),
  ORG_OUTPUT: path.join(__dirname, './build/output')
};

gutil.log('Abathur: ');
gutil.log(' conf = %j', conf);
gutil.log(' dirs = %j', dirs);

require('./misc/tasks.js')({ conf: conf, dirs: dirs });
gulp.task('default', [ 'lint' ]);
