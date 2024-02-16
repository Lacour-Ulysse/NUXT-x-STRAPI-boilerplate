<template>
  <header class="bg-white">
    <div
      id="header"
      class="flex justify-between items-center px-2 w-full h-24 border-b border-gray-200 dark:border-gray-900"
    >
      <div class="w-2/12 flex justify-start">
        <NuxtLink to="/">
          <img
            src="@/assets/image/logo.png"
            alt="Logo"
            class="w-16 h-16"
            width="64px"
            height="64px"
          />
        </NuxtLink>
      </div>

      <div class="w-8/12 flex justify-center">
        <NavigationMenu :strapi-pages="strapiPages" />
        <Hamburger @clicked="toggleMobileMenu" />
      </div>

      <div class="w-2/12 flex justify-end"><LanguageSwitcher /></div>
    </div>

    <div id="mobile-menu" class="border-b border-gray-200">
      <NavigationMenu :strapi-pages="strapiPages" />
    </div>
  </header>
</template>

<script setup lang="ts">
// Graphql query
import { GET_ALL_PAGES } from "@/gql/AllPages";

// Types
import type { Query, PageEntityResponseCollection } from "@/types/Strapi";

// i18n / Language
const locale = ref(useI18n().locale);

// Auth/Preview mode
const user = ref(useStrapiUser());

////// Fetch all pages from strapi :

// Query variables
const strapiPages = ref<PageEntityResponseCollection>();

// Received clicked burger menu
const toggleMobileMenu = () => {
  const menu = document.getElementById("mobile-menu");
  if (menu) {
    menu.classList.toggle("open");
  }
};

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
