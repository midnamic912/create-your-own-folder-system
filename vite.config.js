import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // 等同於 0.0.0.0，讓其他主機可以連進來
    port: 5173,
  },
  plugins: [react()],
});
