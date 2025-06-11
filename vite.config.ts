import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // AR-specific configurations
  server: {
    // HTTPS required for camera access in production
    // For local development, browsers usually allow camera access on localhost
    host: true,
    port: 5173,
    // Uncomment for HTTPS in development if needed
    // https: true
  },
  
  // Optimize for AR assets
  build: {
    // Increase chunk size limit for AR libraries
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate MindAR into its own chunk for better loading
          'mind-ar': ['mind-ar'],
          // Separate vendor libraries
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
  
  // Ensure AR assets are properly served
  assetsInclude: ['**/*.mind'],
  
  // Define global constants for AR
  define: {
    __AR_MODE__: JSON.stringify(process.env.NODE_ENV === 'development' ? 'simulation' : 'production')
  }
})
