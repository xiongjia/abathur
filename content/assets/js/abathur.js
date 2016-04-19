/* abathur.js */
(function () {
  'use strict';
	$(document).ready(function() {
    var curPath;

    curPath = window.location.pathname;

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
    })($('#preamble'));

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
    })($('#postamble'));

    /* right bar */
    (function () {
      var toc;
      toc = $('#table-of-contents');
      toc.wrap('<div class="ab-right">');
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
