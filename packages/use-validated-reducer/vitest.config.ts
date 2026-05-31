import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
  },
  // Prevent vitest from walking up and picking up the parent project's PostCSS config
  css: {
    postcss: {},
  },
});
