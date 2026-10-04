import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
})
