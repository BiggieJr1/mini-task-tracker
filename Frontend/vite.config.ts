import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Cualquier petición que empiece con /api se redirige al backend
      '/api': {
        target: 'http://localhost:3000', // Tu puerto de Express
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
