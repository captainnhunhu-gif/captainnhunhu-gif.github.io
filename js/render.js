/* ============================================================
   Reads window.SITE and builds the room.

   Nothing here needs editing to add an object — that lives in
   content/site.js.
   ============================================================ */
(function () {
  var S = window.SITE;
  if (!S) return;
  var ICONS = window.ICONS || {};

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function mount(id) { return document.getElementById(id); }

  function iconSvg(name, cls) {
    if (!ICONS[name]) return null;
    var wrap = el('div', cls);
    wrap.innerHTML =
      '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.1" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>';
    return wrap;
  }

  /* ---------- the sign ---------- */
  (function sign() {
    var t = mount('title');    if (t) t.textContent = S.name || '';
    var g = mount('tagline');  if (g) g.textContent = S.tagline || '';
    var f = mount('deskfoot'); if (f) f.textContent = S.footer || '';
  })();

  /* ---------- the ticker ---------- */
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

  /* ---------- the panel ---------- */
  var scrim = mount('scrim');
  var panel = mount('panel');
  var lastFocus = null;

  function closePanel() {
    if (!panel) return;
    panel.classList.remove('open');
    if (scrim) scrim.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    if (lastFocus) { lastFocus.focus(); lastFocus = null; }
  }

  function openPanel(item, from) {
    if (!panel) return;
    lastFocus = from || null;
    panel.className = 'panel panel--' + (item.color || 'cream');
    panel.innerHTML = '';

    var close = el('button', 'close', '✕');
    close.setAttribute('aria-label', 'Close');
    close.addEventListener('click', closePanel);
    panel.appendChild(close);

    var ic = iconSvg(item.icon, 'pico');
    if (ic) panel.appendChild(ic);

    panel.appendChild(el('h2', null, item.title || item.label));
    if (item.tag) panel.appendChild(el('div', 'ptag', item.tag));
    (item.body || []).forEach(function (t) { panel.appendChild(el('p', null, t)); });

    if (item.numbers) {
      var nums = el('div', 'nums');
      item.numbers.forEach(function (s) {
        var box = el('div', 'stat');
        box.appendChild(el('div', 'n', s.n));
        box.appendChild(el('div', 'cap', s.cap));
        nums.appendChild(box);
      });
      panel.appendChild(nums);
    }

    var links = el('div', 'links');
    if (item.playUrl) {
      var play = el('a', 'plink', '▶ play it');
      play.href = item.playUrl;
      play.setAttribute('aria-label', 'Play ' + (item.title || item.label) + ' in your browser');
      links.appendChild(play);
    }
    if (item.repoUrl) {
      var code = el('a', 'plink plink--code', 'see the code');
      code.href = item.repoUrl;
      links.appendChild(code);
    }
    if (item.email) {
      var mail = el('a', 'plink', item.cta || 'say hi');
      mail.href = 'mailto:' + item.email;
      links.appendChild(mail);
    }
    // an app with nothing to click yet says so, rather than looking broken
    if (!links.children.length && item.tag) {
      links.appendChild(el('span', 'plink plink--soon', 'coming soon'));
    }
    if (links.children.length) panel.appendChild(links);

    if (item.note) panel.appendChild(el('p', 'note', item.note));

    panel.setAttribute('aria-hidden', 'false');
    panel.classList.add('open');
    if (scrim) scrim.classList.add('open');
    close.focus();
  }

  if (scrim) scrim.addEventListener('click', closePanel);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePanel();
  });

  /* ---------- the desk ---------- */
  (function desk() {
    var host = mount('desk');
    if (!host) return;

    (S.desk || []).forEach(function (item, i) {
      var b = el('button', 'obj obj--' + (item.color || 'cream'));
      b.type = 'button';
      b.setAttribute('aria-label', 'Open ' + (item.label || item.title));
      // stagger the drop so the desk assembles itself instead of appearing
      b.style.animationDelay = (i * 45) + 'ms';
      if (i % 4 === 1) b.classList.add('obj--sway');

      var ic = iconSvg(item.icon, 'ico');
      if (ic) b.appendChild(ic);
      b.appendChild(el('span', 'lab', item.label || item.title));

      b.addEventListener('click', function () { openPanel(item, b); });
      host.appendChild(b);
    });
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
})();
