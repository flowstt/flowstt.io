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

  // ---- Hero Video Mute Toggle ----

  var heroVideo = document.getElementById('hero-video');
  var muteToggle = document.getElementById('video-mute-toggle');

  if (heroVideo && muteToggle) {
    muteToggle.addEventListener('click', function () {
      heroVideo.muted = !heroVideo.muted;
      var unmuted = !heroVideo.muted;
      muteToggle.setAttribute('aria-pressed', unmuted ? 'true' : 'false');
      muteToggle.setAttribute('aria-label', unmuted ? 'Mute video' : 'Unmute video');
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

  // ---- Platform-Aware Download Buttons ----

  var RELEASES_BASE = 'https://github.com/flowstt/flowstt/releases';

  // Direct download URLs injected at build time by vite.config.js.
  // These are compile-time constants replaced with string literals in the bundle.
  // When VITE_DOWNLOAD_TAG was not set during the build, they fall back to
  // RELEASES_BASE + '/latest' so local dev and pre-release deploys work fine.
  /* global __DOWNLOAD_MACOS_ARM__, __DOWNLOAD_MACOS_INTEL__, __DOWNLOAD_WINDOWS__ */
  var DL_MACOS_ARM = __DOWNLOAD_MACOS_ARM__;
  var DL_MACOS_INTEL = __DOWNLOAD_MACOS_INTEL__;
  var DL_WINDOWS = __DOWNLOAD_WINDOWS__;

  /**
   * Detect the user's OS from navigator.userAgentData (modern) or
   * navigator.userAgent (fallback). Returns 'windows', 'macos', or 'other'.
   */
  function detectPlatform() {
    // navigator.userAgentData is available in Chromium-based browsers
    if (navigator.userAgentData && navigator.userAgentData.platform) {
      var p = navigator.userAgentData.platform.toLowerCase();
      if (p.indexOf('win') !== -1) return 'windows';
      if (p.indexOf('mac') !== -1) return 'macos';
      return 'other';
    }
    // Fallback: legacy userAgent string
    var ua = navigator.userAgent;
    if (/Windows/i.test(ua)) return 'windows';
    if (/Macintosh|Mac OS X/i.test(ua)) return 'macos';
    return 'other';
  }

  /**
   * Build download button content for a given platform.
   * Returns { label, badgeText, href, intelHref }.
   * intelHref is only set for macOS (secondary Intel Mac link).
   */
  function getDownloadConfig(platform) {
    if (platform === 'windows') {
      return {
        label: 'Download for Windows',
        badgeText: 'Windows',
        href: DL_WINDOWS,
        intelHref: null
      };
    }
    if (platform === 'macos') {
      return {
        label: 'Download for macOS',
        badgeText: 'macOS',
        href: DL_MACOS_ARM,
        intelHref: DL_MACOS_INTEL
      };
    }
    // Linux or unknown — link to the releases page
    return {
      label: 'View Releases',
      badgeText: null,
      href: RELEASES_BASE,
      intelHref: null
    };
  }

  function applyDownloadButton(btnId, labelId, config) {
    var btn = document.getElementById(btnId);
    var labelEl = document.getElementById(labelId);
    if (!btn || !labelEl) return;

    btn.href = config.href;

    // Build label + optional platform badge
    labelEl.textContent = config.label;
    if (config.badgeText) {
      var badge = document.createElement('span');
      badge.className = 'btn-platform-badge';
      badge.textContent = config.badgeText;
      labelEl.appendChild(badge);
    }

    // Add secondary Intel Mac link directly after the button when applicable.
    if (config.intelHref) {
      // Only insert once — guard against double-run.
      var existingIntel = btn.parentNode && btn.parentNode.querySelector('.btn-intel-mac');
      if (!existingIntel) {
        var intelLink = document.createElement('a');
        intelLink.href = config.intelHref;
        intelLink.className = 'btn-intel-mac';
        intelLink.textContent = 'Intel Mac';
        // Insert immediately after the primary button.
        btn.parentNode.insertBefore(intelLink, btn.nextSibling);
      }
    }
  }

  var platform = detectPlatform();
  var dlConfig = getDownloadConfig(platform);

  applyDownloadButton('hero-download-btn', 'hero-download-label', dlConfig);
  applyDownloadButton('install-download-btn', 'install-download-label', dlConfig);

  // Update "All Releases" secondary button text to "Other Platforms" when a
  // primary platform is detected so the alternative is clearly labelled.
  if (platform !== 'other') {
    var releasesBtn = document.getElementById('hero-releases-btn');
    if (releasesBtn) releasesBtn.textContent = 'Other Platforms';
  }

})();
