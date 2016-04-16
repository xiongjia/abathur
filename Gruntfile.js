'use strict';

module.exports = function (grunt) {
  var gruntCfg, tasks, optNoCompress, _;

  _ = require('lodash');
  /* load grunt config and plugins */
  optNoCompress = grunt.option('no-compress');
  require('load-grunt-tasks')(grunt);
  gruntCfg = grunt.file.readYAML('grunt_conf.yml');
  grunt.initConfig(gruntCfg.root);

  /* default task */
  tasks = {
    build: ['clean', 'bower', 'jshint', 'copy', 'concat']
  };
  tasks.default = tasks.build;
  _.mapKeys(tasks, function (val, key) {
    grunt.registerTask(key, val);
  });
};
