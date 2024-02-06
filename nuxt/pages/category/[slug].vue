<template>
  <main class="grid-layout md:flex md:flex-wrap md:justify-center gap-10 p-3">
    <h2 v-if="postsByCatgeory?.data[0]" class="text-lg font-bold mt-8">
      {{
        postsByCatgeory?.data[0].attributes?.categories?.data[0]?.attributes
          ?.name
      }}
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
import { GET_POSTS_BY_CATEGORY } from "@/gql/PostsByCategory";

// Types
import type { Query, PostEntityResponseCollection } from "@/types/Strapi";

// Route
const route = useRoute();

// i18n / Language
const { t } = useI18n();
const locale = ref(useI18n().locale);
const localPath = useLocalePath();

// Auth/Preview mode
const user = useStrapiUser();
const publicationState = user.value ? "PREVIEW" : "LIVE";

////// Fetch posts by category from strapi :

// Query variables
const postsByCatgeory = ref<PostEntityResponseCollection>();

const handleQuery = async (data: any, error: any) => {
  try {
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
};

const { data, error } = await useAsyncQuery<Query>(GET_POSTS_BY_CATEGORY, {
  category: route.params.slug,
  locale: locale.value,
  publicationState: publicationState,
});
handleQuery(data, error);

// Watch for locale changes to refetch and rerender component with translated data
watch(
  () => locale.value,
  async () => {
    const { data, error } = await useAsyncQuery<Query>(GET_POSTS_BY_CATEGORY, {
      category: route.params.slug,
      locale: locale.value,
      publicationState: publicationState,
    });
    handleQuery(data, error);
  }
);
</script>
