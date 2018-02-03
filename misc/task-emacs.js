'use strict';

const path = require('path');
const _ = require('lodash');
const gutil = require('gulp-util');

const elContainer = `
<div class="container" role="main">
  <include src="components/navbar.html"></include>

  <section class="container col-md-9 col-sm-10">
    <div id="abContent"></div>
  </section>

  <section class="container col-md-3 col-sm-2">
    <div class="panel panel-default visible-md visible-lg" id="abSidePanel">
      <div class="panel-heading">
        <span class="glyphicon glyphicon-align-left panel-title"
              aria-hidden="true"></span>
      </div>
      <div id="abSidebar"></div>
    </div>
  </section>
</div>
`;

const rmTocFiles = ['missing.html', 'forbidden.html'];
const isRmToc = (fname) => !!(_.find(rmTocFiles, (i) => i === fname));
const orgConvert = ($, file) => {
  const src = path.relative(file.base, file.path);
  const rmToc = isRmToc(src);

  gutil.log('Org html file convert: %s (rmTOC %s)', src, rmToc);

  $('#preamble').after(elContainer);

  const contentHtml = $.html('#content');
  $('#content').remove();
  $('#abContent').append(contentHtml);

  const tocHtml = $.html('#table-of-contents');
  $('#table-of-contents').remove();
  $('#abSidebar').append(tocHtml);

  if (rmToc) {
    $('#abSidePanel').remove();
  } else {
    $('#table-of-contents h2').remove();
  }
};

exports = module.exports = (opts) => {
  const gulp = require('gulp');
  const seq = require('gulp-sequence');
  const { dirs } = opts;
  const { EmacsExec } = require('./emacs-exec.js');
  const emacsExec = new EmacsExec({...opts, ...{ logger: gutil.log }});

  gulp.task('org-exports:full', (cb) => seq('exports-full', 'org-stage')(cb));
  gulp.task('org-exports:delta', (cb) => seq('exports-delta', 'org-stage')(cb));
  gulp.task('org-exports:watch', (cb) => {
    seq('exports-delta', 'org-stage-watch')(cb);
  });

  gulp.task('exports-full', [ 'clean:orgOutput' ], (cb) => {
    emacsExec.orgExport({ force: true }, cb);
  });

  gulp.task('exports-delta', (cb) => {
    emacsExec.orgExport({ force: false }, cb);
  });

  gulp.task('org-stage-watch', () => {
    const cheerio = require('gulp-cheerio');
    return gulp.src(dirs.ORG_OUTPUT + '/**/*.html')
      .pipe(cheerio(orgConvert))
      .pipe(gulp.dest(dirs.ORG_STAGE));
  });

  gulp.task('org-stage', [ 'clean:orgStage' ], () => {
    const cheerio = require('gulp-cheerio');
    return gulp.src(dirs.ORG_OUTPUT + '/**/*.html')
      .pipe(cheerio(orgConvert))
      .pipe(gulp.dest(dirs.ORG_STAGE));
  });
};
