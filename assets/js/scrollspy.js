/*
 * Scrollspy for the single-page nav: highlights the nav link whose
 * section is currently in view.
 */
document.addEventListener('DOMContentLoaded', function () {
  var sections = document.querySelectorAll('[data-scrollspy-target]');
  var navLinks = document.querySelectorAll('#site-nav a[data-scrollspy]');

  if (!sections.length || !navLinks.length) {
    return;
  }

  var setActive = function (id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-scrollspy') === id);
    });
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActive(entry.target.getAttribute('data-scrollspy-target'));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(function (section) {
    observer.observe(section);
  });
});

/*
 * The bundled greedy-nav plugin (main.min.js) hides nav items into a
 * dropdown when it thinks the list is too wide for the nav bar. In the
 * fixed sidebar layout (see $large in _sass/_variables.scss) that
 * dropdown toggle is hidden entirely, so anything the plugin moves
 * there becomes permanently inaccessible. The sidebar should always
 * show every item, so restore anything hidden whenever we're at
 * sidebar width - on load and on every resize, since the plugin can
 * re-hide items at any point.
 */
document.addEventListener('DOMContentLoaded', function () {
  var SIDEBAR_BREAKPOINT = 925;
  var vlinks = document.querySelector('#site-nav .visible-links');
  var hlinks = document.querySelector('#site-nav .hidden-links');
  var btn = document.querySelector('#site-nav button');

  if (!vlinks || !hlinks) {
    return;
  }

  var enforceSidebarNav = function () {
    if (window.innerWidth >= SIDEBAR_BREAKPOINT && hlinks.children.length) {
      while (hlinks.firstElementChild) {
        vlinks.appendChild(hlinks.firstElementChild);
      }
      if (btn) {
        btn.classList.add('hidden');
      }
      hlinks.classList.add('hidden');
    }
  };

  enforceSidebarNav();
  window.addEventListener('resize', enforceSidebarNav);
});
