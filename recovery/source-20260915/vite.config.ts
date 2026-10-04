import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        routeMap: 'src/route-map-entry.ts',
      },
    },
  },
})
