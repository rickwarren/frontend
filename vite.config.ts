import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [EnvironmentPlugin('all'), reactRefresh()],
  server: {
    host: true,
    port: 3000
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})