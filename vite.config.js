import { defineConfig } from 'vite';

export default defineConfig({
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
});
