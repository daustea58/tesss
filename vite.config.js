import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative paths keep the build compatible with Netlify and GitHub Pages.
  base: './',
});
