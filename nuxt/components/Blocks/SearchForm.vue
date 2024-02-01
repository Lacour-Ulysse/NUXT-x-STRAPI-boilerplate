// Search form, inspiration :
https://fadamakis.com/debounced-search-component-in-vue-js-a103daac34f2

<template>
  <UInput
    v-model="searchInput"
    name="searchInput"
    placeholder="Search..."
    icon="i-heroicons-magnifying-glass-20-solid"
    autocomplete="off"
    :ui="{ icon: { trailing: { pointer: '' } } }"
    @input="debouncedSubmitForm"
  >
    <template #trailing>
      <UButton
        v-show="searchInput !== ''"
        color="gray"
        variant="link"
        icon="i-heroicons-x-mark-20-solid"
        :padded="false"
        @click="resetForm()"
      />
    </template>
  </UInput>
  <div v-if="errorMessage">{{ errorMessage }}</div>

  <!-- loading state -->
  <div v-else-if="isLoading">Loading..</div>

  <!-- Search results -->
  <div v-else-if="searchResults?.data.length" class="mb-8">
    <p class="font-bold mb-2">Your search results:</p>
    <div class="flex flex-wrap">
      <div class="mr-4 mb-2 flex">
        {{ searchResults?.data }}
      </div>
    </div>

    <!-- Pagination -->
    <button
      v-if="currentPage > 1"
      @click="previousPage"
      class="border rounded px-2 py-1 text-gray-800 border-gray-300 text-sm mt-2"
    >
      PREVIOUS
    </button>
    <span class="py-2 px-4"></span>
    <button
      v-if="currentPage < lastPage"
      @click="nextPage"
      class="border rounded px-2 py-1 text-gray-800 border-gray-300 text-sm mt-2"
    >
      NEXT
    </button>
  </div>

  <!-- Nothing found -->
  <p class="font-bold" v-else>
    {{ t("nothing_found") ?? "Oups, an error happened..." }}
  </p>
</template>

<script setup lang="ts">
// Custom debounce function
import debounce from "@/assets/js/debounce";

// Graphql query
import { SEARCH_POST_BY_TITLE } from "@/gql/SearchPosts";

// Types
import type { Query, PostEntityResponseCollection } from "@/types/Strapi";

// i18n / Language
const { t } = useI18n();
const { locale } = useI18n();

// Search objects
const isLoading = ref(false);
const errorMessage = ref("");
const searchInput = ref("");
const searchResults = ref<PostEntityResponseCollection>();

// Pagination objects
const currentPage = ref(1); // current page
const pageSize = ref(1); // number of item per page
const lastPage = ref(1); // stores amount of page in serach result

// Pagination functions
const previousPage = () => {
  // Decrement current page number
  currentPage.value--;
  // Search
  submitForm();
};

const nextPage = () => {
  // Increment current page number
  currentPage.value++;
  // Search
  submitForm();
};

// Search function
const submitForm = async () => {
  try {
    // Init loading state
    isLoading.value = true;

    // Query logic
    const { data, error } = await useAsyncQuery<Query>(SEARCH_POST_BY_TITLE, {
      title: searchInput.value,
      page: currentPage.value,
      pageSize: pageSize.value,
      locale: locale.value,
    });

    // Watch for error
    if (error.value?.message) {
      throw error;
    }

    // Handle search result
    else if (data?.value.posts) {
      // Update displayed data based on query results
      searchResults.value = data?.value.posts as PostEntityResponseCollection;

      // Update lastPage value with returned pageCount
      lastPage.value = data?.value.posts?.meta.pagination.pageCount;
    }

    // Handle errors
  } catch (error: any) {
    errorMessage.value = t("error_message") ?? "Oups, an error happened...";
    console.error("SearchForm", error.value);

    // Reset loading state
  } finally {
    isLoading.value = false;
  }
};

// Reset search ref
const resetForm = () => {
  searchInput.value = "";
  searchResults.value = {
    data: [],
    meta: {
      pagination: {
        page: 0,
        pageSize: 0,
        pageCount: 0,
        total: 0,
      },
    },
  };
};

// Debounce submit function to limit request frequency
const debouncedSubmitForm = debounce(submitForm, 500);

// Watch for locale changes to apply on search
watch(
  () => locale.value,
  async () => {
    // Reset search parameters
    currentPage.value = 1;
    pageSize.value = 1;
    lastPage.value = 1;

    // Resend search
    await submitForm();
  }
);
</script>
