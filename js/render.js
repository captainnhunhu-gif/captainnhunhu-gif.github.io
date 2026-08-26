/* ============================================================
   Reads window.SITE and builds the page.

   Nothing here needs editing to add a project or a kid —
   that all lives in content/site.js.
   ============================================================ */
(function () {
  var S = window.SITE;
  if (!S) return;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function mount(id) { return document.getElementById(id); }

  /* ---------- chapter one ---------- */
  (function origin() {
    var host = mount('origin-body');
    if (!host || !S.origin) return;
    host.appendChild(el('h2', null, S.origin.heading));
    (S.origin.paragraphs || []).forEach(function (t) {
      host.appendChild(el('p', null, t));
    });
    if (S.origin.whisper) {
      var p = el('p');
      p.appendChild(el('span', 'whisper', S.origin.whisper));
      host.appendChild(p);
    }
  })();

  /* ---------- the wall ---------- */
  (function wall() {
    var host = mount('wall');
    if (!host) return;
    var ICONS = window.ICONS || {};

    function icon(name, px) {
      if (!ICONS[name]) return null;
      var wrap = el('div', 'ico');
      wrap.innerHTML =
        '<svg width="' + px + '" height="' + px + '" viewBox="0 0 32 32" fill="none" ' +
        'stroke="currentColor" stroke-width="2.1" stroke-linecap="round" ' +
        'stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>';
      return wrap;
    }

    (S.wall || []).forEach(function (p) {
      var big  = p.size === 'big';
      var cell = el('div', 'wall-cell' + (big ? ' wall-cell--big' : ''));
      var pin  = el('article', 'pin pin--' + (p.color || 'cream') + (big ? ' pin--big' : ' pin--small'));

      var ic = icon(p.icon, big ? 34 : 28);
      if (ic) pin.appendChild(ic);

      pin.appendChild(el('h3', 'pname', p.name));
      if (p.tag)   pin.appendChild(el('div', 'ptag', p.tag));
      if (p.blurb) pin.appendChild(el('p', 'pdesc', p.blurb));

      if (p.kind === 'app') {
        var links = el('div', 'links');
        if (p.status === 'playable' && p.playUrl) {
          var play = el('a', 'plink plink--play', '▶ play it');
          play.href = p.playUrl;
          play.setAttribute('aria-label', 'Play ' + p.name + ' in your browser');
          links.appendChild(play);
        }
        if (p.repoUrl) {
          var code = el('a', 'plink plink--code', 'see the code');
          code.href = p.repoUrl;
          code.setAttribute('aria-label', 'Source code for ' + p.name);
          links.appendChild(code);
        }
        if (!p.playUrl && !p.repoUrl) links.appendChild(el('span', 'plink plink--soon', 'coming soon'));
        pin.appendChild(links);
      }

      cell.appendChild(pin);
      if (p.note) cell.appendChild(el('p', 'note', p.note));
      host.appendChild(cell);
    });
  })();

  /* ---------- the little shop-sign ticker ---------- */
  (function ticker() {
    var host = mount('ticker');
    if (!host || !S.ticker || !S.ticker.length) return;
    var track = el('div', 'ticker-track');
    // printed twice so the loop meets itself with no visible seam
    for (var pass = 0; pass < 2; pass++) {
      S.ticker.forEach(function (t) {
        track.appendChild(el('span', null, t));
        track.appendChild(el('b', null, '✳'));
      });
    }
    host.appendChild(track);
  })();

  /* ---------- chapter three ---------- */
  (function numbers() {
    var host = mount('receipts');
    if (!host) return;
    (S.numbers || []).forEach(function (s) {
      var box = el('div', 'stat');
      box.appendChild(el('div', 'n', s.n));
      box.appendChild(el('div', 'cap', s.cap));
      host.appendChild(box);
    });
    var lead = mount('numbers-lead');
    if (lead && S.numbersLead) lead.textContent = S.numbersLead;
    var foot = mount('numbers-foot');
    if (foot && S.numbersFoot) foot.textContent = S.numbersFoot;
  })();

  /* ---------- the kids ---------- */
  (function kids() {
    var host = mount('kids-list');
    if (!host) return;
    (S.kids || []).forEach(function (k) {
      var row = el('div', 'kid-row');
      row.appendChild(el('span', 'kname', k.name));
      row.appendChild(el('span', 'ksince', 'since ' + k.since));
      if (k.note) row.appendChild(el('span', 'knote', k.note));
      host.appendChild(row);
    });
  })();

  /* ---------- the end ---------- */
  (function end() {
    var big = mount('end-big');
    if (big && S.end) {
      big.appendChild(document.createTextNode(S.end.big || ''));
      big.appendChild(el('b', null, S.end.bigEm || ''));
      big.appendChild(document.createTextNode(S.end.bigAfter || ''));
    }
    var cta = mount('end-cta');
    if (cta && S.end) {
      cta.href = 'mailto:' + S.end.email;
      cta.textContent = S.end.cta + ' ';
      cta.appendChild(el('span', 'arrow', '↗'));
    }
    var f = mount('end-footer');
    if (f && S.end) f.textContent = S.end.footer;
    var c = mount('end-copy');
    if (c && S.end) c.textContent = S.end.copyright;
  })();

  /* ---------- day / night ---------- */
  (function theme() {
    var root = document.documentElement;
    var btn = mount('theme');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var now = root.getAttribute('data-theme');
      var dark = now ? now === 'dark'
                     : window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', dark ? 'light' : 'dark');
    });
  })();

  /* ---------- scroll reveals ---------- */
  (function reveals() {
    var items = document.querySelectorAll('.reveal');
    // No observer, or the reader asked for less motion? Leave everything visible.
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });

    items.forEach(function (n) {
      n.classList.add('armed');          // hide only now that JS is definitely alive
      io.observe(n);
    });
  })();
})();
