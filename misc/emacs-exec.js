'use strict';

const childProc = require('child_process');
const path = require('path');
const fs = require('fs');

class EmacsExec {
  constructor(opts) {
    this.log = opts.logger;
    this.emacsLog = path.join('emacs-output.log');
    this.emacsHome = opts.emacsHome ||
      process.env._emacs_home || process.env.HOME;
    this.orgBaseDir = path.join(__dirname, '../content');
    this.orgOutputDir = path.join(__dirname, '../build/output');
    this.orgPostamble = '{{placehold}}';
    this.log('EmacsExec: home %s', this.emacsHome);
  }

  orgExport(args, cb) {
    const exportArgs = {
      _AB_BASE_DIR: this.orgBaseDir,
      _AB_OUTPUT_DIR: this.orgOutputDir,
      _AB_POSTAMBLE: this.orgPostamble,
      _AB_ORG_PROJECT_FORCE_EXPORT: !!args.force,
      HOME: this.emacsHome
    };
    this.run({
      elScript: path.join(__dirname, 'emacs-org-export.el'),
      env: { ...process.env, ...exportArgs }
    }, (err, result) => {
      if (err) {
        this.log('org export error: %s', err.toString());
        cb(err);
        return;
      }
      /* TODO check process exit code */
      cb(null, {});
    });
  }

  mkCmd(args) {
    return {
      bin: 'emacs',
      args: [ '--batch', '--script', args.elScript ],
      env: args.env || { ...process.env, ...{ HOME: this.emacsHome }},
      cwd: args.cwd || process.cwd()
    };
  }

  run(args, cb) {
    cb = cb || function () {};
    const cmd = this.mkCmd(args);
    this.log('Run emacs cmd: %j', cmd.args);

    const outputFd = (() => {
      if (this.emacsLog) {
        return fs.openSync(this.emacsLog, 'a');
      } else {
        return undefined;
      }
    })();
    try {
      const proc = childProc.spawn(cmd.bin, cmd.args, {
        env: cmd.env,
        cwd: cmd.cwd,
        stdio: [ 'ignore', outputFd || 'ignore', outputFd || 'ignore' ]
      });
      proc.on('close', function(code) {
        cb(null, { code: code });
        cb = function () {};
      });
    } catch (err) {
      this.log('emacs exec error: %s', err.toString());
      cb(err);
      cb = function () {};
    }
    if (outputFd) {
      fs.closeSync(outputFd);
    }
  }
};

exports.EmacsExec = EmacsExec;
