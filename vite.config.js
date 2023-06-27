import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  setupFiles: "dotenv/config",
  test: {
    coverage: {
      provider: "istanbul", // or 'v8'
      reporter: ["html"],
    },
  },
});
