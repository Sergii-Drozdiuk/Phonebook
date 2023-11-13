import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  plugins: [react(), FullReload(['./**/**.html'])],
  resolve: {
    alias: {
      '/src': '/src',
      components: '/src/components',
    },
  },
});
