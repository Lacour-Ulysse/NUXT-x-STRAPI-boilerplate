<template>
  <main class="grid-layout md:flex md:flex-wrap md:justify-center gap-10 p-3">
    <h2 v-if="postsByCatgeory?.data" class="text-lg font-bold mt-8">
      {{
        postsByCatgeory?.data[0].attributes?.categories?.data[0].attributes
          ?.name
      }}
      :
    </h2>
    <article
      v-for="(post, index) in postsByCatgeory?.data"
      :key="post.id ?? index"
      class="w-full text-center"
    >
      <h2>{{ post.attributes?.title }}</h2>
      <p>{{ post.attributes?.slug }}</p>
      <p>{{ post.attributes?.updatedAt }}</p>

      <NuxtLink
        :to="localPath(`/post/${post.attributes?.slug}`)"
        class="border rounded px-2 py-1 text-gray-800 border-gray-300 text-sm mt-2"
      >
        SEE MORE
      </NuxtLink>
    </article>
  </main>
</template>

<script setup lang="ts">
// Graphql query
import { GET_POSTS_BY_CATEGORY, GET_TRANSLATION } from "@/gql/PostsByCategory";

// Types
import type { Query, PostEntityResponseCollection } from "@/types/Strapi";

// Route
const route = useRoute();

// i18n / Language
const { t } = useI18n();
const locale = ref(useI18n().locale);
const queryLocale = ref(locale.value);
const translationLocale = ref("");
const translatedCategory: any = ref("");
const localPath = useLocalePath();

////// Fetch posts by category from strapi :

// Query variables
const postsByCatgeory = ref<PostEntityResponseCollection>();

// Query functions
async function fetchPostsByCatgeory(query: any) {
  try {
    const { data, error } = await useAsyncQuery<Query>(query, {
      category: route.params.slug,
      locale: queryLocale.value,
      translation: translationLocale.value,
    });

    // Graphql error + not found handling
    if (error.value?.message || data?.value?.posts?.data.length === 0) {
      throw error;
    }

    // Get posts data
    postsByCatgeory.value = data?.value.posts as PostEntityResponseCollection;

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
}

async function getTranslatedCategorySlug(query: any) {
  try {
    const { data, error } = await useAsyncQuery<Query>(query, {
      category: route.params.slug,
      locale: queryLocale.value,
      translation: translationLocale.value,
    });

    // Graphql error + not found handling
    if (
      error.value?.message ||
      !data.value.postCategories?.data[0]?.attributes?.localizations?.data[0]
        ?.attributes?.slug
    ) {
      throw error;
    }

    // Get translated category slug
    translatedCategory.value =
      data.value.postCategories?.data[0]?.attributes?.localizations?.data[0]
        ?.attributes?.slug;

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
}

// Fetch on setup
await fetchPostsByCatgeory(GET_POSTS_BY_CATEGORY);

// Watch for locale changes to refetch and rerender component with translated data
watch(
  () => locale.value,
  async () => {
    translationLocale.value = locale.value;
    await getTranslatedCategorySlug(GET_TRANSLATION);

    // If same slug just refetch data else redirect
    if (translatedCategory.value === route.params.slug) {
      queryLocale.value = translationLocale.value;
      await fetchPostsByCatgeory(GET_POSTS_BY_CATEGORY);
    } else {
      navigateTo(`/category/${translatedCategory.value}`);
    }
  }
);
</script>
