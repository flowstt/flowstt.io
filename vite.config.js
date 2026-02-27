import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load .env, .env.local, .env.[mode], .env.[mode].local from the project root.
  // The third argument '' loads all variables regardless of VITE_ prefix.
  // This must be done explicitly here because vite.config.js runs before Vite's
  // automatic env loading, so process.env does not yet contain .env.local values.
  var env = loadEnv(mode, process.cwd(), '');

  // Build-time direct download URL injection.
  // Set VITE_DOWNLOAD_TAG in .env.local (local dev) or $GITHUB_ENV (CI) to embed
  // versioned direct installer URLs. When absent, all three fall back to
  // the generic /releases/latest page so the build always succeeds.
  var RELEASES_BASE = 'https://github.com/flowstt/flowstt/releases';
  var tag = env.VITE_DOWNLOAD_TAG || '';
  // Tauri artifact filenames use the SemVer string without the leading 'v'.
  var ver = tag.replace(/^v/, '');

  function makeUrl(filename) {
    if (tag && ver) {
      return RELEASES_BASE + '/download/' + tag + '/' + filename.replace('{VERSION}', ver);
    }
    return RELEASES_BASE + '/latest';
  }

  return {
  // Compile-time constants for platform-specific direct download URLs.
  // These are replaced with string literals in the built bundle.
  define: {
    __DOWNLOAD_MACOS_ARM__: JSON.stringify(makeUrl('FlowSTT_{VERSION}_aarch64.dmg')),
    __DOWNLOAD_MACOS_INTEL__: JSON.stringify(makeUrl('FlowSTT_{VERSION}_x64.dmg')),
    __DOWNLOAD_WINDOWS__: JSON.stringify(makeUrl('FlowSTT_{VERSION}_x64_en-US.msi')),
  },

  // Build output directory
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Generate source maps for debugging production issues
    sourcemap: true,
    // Minification settings
    minify: 'esbuild',
    // CSS minification
    cssMinify: true,
  },

  // Dev server configuration
  server: {
    // Open browser on start
    open: true,
    // Port (default 5173, override if needed)
    port: 5173,
    // Enable strict port (fail if port is taken rather than auto-increment)
    strictPort: false,
  },

  // Preview server (for testing production builds locally)
  preview: {
    port: 4173,
    open: true,
  },
  };
});
