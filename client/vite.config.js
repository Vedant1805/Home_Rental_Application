import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://home-rentals-application.onrender.com",
        secure: false,
      },
    },
  },

  plugins: [react()],
});
