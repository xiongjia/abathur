'use strict';

module.exports = function (grunt) {
  var gruntCfg, tasks, _;

  _ = require('lodash');
  /* load grunt config and plugins */
  require('load-grunt-tasks')(grunt);
  gruntCfg = grunt.file.readYAML('grunt_conf.yml');
  grunt.initConfig(gruntCfg.root);

  /* tasks */
  tasks = {
    noCompress: ['clean', 'bower', 'jshint', 'copy', 'concat']
  };
  tasks.build = _.concat(tasks.noCompress, ['cssmin', 'uglify', 'htmlmin']);
  tasks.default = tasks.build;
  _.mapKeys(tasks, function (val, key) {
    grunt.registerTask(key, val);
  });
};
