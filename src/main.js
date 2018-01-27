'use strict';

import * as misc from './misc.js';
import MainApp from './app.js';

/* app conf */
const appConf = {
  debug: process.env.ENV_DEBUG,
  version: process.env.ENV_VER
};

/* init log */
misc.initDbgLog(appConf);
const dbg = misc.mkDbgLog('main');
dbg('abathur main');
dbg('app conf: %j', appConf);

/* main app */
$(document).ready(function() {
  const app = new MainApp(appConf);
  app.run();
});
