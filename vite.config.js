import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// const BACKEND_URL = import.meta.env.DJANGO_BACKEND_URL;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
  proxy: {
      '/api': 'http://localhost:8000',
    },
  },
});


