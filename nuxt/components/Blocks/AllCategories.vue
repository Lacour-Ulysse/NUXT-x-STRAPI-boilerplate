<template>
  <div class="flex gap-2">
    <UButton
      v-for="(category, index) in categories?.data"
      :to="localPath(`/category/${category.attributes?.slug}`)"
      target="_self"
    >
      {{ category.attributes?.name }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
// Graphql query
import { GET_ALL_CATEGORIES } from "@/gql/AllCategories";

// Types
import type {
  Query,
  PostCategoryEntityResponseCollection,
} from "@/types/Strapi";

// i18n / Language
const { t } = useI18n();
const locale = ref(useI18n().locale);
const localPath = useLocalePath();

////// Fetch all categories from strapi :

// Query variables
const categories = ref<PostCategoryEntityResponseCollection>();

// Query function
async function fetchCategories() {
  try {
    const { data, error } = await useAsyncQuery<Query>(GET_ALL_CATEGORIES, {
      locale: locale.value,
    });

    // Graphql error + not found handling
    if (
      error.value?.message ||
      data?.value?.postCategories?.data.length === 0
    ) {
      throw error;
    }

    // Get categories data
    categories.value = data?.value
      .postCategories as PostCategoryEntityResponseCollection;
  } catch (error: any) {
    // Throw error pretty-formated for error handler (error.vue), default is maintenance
    throw createError({
      statusCode: error.value?.statusCode ?? 503,
      statusMessage: error.value?.message ?? t("error_503"),
      stack: error.value?.stack ?? "",
      fatal: true,
    });
  }
}

// Fetch on setup
await fetchCategories();

// Watch for locale changes to update menu
watch(
  () => locale.value,
  async () => {
    await fetchCategories();
  }
);
</script>
