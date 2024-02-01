<template>
  <StrapiPage
    :key="`${strapiPage.id}_${locale}`"
    v-if="strapiPage"
    :strapiPage="strapiPage"
    :blocks="blocks"
  />
</template>

<script setup lang="ts">
// Graphql query
import { GET_STRAPI_PAGE } from "@/gql/PageBySlug";

// Types
import type { Query, PageEntity } from "@/types/Strapi";

// Route
const route = useRoute();

// Env
const runtimeConfig = useRuntimeConfig();

// i18n / Language
const { t } = useI18n();
const locale = ref(useI18n().locale);

// Utils
import { setMeta } from "@/utils/setMeta";

// Dynamic components
import { defineAsyncComponent } from "vue";
let blocks: any = [];

////// Fetch all pages from strapi :

// Query variables
const strapiPage = ref<PageEntity>();

// Handle query (data & error) function
const handleQuery = (data: any, error: any) => {
  try {
    // Graphql error + not found handling
    if (error.value?.message || data?.value?.pages?.data.length === 0) {
      throw error;
    }

    // Get pages data
    strapiPage.value = data?.value?.pages?.data[0] as PageEntity;

    // Update meta tags
    const metaTagsObject = {
      title: strapiPage.value?.attributes?.SEO?.title,
      description: strapiPage.value?.attributes?.SEO?.description,
      imageUrl:
        runtimeConfig.public.STRAPI_SITE_URL +
        strapiPage.value?.attributes?.SEO?.image?.data?.attributes?.url,
      imageWidth:
        strapiPage.value?.attributes?.SEO?.image?.data?.attributes?.width,
      imageHeight:
        strapiPage.value?.attributes?.SEO?.image?.data?.attributes?.height,
      imageAlt:
        strapiPage.value?.attributes?.SEO?.image?.data?.attributes
          ?.alternativeText,
    };

    setMeta(false, metaTagsObject);

    // Resolves components (dynamic zone)
    const components = strapiPage.value.attributes?.Components ?? [];
    blocks = components.map((component: any) => {
      return {
        component: defineAsyncComponent(
          () =>
            import(`../components/ComponentBlocks/${component.__typename}.vue`)
        ),
        data: component,
      };
    });

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
const { data, error } = await useAsyncQuery<Query>(GET_STRAPI_PAGE, {
  locale: locale.value,
  slug: route.params.pagePath,
});
handleQuery(data, error);

// Watch for locale changes to translate page
watch(
  () => locale.value,
  async () => {
    const { data, error } = await useAsyncQuery<Query>(GET_STRAPI_PAGE, {
      locale: locale.value,
      slug: route.params.pagePath,
    });
    handleQuery(data, error);
  }
);
</script>
