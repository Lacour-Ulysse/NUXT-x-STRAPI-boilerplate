<template>
  <div v-if="strapiPages?.data" class="flex gap-2">
    <!-- Nuxt pages -->
    <NuxtLink :to="localPath('/')">Home</NuxtLink>
    <NuxtLink :to="localPath('/posts')">Posts</NuxtLink>
    <!-- Strapi pages -->
    <NuxtLink
      v-for="(page, index) in strapiPages?.data"
      :key="page.id ?? index"
      :to="localPath(`/${page.attributes?.slug}`)"
      >{{ page.attributes?.title }}</NuxtLink
    >
    <!-- Admin -->
    <NuxtLink :to="localPath('/admin')">Admin</NuxtLink>
  </div>
</template>

<script setup lang="ts">
// Graphql query
import { GET_ALL_PAGES } from "@/gql/AllPages";

// Types
import type { Query, PageEntityResponseCollection } from "@/types/Strapi";

// // i18n / Language
const localPath = useLocalePath();
const locale = ref(useI18n().locale);

// Auth/Preview mode
const user = ref(useStrapiUser());

////// Fetch all pages from strapi :

// Query variables
const strapiPages = ref<PageEntityResponseCollection>();

// Query function
async function fetchStrapiPages() {
  const publicationState = user.value ? "PREVIEW" : "LIVE";

  const { data, error } = await useAsyncQuery<Query>(GET_ALL_PAGES, {
    locale: locale.value,
    publicationState: publicationState,
  });

  // Get pages data
  if (data?.value?.pages?.data) {
    strapiPages.value = data?.value.pages as PageEntityResponseCollection;
  } else if (error) {
    console.error("NavigationMenu", error);
  }
}

// Fetch on setup
await fetchStrapiPages();

// Watch for locale changes to update menu
watch(
  () => [locale.value, user.value],
  async () => {
    await fetchStrapiPages();
  }
);
</script>
