'use strict';

import debug from 'debug';

export const initDbgLog = (opts) => {
  if (opts.debug) {
    debug.enable('_ab:*');
  } else {
    debug.disable();
  }
};

export const mkDbgLog = (prefix) => debug('_ab:' + prefix);
