import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  optimizeDeps: {
    // Shery.js has raw imports of glsl files which confuse Vite's dependency pre-bundling.
    // We can exclude it from optimization to force it to run through the standard Vite pipeline
    exclude: ['sheryjs']
  },
  server: {
    port: 5173,
    host: true
  }
})
