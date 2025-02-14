import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://notetaker-server.vercel.app'
    }
  },
  plugins: [
    tailwindcss(),
    react()
  ],
})