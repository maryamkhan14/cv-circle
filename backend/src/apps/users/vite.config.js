import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  setupFiles: "dotenv/config",
  test: {
    coverage: {
      provider: "istanbul", // or 'v8'
      reporter: ["html"],
    },
  },
});
