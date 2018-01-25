'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');

const conf = {
};

const dirs = {
};

gutil.log('Abathur: ');
gutil.log('  conf = %j', conf);
gutil.log('  dirs = %j', dirs);
require('./misc/tasks.js')({ conf: conf, dirs: dirs });

gulp.task('default', [ 'lint' ]);
