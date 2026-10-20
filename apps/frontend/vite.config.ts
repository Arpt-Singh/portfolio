import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { HEALTH_PATH } from '@portfolio/interface'

// https://vitejs.dev/config/
const proxy = {
  [HEALTH_PATH]: `http://${process.env.HOST ?? '127.0.0.1'}:${process.env.PORT ?? '3001'}`,
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy,
  },
  preview: {
    proxy,
  },
})
