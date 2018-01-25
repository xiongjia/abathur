'use strict';

exports = module.exports = (opts) => {
  require('./task-lint.js')(opts);
  require('./task-pages.js')(opts);
};
