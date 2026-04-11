import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        newtab: 'index.html',
        contentScript: path.resolve(__dirname, 'src/contentScript/index.tsx'),
      },
      output: {
        // content script는 단일 파일로 출력 (dynamic import 없이)
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'contentScript') return 'contentScript.js';
          return 'assets/[name]-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  define: {
    MOCK_CHROME: mode === 'development',
  },
}));
