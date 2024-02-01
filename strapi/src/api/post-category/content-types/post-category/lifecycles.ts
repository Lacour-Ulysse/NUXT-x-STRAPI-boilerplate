// IMPORTS :
const slugify = require("slugify");
const { ApplicationError } = require("@strapi/utils").errors;

// LIFECYCLES :
export default {
  async beforeCreate(event) {
    await createValidator(event);
  },

  async beforeUpdate(event) {
    await updateValidator(event);
  },
};

// METHODS :
const createValidator = async (event) => {
  // User input (only filled fields)
  const { data } = event.params;

  // Name field mandatory
  if (!data.name) {
    await cleanError("Unique name must be provided!");
  }

  // Content type
  const uid = event.model.uid;

  // Check fields uniqueness within locale :
  let existingEntry = null;

  // Check for name uniqueness within locale
  existingEntry = await strapi.query(uid).findOne({
    where: { name: data.name, locale: data.locale },
  });

  if (existingEntry) {
    await cleanError("Name must be unique within the current locale.");
  }

  // If not provided generate slug based on name
  data.slug = !data.slug ? data.name : data.slug;

  // Slugify the slug
  data.slug = slugify(data.slug, {
    remove: /[^a-zA-Z0-9\s]+/g,
    lower: true,
    locale: data.locale,
  }).replace(/\s+/g, "-");

  // Check for slug uniqueness within locale
  existingEntry = await strapi.query(uid).findOne({
    where: { slug: data.slug, locale: data.locale },
  });

  if (existingEntry) {
    await cleanError("Slug must be unique within the current locale.");
  }

  // Automatically handle items ranking
  data.rank = data.rank || 1;
  await handleRank(uid, null, data.locale, data.rank);
};

const updateValidator = async (event) => {
  // Updated item data
  const id = event.params?.where?.id;
  const { data } = event.params;

  // Content type
  const uid = event.model.uid;

  // Fetch locale
  const locale = await getLocale(uid, id);
  data.locale = locale;

  // Check uniqueness within locale
  let existingEntry = null;

  if (data.name) {
    // Check for name uniqueness within locale
    existingEntry = await strapi.query(uid).findOne({
      where: { name: data.name, locale: data.locale },
    });

    if (existingEntry && id !== existingEntry?.id) {
      await cleanError("Name must be unique within the current locale.");
    }

    // If not provided generate slug based on name
    data.slug = !data.slug ? data.name : data.slug;
  }

  if (data.slug) {
    // Slugify the slug
    data.slug = slugify(data.slug, {
      remove: /[^a-zA-Z0-9\s]+/g,
      lower: true,
      locale: data.locale,
    }).replace(/\s+/g, "-");

    // Check for slug uniqueness within locale
    existingEntry = await strapi.query(uid).findOne({
      where: { slug: data.slug, locale: data.locale },
    });

    if (existingEntry && id !== existingEntry?.id) {
      await cleanError("Slug must be unique within the current locale.");
    }
  }

  // Automatically handle items ranking
  data.rank = data.rank || 1;
  await handleRank(uid, id, data.locale, data.rank);
};

const getLocale = async (uid, id) => {
  const res = await strapi.service(uid).findOne(id);

  return res.locale;
};

const handleRank = async (uid, id, locale, rank) => {
  // Get equal ranked item
  const nextItemToIncrement = await strapi.query(uid).findOne({
    where: {
      locale: locale,
      rank: {
        $eq: rank,
      },
    },
  });

  // Increment if needed
  if (nextItemToIncrement && nextItemToIncrement.id !== id) {
    await strapi.entityService.update(uid, nextItemToIncrement.id, {
      data: {
        name: nextItemToIncrement.name,
        rank: rank + 1,
      },
    });
  }
};

const cleanError = async (message: string) => {
  let error = new ApplicationError(message);
  strapi
    .plugin("sentry")
    .service("sentry")
    .sendError(error, (scope) => {
      scope.setTag("ignore_error", "true");
    });
  throw error;
};
