import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/process-pdfs': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path, // facultatif mais bon à avoir
      },
      '/generate-news': {
        target: 'http://localhost:3000', // Proxy requests to the backend server
        changeOrigin: true,
        rewrite: path => path, // Optional but good to have
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
