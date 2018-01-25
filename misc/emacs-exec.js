'use strict';

const childProc = require('child_process');
const path = require('path');
const fs = require('fs');

class EmacsExec {
  constructor(opts) {
    const { conf, logger, dirs } = opts;
    this.log = logger;
    this.emacsLog = dirs.EMACS_LOG;
    this.emacsHome = dirs.EMACS_HOME;
    this.orgBaseDir = dirs.ORG_BASE;
    this.orgOutputDir = dirs.ORG_OUTPUT;
    this.orgPostamble = conf.postamble;
    this.log('EmacsExec: home %s', this.emacsHome);
  }

  orgExport(args, cb) {
    const exportArgs = {
      _AB_BASE_DIR: this.orgBaseDir,
      _AB_OUTPUT_DIR: this.orgOutputDir,
      _AB_POSTAMBLE: this.orgPostamble,
      _AB_ORG_PROJECT_FORCE_EXPORT: args.force ? 'force' : undefined,
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
      this.log('org export finished: %j', result);
      const { code } = result;
      if (code !== 0) {
        cb(new Error(`Org Export error: exit ${code}.`));
      } else {
        cb();
      }
    });
  }

  mkCmd(args) {
    return {
      bin: 'emacs',
      args: [
        '--batch',
        '--script',
        args.elScript,
        '-f',
        'export'
      ],
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
