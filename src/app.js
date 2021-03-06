'use strict';

import * as misc from './misc.js';
const dbg = misc.mkDbgLog('app');

export default class MainApp {
  constructor(appConf) {
    const wrkPath = (window.location.pathname).toLowerCase();
    const pgCtx = (() => {
      if (typeof abCtx !== 'undefined') {
        return abCtx;
      } else {
        return { disableToc: false, disableDisq: false };
      }
    })();
    this.pgInf = {
      wrkPath: wrkPath,
      isHome: (wrkPath === '/' || wrkPath === '/index.html'),
      isAbout: (wrkPath === '/about.html'),
      showDisqus: !pgCtx.disableDisq
    };
    dbg('main app created');
    dbg('  pgInf: %j', this.pgInf);
  }

  initNavbar() {
    if (this.pgInf.isAbout) {
      $('#btnAbout').addClass('active');
    }
    if (this.pgInf.isHome) {
      $('#btnHome').addClass('active');
    }
  }

  initDisqus() {
    if (!this.pgInf.showDisqus) {
      return;
    }
    try {
      dbg('init disqus');
      const disqusShortname = 'myvimwiki';
      const dsq = document.createElement('script');
      dsq.type = 'text/javascript';
      dsq.async = true;
      dsq.src = `//${disqusShortname}.disqus.com/embed.js`;
      $('#disqus_thread').append(dsq);
    } catch (err) {
      dbg('init disqus erro: %s', err.toString());
    }
  }

  updatePg() {
    $('a[href]').each(function() {
      if (this.href.indexOf(window.location.host) === -1) {
        $(this).attr({ target: '_blank', title: this.href });
      }
    });
  }

  run() {
    dbg('main app run');
    this.initNavbar();
    this.initDisqus();
    this.updatePg();
  }
};
