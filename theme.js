// Light and dark. The page wears the Ending theme, or Ending Dark; this sets data-theme on
// <html> before anything is drawn (the visitor's own choice if they have made one, else their
// system's), adds the switch to the nav, and points the screenshots and recordings at the set
// made in that theme (media/ending/ or media/ending-dark/). Loaded in the head of every page.
(function () {
  var root = document.documentElement, key = 'theme';
  var system = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  // A choice made with the switch holds for a day, whatever the system does; then the system leads again.
  var day = 24 * 60 * 60 * 1000;
  function saved() {
    try {
      var v = localStorage.getItem(key), at = Number(localStorage.getItem(key + '-at'));
      if (v !== 'light' && v !== 'dark') return null;
      if (!at || Date.now() - at > day) { localStorage.removeItem(key); localStorage.removeItem(key + '-at'); return null; }
      return v;
    } catch (e) { return null; }
  }
  function current() { return saved() || (system && system.matches ? 'dark' : 'light'); }

  // Every picture made in both themes has the same name in each folder.
  var either = /media\/ending(-dark)?\//g;
  function repoint(value, theme) { return value.replace(either, theme === 'dark' ? 'media/ending-dark/' : 'media/ending/'); }
  function repointMedia(theme) {
    document.querySelectorAll('img[src*="media/ending"], video[src*="media/ending"], video[poster*="media/ending"], [style*="media/ending"]').forEach(function (el) {
      ['src', 'poster', 'style'].forEach(function (name) {
        var was = el.getAttribute(name), now = was && repoint(was, theme);
        if (!was || was === now) return;
        // Pictures change only once the other version has loaded, so one already on screen keeps
        // showing meanwhile, and one not yet made in that theme stays as it is.
        if (name === 'src' && el.tagName === 'IMG') {
          var next = new Image();
          next.onload = function () { if (root.getAttribute('data-theme') === theme) el.setAttribute('src', now); };
          next.src = now;
          return;
        }
        var playing = name === 'src' && el.tagName === 'VIDEO' && !el.paused;
        el.setAttribute(name, now);
        if (playing) { el.load(); el.play().catch(function () {}); }
      });
    });
  }

  var buttons = [];
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', b.value === theme ? 'true' : 'false'); });
    if (document.body) repointMedia(theme);
    try { document.dispatchEvent(new CustomEvent('themechange', { detail: theme })); } catch (e) {}
  }
  apply(current());

  var icons = {
    light: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    dark: '<path d="M20 14.5A8 8 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5z"/>'
  };
  function addSwitch() {
    var links = document.querySelector('.nav-links');
    if (!links) return;
    var group = document.createElement('div');
    group.className = 'theme-switch'; group.setAttribute('role', 'group'); group.setAttribute('aria-label', 'Theme');
    ['light', 'dark'].forEach(function (theme) {
      var b = document.createElement('button');
      b.type = 'button'; b.value = theme;
      b.title = theme === 'light' ? 'Light' : 'Dark';
      b.setAttribute('aria-label', theme === 'light' ? 'Light theme' : 'Dark theme');
      b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icons[theme] + '</svg>';
      b.addEventListener('click', function () {
        try { localStorage.setItem(key, theme); localStorage.setItem(key + '-at', String(Date.now())); } catch (e) {}
        apply(theme);
      });
      buttons.push(b); group.appendChild(b);
    });
    links.insertBefore(group, links.querySelector('.btn-ghost'));
  }
  function ready() { addSwitch(); apply(current()); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();

  // With no choice made, follow the system as it changes; and follow a choice made in another tab.
  if (system && system.addEventListener) system.addEventListener('change', function () { if (!saved()) apply(current()); });
  window.addEventListener('storage', function (e) { if (e.key === key) apply(current()); });
})();
