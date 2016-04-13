'use strict';

module.exports = function (grunt) {
  var gruntCfg;

  /* load grunt config and plugins */
  require('load-grunt-tasks')(grunt);
  gruntCfg = grunt.file.readYAML('grunt_conf.yml');
  grunt.initConfig(gruntCfg.root);

  /* default task */
  grunt.registerTask('default', []);
};

