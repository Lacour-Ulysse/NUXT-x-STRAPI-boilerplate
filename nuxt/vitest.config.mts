// Config : https://medium.com/@elquimeras/harnessing-the-power-of-nuxt3-auto-imports-in-testing-with-vite-and-vue-test-utils-85453e3c74fa

import * as path from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";
import Components from "unplugin-vue-components/vite";

const r = (p: string) => path.resolve(__dirname, p);

export default defineConfig({
  plugins: [vue(), Components({ dirs: ["./components"] })],
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      provider: "v8",
      include: ["components", "pages"],
    },
  },
  resolve: {
    alias: {
      "~": r("."),
    },
  },
});
