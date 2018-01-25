'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const pkg = require('./package.json');
const buildTM = new Date();

const conf = {
  NAME: pkg.name,
  DESC: pkg.description,
  BUILD_TS: buildTM.valueOf(),
  BUILD_TM: buildTM.toISOString()
};

const dirs = {
  CONTENT: 'content',
  DIST: 'dist'
};

gutil.log('Abathur: ');
gutil.log(' conf = %j', conf);
gutil.log(' dirs = %j', dirs);

require('./misc/tasks.js')({ conf: conf, dirs: dirs });
gulp.task('default', [ 'lint' ]);
