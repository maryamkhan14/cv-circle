import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  setupFiles: "/__test__",
  globalSetup: "/__test__/globalSetup.ts",
  test: {
    root: ".",
    coverage: {
      provider: "istanbul", // or 'v8'
      reporter: ["html"],
    },
  },
});
