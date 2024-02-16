import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        default: {
          "50": "#ffffff",
          "100": "#333333",
          "200": "#1f1f1f",
          "300": "#000000",
          "400": "#000000",
          "500": "#000000",
          "600": "#000000",
          "700": "#000000",
          "800": "#000000",
          "900": "#000000",
          "950": "#000000",
        },
      },
    },
  },
};
