<template>
  <article
    v-for="(post, index) in allPosts?.data"
    :key="post.id ?? index"
    class="w-full text-center flex flex-col items-center gap-5 p-3"
  >
    <h2>{{ post.attributes?.title }}</h2>

    <UButton
      icon="fluent:open-12-filled"
      :to="localPath(`/post/${post.attributes?.slug}`)"
      target="_self"
      class="rounded-full w-fit"
    />
  </article>
</template>

<script setup lang="ts">
// Graphql query
import { GET_ALL_POSTS } from "@/gql/AllPosts";

// Types
import type { Query, PostEntityResponseCollection } from "@/types/Strapi";

// i18n / Language
const { t } = useI18n();
const locale = ref(useI18n().locale);
const localPath = useLocalePath();

// Auth/Preview mode
const user = useStrapiUser();
const publicationState = user.value ? "PREVIEW" : "LIVE";

////// Fetch all posts from strapi :

// Query variables
const allPosts = ref<PostEntityResponseCollection>();

// Query function
async function fetchAllPosts() {
  try {
    const { data, error } = await useAsyncQuery<Query>(GET_ALL_POSTS, {
      locale: locale.value,
      publicationState: publicationState,
    });

    // Graphql error + not found handling
    if (error.value?.message || data?.value?.posts?.data.length === 0) {
      throw error;
    }

    // Get posts data
    allPosts.value = data?.value.posts as PostEntityResponseCollection;

    // Catch errors
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
await fetchAllPosts();

// Watch for locale changes to refetch and rerender component with translated data
watch(
  () => locale.value,
  async () => {
    await fetchAllPosts();
  }
);
</script>
