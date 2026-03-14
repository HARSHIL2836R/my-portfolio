import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change 'my-portfolio' to your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio/',
})
