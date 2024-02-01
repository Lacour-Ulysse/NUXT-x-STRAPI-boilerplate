import { defineNuxtConfig } from "nuxt/config";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // Env variables
  runtimeConfig: {
    public: {
      STRAPI_SITE_URL: process.env.STRAPI_SITE_URL,
      STRAPI_TOKEN: process.env.STRAPI_TOKEN,
      DEV_MODE: !!(process.env.NODE_ENV === "development"),
      // Sentry
      SENTRY_DSN_PUBLIC: process.env.SENTRY_DSN_PUBLIC,
      SENTRY_TRACES_SAMPLE_RATE: parseFloat(
        process.env.SENTRY_TRACES_SAMPLE_RATE ?? "0"
      ),
      SENTRY_REPLAY_SAMPLE_RATE: parseFloat(
        process.env.SENTRY_REPLAY_SAMPLE_RATE ?? "0"
      ),
      SENTRY_ERROR_REPLAY_SAMPLE_RATE: parseFloat(
        process.env.SENTRY_ERROR_REPLAY_SAMPLE_RATE ?? "0"
      ),
    },
  },

  sourcemap: true,

  // Devtools
  // https://medium.com/vue-mastery/exploring-the-nuxt-3-devtools-d4829ccf10bc
  devtools: {
    enabled: !!(process.env.NODE_ENV === "development"),
    vscode: {},

    timeline: {
      enabled: !!(process.env.NODE_ENV === "development"),
    },
  },

  // Modules
  modules: [
    // Apollo Client
    "@nuxtjs/apollo",
    // Image processing
    "@nuxt/image",
    // Languages/Localization
    "@nuxtjs/i18n",
    // Robots.txt generator
    "@nuxtjs/robots",
    // Devtools
    "@nuxt/devtools",
    // Pinia/Store
    "@pinia/nuxt",
    // Vueuse
    "@vueuse/nuxt",
    // NuxtUI
    "@nuxt/ui",
    // Nuxt test utils
    "@nuxt/test-utils/module",
  ],

  // Robots
  robots: {
    rules: {
      UserAgent: "*",
      Disallow: "",
      Sitemap: `${process.env.STRAPI_SITE_URL}/api/sitemap/index.xml`,
    },
  },

  // Components configuration
  // Docs : https://nuxt.com/docs/guide/directory-structure/components
  components: [
    {
      path: "@/components",
      pathPrefix: false,
    },
  ],

  // SCSS + Video.js + Vue carousel stylesheet
  css: [
    "@/assets/scss/main.scss",
    "@/node_modules/video.js/dist/video-js.css",
    "@/node_modules/vue3-carousel/dist/carousel.css",
  ],

  // Use all iconify icons with NuxtUI
  ui: {
    icons: "all",
  },

  // Color mode settings
  colorMode: {
    preference: "system",
  },

  // Image configuration
  image: {
    // Use localImageSharp as the image provider with nuxt-img
    // Source : https://github.com/nuxt/image/issues/641#issuecomment-1674159933
    providers: {
      localImageSharp: {
        provider: "@/providers/localImageSharp",
        options: {
          baseURL: `${process.env.STRAPI_SITE_URL}/uploads/`,
        },
      },
    },
    provider: "localImageSharp",
  },

  // Hot Module Replacement for Vite
  vite: {
    server: {
      hmr: {
        protocol: "ws",
        host: "0.0.0.0",
      },
    },
    plugins: [
      // Put the Sentry vite plugin after all other plugins
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        release: {
          name: "release-name",
          deploy: {
            env: process.env.NODE_ENV ?? "unknown",
          },
        },
        telemetry: false,
      }),
    ],
  },

  // Apollo client configuration
  // Docs : https://apollo.nuxtjs.org/getting-started/quick-start
  apollo: {
    // Auth token
    authType: "Bearer",
    authHeader: "Authorization",
    tokenStorage: "cookie",
    clients: {
      default: {
        tokenName: "strapi-public-token",
        // URL of the GraphQL endpoint
        httpEndpoint: `${process.env.SERVER_SIDE_GRAPHQL_URL}/graphql/`, // server side
        browserHttpEndpoint: `${process.env.STRAPI_SITE_URL}/graphql/`, // client side
      },
    },
  },

  // Localization configuration
  // Docs : https://v8.i18n.nuxtjs.org/getting-started/basic-usage
  i18n: {
    // i18n config file
    vueI18n: "./i18n.config.ts",

    // Base url for SEO
    baseUrl: process.env.NUXT_SITE_URL,

    // Folder for json translations
    langDir: "locales",

    // Adding English and French locales (including fallbacks files)
    locales: [
      {
        name: "Français",
        code: "fr",
        iso: "fr-FR",
        file: "fr.json",
        dir: "ltr",
      },
      {
        name: "English",
        code: "en",
        iso: "en-US",
        file: "en.json",
        dir: "ltr",
      },
    ],

    // Used when active locale is not explicitly defined
    defaultLocale: "fr",

    // Url prefix strategy
    strategy: "prefix_except_default",

    // Tell Nuxt I18n to load translations asynchronously
    lazy: true,

    // Browser language detection
    // Docs : https://v8.i18n.nuxtjs.org/guide/browser-language-detection
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
});
