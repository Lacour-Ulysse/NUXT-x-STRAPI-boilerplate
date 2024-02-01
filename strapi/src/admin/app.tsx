import logo from "./extensions/favicon.png";

export default {
  config: {
    head: {
      favicon: logo,
    },
    auth: {
      logo: logo,
    },
    menu: {
      logo: logo,
    },
    // Admin panel locales ("en" is always included)
    locales: ["fr"],

    // Extend the translations
    // Translations you can overide are accessible at node_modules/@strapi/admin/admin/src/translations/[language-name].json
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome!",
        "Auth.form.welcome.subtitle": "Log in to your account",
      },
      fr: {
        Users: "Utilisateur.ice.s",
        User: "Utilisateur.ice",
      },
    },

    // Disable video tutorials
    tutorials: false,

    // Disable notifications about new Strapi releases
    notifications: { releases: false },

    // Override or extend the themes colors
    // See https://github.com/strapi/design-system/blob/main/packages/strapi-design-system/src/themes/colors.ts for all availables options
    // And for Strapi design system see https://design-system.strapi.io/
    theme: {
      light: {
        colors: {
          // Light theme button and background colors
          buttonPrimary500: "#1e293b", // Dark Blue
          buttonPrimary600: "#0f172a", // Darker Blue

          // Light theme primary colors
          primary100: "#f1f5f9", // Light Grayish Blue
          primary200: "#e2e8f0", // Lighter Grayish Blue
          primary500: "#1e293b", // Dark Blue
          primary600: "#0f172a", // Darker Blue
          primary700: "#020617", // Darkest Blue

          // Error and success background colors
          danger100: "#f6f6f9", // Very Light Gray
          danger200: "#181826", // Dark Gray
          success100: "#f6f6f9", // Very Light Gray
          success200: "#181826", // Dark Gray
          warning100: "#f6f6f9", // Very Light Gray
          warning200: "#181826", // Dark Gray
        },
      },
      dark: {
        colors: {
          // Dark theme neutral colors
          neutral0: "#1a1a1a", // Nearly Black
          neutral100: "#151515", // Very Dark Gray
          neutral1000: "#ffffff", // White
          neutral150: "#282828", // Dark Gray
          neutral200: "#3d3d3d", // Gray
          neutral300: "#575757", // Medium Gray
          neutral400: "#8c8c8c", // Light Gray
          neutral500: "#a9a9a9", // Lighter Gray
          neutral600: "#8c8c8c", // Light Gray
          neutral700: "#d4d4d9", // Very Light Gray
          neutral800: "#ffffff", // White
          neutral900: "#ffffff", // White

          // Dark theme primary colors
          primary100: "#282828", // Dark Gray
          primary200: "#3d3d3d", // Gray
          primary500: "#ffffff", // White
          primary600: "#ffffff", // White
          primary700: "#ffffff", // White

          // Dark theme button and background colors
          buttonPrimary600: "#dddddd", // Light Gray
          buttonPrimary500: "#ffffff", // White

          // Dark theme button and background colors (neutral)
          buttonNeutral0: "#000000", // Black

          // Error and success background colors
          danger100: "#1a1a1a", // Nearly Black
          danger200: "#151515", // Very Dark Gray
          success100: "#1a1a1a", // Nearly Black
          success200: "#151515", // Very Dark Gray
          warning100: "#1a1a1a", // Nearly Black
          warning200: "#151515", // Very Dark Gray
        },
      },
    },
  },

  bootstrap() {},
};
