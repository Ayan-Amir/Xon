import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@svg': path.resolve(__dirname, './src/assets/svgs/components'),
    },
  },

  plugins: [react()],
});
