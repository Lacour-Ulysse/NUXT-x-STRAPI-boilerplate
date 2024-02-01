<template>
  <main class="grid-layout md:flex md:flex-wrap md:justify-center gap-10 p-3">
    <SinglePost v-if="post?.attributes" :attributes="post?.attributes" />
  </main>
</template>

<script setup lang="ts">
// Graphql query
import { GET_POST_BY_SLUG } from "@/gql/PostBySlug";

// Types
import type { Query, PostEntity } from "@/types/Strapi";

// Route
const route = useRoute();

// Env
const runtimeConfig = useRuntimeConfig();

// i18n / Language
const { t } = useI18n();
const locale = ref(useI18n().locale);

// Utils
import { setMeta } from "@/utils/setMeta";

////// Fetch post by slug from strapi :

// Query variables
const post = ref<PostEntity>();

// Handle query (data & error) function
const handleQuery = async (data: any, error: any) => {
  try {
    // Graphql error + not found handling
    if (error.value?.message || data?.value?.posts?.data.length === 0) {
      throw error;
    }

    // Get post data
    post.value = data?.value?.posts?.data[0] as PostEntity;

    // Update meta tags
    const metaTagsObject = {
      title: post.value?.attributes?.SEO?.title,
      description: post.value?.attributes?.SEO?.description,
      imageUrl:
        runtimeConfig.public.STRAPI_SITE_URL +
        post.value?.attributes?.SEO?.image?.data?.attributes?.url,
      imageWidth: post.value?.attributes?.SEO?.image?.data?.attributes?.width,
      imageHeight: post.value?.attributes?.SEO?.image?.data?.attributes?.height,
      imageAlt:
        post.value?.attributes?.SEO?.image?.data?.attributes?.alternativeText,
    };

    setMeta(false, metaTagsObject);

    // Catch errors
  } catch (error: any) {
    // Throw error pretty-formated for error handler (error.vue), default is page not found
    throw createError({
      statusCode: error.value?.statusCode ?? 404,
      statusMessage: error.value?.message ?? t("error_404"),
      stack: error.value?.stack ?? "",
      fatal: true,
    });
  }
};

// Fetch on setup
const { data, error } = await useAsyncQuery<Query>(GET_POST_BY_SLUG, {
  locale: locale.value,
  slug: route.params.slug,
});
handleQuery(data, error);

// Watch for locale changes to translate post
watch(
  () => locale.value,
  async () => {
    const { data, error } = await useAsyncQuery<Query>(GET_POST_BY_SLUG, {
      locale: locale.value,
      slug: route.params.slug,
    });
    handleQuery(data, error);
  }
);
</script>
