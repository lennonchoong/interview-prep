import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: './' keeps asset URLs relative so the production build works when served
// from a GitHub Pages project subpath (https://<user>.github.io/<repo>/) without
// hardcoding the repository name.
export default defineConfig({
  base: './',
  plugins: [react()],
})
