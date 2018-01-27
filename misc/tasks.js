'use strict';

exports = module.exports = (opts) => {
  require('./task-clean.js')(opts);
  require('./task-emacs.js')(opts);
  require('./task-lint.js')(opts);
  require('./task-pages.js')(opts);
  require('./task-style.js')(opts);
  require('./task-script.js')(opts);
  require('./task-fonts.js')(opts);
  require('./task-server.js')(opts);
  require('./task-assets.js')(opts);
  require('./task-pkg.js')(opts);
};
