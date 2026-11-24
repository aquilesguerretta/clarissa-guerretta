import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const pages = ['index.html', 'trajetoria/index.html', 'acervo/index.html', 'publicacoes/index.html', 'contato/index.html'];

export default defineConfig({
  base: process.env.PAGES_BASE_PATH || '/',
  build: {
    rolldownOptions: {
      input: pages.map((page) => fileURLToPath(new URL(page, import.meta.url))),
    },
  },
});
