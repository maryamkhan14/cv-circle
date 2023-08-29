import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    root: ".",
    coverage: {
      exclude: [
        "__test__/**",
        "authentication/**",
        "domain/services/authenticator/**",
        "message-producer/**",
        "**/index.js",
      ],
      all: true,
      provider: "istanbul", // or 'v8'
      reporter: ["html"],
      reportsDirectory: "./__test__/coverage",
      cleanOnRerun: false,
      clean: false,
    },
  },
});
