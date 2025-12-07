import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/0-REACT-SIMPLE-BLOG-PLATFORM/', //key for GitHub Pages subpath
})
