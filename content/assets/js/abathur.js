/* abathur.js */
(function () {
  'use strict';
	$(document).ready(function() {
    var curPath, ctx;

    curPath = window.location.pathname;
    ctx = (typeof abCtx !== 'undefined') ? abCtx : {};

    /* install disqus */
    function installDisqus(commentsElement) {
      var disqus;
      disqus = '<div id="ab-disqus">' +
        '<div id="disqus_thread"></div>' +
        '<script type="text/javascript">' +
          'var disqus_shortname = \'myvimwiki\';' +
          '(function() { ' +
          '  var dsq = document.createElement(\'script\');' +
          '  dsq.type = \'text/javascript\';' +
          '  dsq.async = true;' +
          '  dsq.src = \'//\' + disqus_shortname + \'.disqus.com/embed.js\';' +
          '  (document.getElementsByTagName(\'head\')[0] || ' +
          '   document.getElementsByTagName(\'body\')[0]).appendChild(dsq);' +
          '})();' +
        '</script>' +
        '<noscript>Please enable JavaScript to view the ' +
        '<a href="http://disqus.com/?ref_noscript">' +
        'comments powered by Disqus.</a></noscript>' +
        '<a href="http://disqus.com" class="dsq-brlink" target="_blank">' +
        'comments powered by <span class="logo-disqus">Disqus</span></a>' +
        '</div>';
      commentsElement.prepend(disqus);
    }

    /* adding preamble */
    (function (preamble) {
      var contents, isHome, isAbout, linkBtns;

      isHome  = (curPath === '/' || curPath === '/index.html');
      isAbout = (curPath === '/about.html');
      linkBtns = (function() {
        if (isHome) {
          return '<li class="active"><a href=#>Home</a></li>' +
                 '<li><a href="/about.html">About</a></li>';
        }
        else if (isAbout) {
          return '<li><a href="/index.html">Home</a></li>' +
                 '<li class="active"><a href=#>About</a></li>';
        }
        return '<li><a href="/index.html">Home</a></li>' +
               '<li><a href="/about.html">About</a></li>';
      })();
      contents =
        '<div class="navbar navbar-default" >' +
        '  <div class="navbar-header">' +
        '    <a class="navbar-brand" href="/index.html">Recycle Bin</a>' +
        '  </div> ' +
        '  <div class="collapse navbar-collapse">' +
        '    <ul class="nav navbar-nav">' + linkBtns + '</ul>' +
        '  </div>' +
        '</div>';
      preamble.before($(contents));
    })($('#content'));

    /* adding postamble */
    (function (postamble) {
      var contents;
      contents =
        '<footer class="ab-footer"><div class="container">' +
        '<p class="muted credit">' +
        '&copy; LeXiongJia (lexiongjia@gmail.com) &nbsp;&nbsp;&nbsp;' +
        '<a class="pos_right" rel="license" ' +
        ' href="http://creativecommons.org/licenses/by-nc-nd/3.0/">' +
        '<img alt="Creative Commons License" style="border-width:0" ' +
        ' src="http://i.creativecommons.org/l/by-nc-nd/3.0/88x31.png"></a></p>' +
        '</div></footer>';
      postamble.after($(contents));

      if (!ctx.disableDisq) {
        setTimeout(function () { installDisqus(postamble); }, 10);
      }
    })($('#postamble'));

    /* right bar */
    (function () {
      var toc, isSmallScreen;

      isSmallScreen = $(window).width()  <= 1000;
      toc = $('#table-of-contents');
      toc.wrap('<div class="ab-right">');
      if (isSmallScreen) {
        toc.hide();
        return;
      }
      if (ctx.disableToc) {
        toc.hide();
        return;
      }

      /* google cse */
      toc.after('<div style="width: 100%;">' +
                '  <gcse:search></gcse:search>' +
                '</div><br>');
      setTimeout(function() {
        var cx, gcse, s;
        cx = '008101672356870034238:sapwemkcsbs';
        gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = 'https://www.google.com/cse/cse.js?cx=' + cx;
        s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
      }, 10);
    })();

    (function () {
      $('a[href]').each(function() {
        if (this.href.indexOf(window.location.host) === -1) {
          $(this).attr({ target: '_blank', title: this.href });
        }
      });
    })();
  });
})();
