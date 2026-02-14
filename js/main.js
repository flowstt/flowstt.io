/**
 * FlowSTT Project Website - main.js
 * Theme toggle, mobile navigation, smooth scroll, active nav highlighting.
 */

(function () {
  'use strict';

  // ---- Theme Toggle ----

  var STORAGE_KEY = 'flowstt-theme';
  var toggleBtn = document.getElementById('theme-toggle');
  var iconSpan = toggleBtn ? toggleBtn.querySelector('.theme-icon') : null;

  function getEffectiveTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (iconSpan) {
      // Sun for dark mode (click to go light), moon for light mode (click to go dark)
      iconSpan.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    }
    // Update theme-color meta tag
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0f1117' : '#ffffff');
    }
  }

  // Apply on load (supplement the inline <script> in <head>)
  applyTheme(getEffectiveTheme());

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var current = getEffectiveTheme();
      var next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  }

  // Listen for OS preference changes (if user hasn't explicitly chosen)
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // ---- Mobile Hamburger Menu ----

  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a nav link is clicked
    var links = navLinks.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    }
  }

  // ---- Active Section Highlighting ----

  var sections = document.querySelectorAll('main section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 100; // offset for fixed nav
    var currentId = '';

    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      if (section.offsetTop <= scrollPos) {
        currentId = section.getAttribute('id');
      }
    }

    for (var j = 0; j < navAnchors.length; j++) {
      var anchor = navAnchors[j];
      if (anchor.getAttribute('href') === '#' + currentId) {
        anchor.classList.add('active');
      } else {
        anchor.classList.remove('active');
      }
    }
  }

  // Throttle scroll events
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial call
  updateActiveNav();

})();
