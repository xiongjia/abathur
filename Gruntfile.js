'use strict';

exports = module.exports = function (grunt) {
  var gruntCfg, tasks, _;

  _ = require('lodash');
  /* load grunt config and plugins */
  require('load-grunt-tasks')(grunt);
  gruntCfg = grunt.file.readYAML('grunt_conf.yml');
  grunt.initConfig(gruntCfg.root);

  /* tasks */
  tasks = {
    noCompress: [
      'clean',
      'bower',
      'jshint',
      'copy',
      'concat',
      'imagemin',
      'sitemap'
    ]
  };
  tasks.build = ['noCompress', 'cssmin', 'uglify', 'htmlmin', 'htmlhint'];
  tasks.serv = tasks.server = ['build', 'connect', 'watch'];
  tasks.dbgServ = ['noCompress', 'htmlhint', 'connect', 'watch'];
  tasks.check = ['build', 'connect', 'checkPages'];
  tasks.publish = ['check', 'rsync'];
  tasks.default = tasks.build;
  _.mapKeys(tasks, function (val, key) {
    grunt.registerTask(key, val);
  });
};
