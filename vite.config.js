import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        loveLetter: resolve(__dirname, 'love-letter.html'),
        calendar: resolve(__dirname, 'calendar.html'),
      },
    },
  },
})
