import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    proxy: {
      '/api': 'http://localhost:8000',  // 将所有 /api 请求代理到后端 Django 服务器
    },
  },
  
})
