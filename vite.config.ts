import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const stylesPath = resolve(dirname(fileURLToPath(import.meta.url)), 'src/styles');

const scssOptions = {
  api: 'modern-compiler',
  loadPaths: [stylesPath],
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': stylesPath,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        ...scssOptions,
      },
    },
  },
});
