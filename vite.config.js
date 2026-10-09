
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api/ipos": {
        target: "https://www.xflot.com",
        changeOrigin: true,
        rewrite: () => "/api/public/market/ipos",
      },
    },
  },
});