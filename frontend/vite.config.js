import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const BACKEND_URL = env.VITE_REACT_APP_BACKEND_BASEURL || 'http://localhost:3000';

  return {
    plugins: [react()],
    server: {
      port: 3001,
      proxy: {
        "/api": {
          target: BACKEND_URL,
          changeOrigin: true,
        },
        "/socket.io": {
          target: BACKEND_URL,
          changeOrigin: true,
          ws: true,
          secure: false
        }
      },
    },
  };
});
