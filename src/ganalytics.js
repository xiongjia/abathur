'use strict';

import * as misc from './misc.js';

const dbg = misc.mkDbgLog('ga');

export default function ganalytics () {
  dbg('init google analytics');

  function analytics () {
    /* eslint-disable */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-7661871-7', 'xj-labs.net');
    ga('send', 'pageview');
    /* eslint-enable */
  }

  setTimeout(() => {
    try {
      dbg('creating google analytics');
      analytics();
      dbg('google analytics object is created');
    } catch (err) {
      dbg('google analytics err: %s', err.toString());
    }
  }, 10);
};
