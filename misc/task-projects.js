'use strict';

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const seq = require('gulp-sequence');
  const gutil = require('gulp-util');
  const path = require('path');
  const { dirs } = opts;

  gulp.task('projects', (cb) => seq('clean:projects', 'projects:capsule')(cb));
  gulp.task('projects:capsule', (cb) => {
    seq('projects:capsule:build', 'projects:capsule:pkg')(cb);
  });

  gulp.task('projects:capsule:pkg', () => {
    return gulp.src(dirs.SRC_PROJECTS + '/capsule/dist/**/*')
      .pipe(gulp.dest(dirs.DIST_PROJECTS + '/capsule'));
  });

  gulp.task('projects:capsule:build', (cb) => {
    const exec = require('child_process').exec;
    const execOpts = {
      cwd: path.join(dirs.SRC_PROJECTS, 'capsule'),
      env: {...process.env, ...{APP_SITE_ROOT: '/projects/capsule/' }}
    };
    gutil.log('building projects:capsule');
    exec('npm run build', execOpts, (err, stdout, stderr) => {
      gutil.log(stdout);
      gutil.log(stderr);
      cb();
    });
  });
};
