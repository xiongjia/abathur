'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const seq = require('gulp-sequence');
const path = require('path');
const platform = require('os').platform();
const argv = require('yargs').argv;
const pkg = require('./package.json');
const buildTM = new Date();

const conf = {
  NAME: pkg.name,
  DESC: pkg.description,
  DEV_NAME: pkg.author,
  DEV_URL: pkg.repository.url,
  DEBUG: !!argv.debug,
  NO_ORG_EXPORT: !!argv.disableOrgExport,
  BUILD_TS: buildTM.valueOf(),
  BUILD_TM: buildTM.toISOString(),
  BUILD_OS: platform,
  POSTAMBLE: '<include src="components/postamble.html"></include>',
  PREAMBLE: '<include src="components/preamble.html"></include>',
  BROWSER: argv.browser ||
    (platform === 'win32') ? 'chrome.exe' : 'google chrome'
};

const dirs = {
  CONTENT: 'content',
  DIST: 'dist',
  DIST_CSS: 'dist/css',
  DIST_CSS_MAP: '.',
  DIST_FONTS: 'dist/fonts',
  DIST_ASSETS: 'dist/assets',
  DIST_JS: 'dist/js',
  DIST_JS_MAP: '.',
  BUILD: 'build',
  SRC: 'src',
  SCRIPTS: 'misc',
  HDR_ELEMENTS: path.join(__dirname, 'misc/head-element.json'),
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

gulp.task('default', [ 'build' ]);
gulp.task('build', (cb) => {
  const buildTasks = [ 'fonts', 'lint' ];
  if (!conf.NO_ORG_EXPORT) {
    buildTasks.push('org-exports:full');
  }
  const cleanTask = conf.NO_ORG_EXPORT ? 'clean:dist' : 'clean';
  seq(cleanTask, buildTasks, 'pages')(cb);
});
