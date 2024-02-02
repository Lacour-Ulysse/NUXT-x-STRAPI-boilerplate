"use strict";

/**
 * `rebored` middleware
 */

export default (config, { strapi }) => {
  const redirects = ["/", "/index.html", "/admin"].map((path) => ({
    method: "GET",
    path,
    handler: (ctx) => ctx.redirect("/admin/plugins/dashbored"),
    config: { auth: false },
  }));

  strapi.server.routes(redirects);
};
