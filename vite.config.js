import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function optimizeHtmlAndDist() {
  let outDir = 'dist';
  return {
    name: 'ss-optimize-html-and-dist',
    configResolved(config) {
      outDir = config.build.outDir || 'dist';
    },
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const cssLinks = [];
        let cleaned = html.replace(
          /\s*<link\b[^>]*rel=["']stylesheet["'][^>]*>\s*/gi,
          (match) => {
            if (/href=["']https?:\/\//i.test(match)) return match;
            cssLinks.push(match.trim());
            return '\n';
          }
        );
        if (cssLinks.length > 0) {
          cleaned = cleaned.replace(
            /(<meta\s+name=["']viewport["'][^>]*>)/i,
            `$1\n    ${cssLinks.join('\n    ')}`
          );
        }
        return cleaned;
      }
    },
    closeBundle() {
      const leakedBackup = path.resolve(process.cwd(), outDir, 'assets_original_backup');
      if (fs.existsSync(leakedBackup)) {
        fs.rmSync(leakedBackup, { recursive: true, force: true });
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), optimizeHtmlAndDist()],
  server: {
    port: 3000,
    host: true,
    allowedHosts: ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.io'],
    open: false
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('commonjsHelpers') ||
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/@remix-run/router') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'vendor-react';
          }
          if (
            id.includes('node_modules/framer-motion/') ||
            id.includes('node_modules/motion-') ||
            id.includes('node_modules/gsap/') ||
            id.includes('node_modules/lenis/')
          ) {
            return 'vendor-motion';
          }
          if (
            id.includes('node_modules/lucide-react/') ||
            id.includes('node_modules/canvas-confetti/') ||
            id.includes('node_modules/swiper/')
          ) {
            return 'vendor-ui';
          }
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
});

