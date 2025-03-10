import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/myShelf/',
  build: {
    emptyOutDir: true, // Clear the output directory before building
    outDir: 'dist', // Optional: Customize the output directory
  },
})
3