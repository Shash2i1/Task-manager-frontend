import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  /*server:{
    proxy:{
      '/api/v1': {
        target: 'https://task-manager-backend-lizm.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    }
  },*/
  plugins: [react()],
})
