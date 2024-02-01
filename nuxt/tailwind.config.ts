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
        "chalet-green": {
          "50": "#f6f8ed",
          "100": "#eaf0d7",
          "200": "#d5e2b4",
          "300": "#b9ce88",
          "400": "#9fb962",
          "500": "#819e44",
          "600": "#647d33",
          "700": "#556a2f",
          "800": "#3f4e26",
          "900": "#374324",
          "950": "#1c240f",
        },
      },
    },
  },
};
