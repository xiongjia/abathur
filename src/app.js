'use strict';

import * as misc from './misc.js';
const dbg = misc.mkDbgLog('app');

export default class MainApp {
  constructor(appConf) {
    const wrkPath = (window.location.pathname).toLowerCase();
    this.pgInf = {
      wrkPath: wrkPath,
      isHome: (wrkPath === '/' || wrkPath === '/index.html'),
      isAbout: (wrkPath === '/about.html')
    };
    dbg('main app created');
    dbg('  pgInf: %j', this.pgInf);
  }

  run() {
    dbg('main app run');
    if (this.pgInf.isAbout) {
      $('#btnAbout').addClass('active');
    }
    if (this.pgInf.isHome) {
      $('#btnHome').addClass('active');
    }

    const elData = $('#content');
    if (elData) {
      elData.detach().appendTo('#abContent');
    }

    const elToc = $('#table-of-contents');
    if (elToc) {
      elToc.detach().appendTo('#abSidebar');
    }
  }
};
