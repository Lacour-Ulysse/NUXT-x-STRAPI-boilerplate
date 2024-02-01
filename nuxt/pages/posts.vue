<template>
  <main
    class="grid-layout md:flex-col md:flex-wrap md:justify-center gap-5 p-3"
  >
    <SearchForm />
    <h2 class="text-lg font-bold mt-8">CATEGORIES :</h2>
    <AllCategories />

    <h2 class="text-lg font-bold mt-8">POSTS :</h2>
    <AllPosts />
  </main>
</template>

<script setup lang="ts">
const { t } = useI18n();
// Update head meta informations
useHead({
  title: "Posts",
});
</script>
