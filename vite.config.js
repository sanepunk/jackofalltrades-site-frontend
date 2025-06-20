import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/pepy': {
        target: 'https://api.pepy.tech',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/pepy/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Add API key to headers if available
            const apiKey = process.env.VITE_PEPPY_API_KEY;
            if (apiKey && apiKey !== 'your_api_key_here') {
              proxyReq.setHeader('X-API-Key', apiKey);
            }
          });
        }
      }
    }
  }
})
