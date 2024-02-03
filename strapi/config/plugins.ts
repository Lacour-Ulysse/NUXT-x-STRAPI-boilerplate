"use strict";

module.exports = ({ env }) => ({
  graphql: {
    enabled: true,
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 12,
      amountLimit: 100,
      apolloServer: {
        introspection: !(env("NODE_ENV") === "production"),
      },
    },
  },

  "apollo-sandbox": {
    enabled: !(env("NODE_ENV") === "production"),
  },

  "local-image-sharp": {
    config: {
      cacheDir: ".image-cache",
      maxAge: 31536000,
    },
  },

  sitemap: {
    enabled: true,
    config: {
      cron: "0 0 0 * * *",
      autoGenerate: true,
      allowedFields: ["id", "slug"],
    },
  },

  sentry: {
    enabled: !(env("NODE_ENV") === "development"),
    config: {
      dsn: env("SENTRY_DSN"),
      sendMetadata: true,
    },
  },

  "import-export-entries": {
    enabled: true,
  },

  // Custom dashboard
  dashbored: {
    enabled: true,
    resolve: "./src/plugins/dashbored",
  },
});
