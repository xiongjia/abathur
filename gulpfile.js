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
  POSTAMBLE: '{{placehold}}'
};

const dirs = {
  CONTENT: 'content',
  DIST: 'dist',
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
