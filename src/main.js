'use strict';

import debug from 'debug';

/* app conf */
const appConf = {
  debug: process.env.ENV_DEBUG,
  version: process.env.ENV_VER
};

debug.enable('scratch:*');
const dbg = debug('scratch:app');
dbg('app conf: %j', appConf);
