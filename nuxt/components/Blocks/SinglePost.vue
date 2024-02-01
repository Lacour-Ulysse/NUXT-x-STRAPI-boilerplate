<template>
  <article class="w-full flex flex-col items-center content-center gap-2">
    <h1>{{ attributes.title }}</h1>

    <Richtext
      v-if="attributes.description"
      :rich-text="attributes.description"
      style="width: 75vw; max-width: 64ch"
    />

    <NuxtImg
      v-if="attributes?.image?.data"
      loading="lazy"
      sizes="sm:600px md:800px lg:100vw"
      :src="`${attributes?.image?.data?.attributes?.url}`"
      :alt="attributes?.image?.data?.attributes?.alternativeText ?? 'image'"
    />
  </article>
</template>

<script setup lang="ts">
import type { Post } from "@/types/Strapi";

const props = defineProps({
  attributes: {
    type: Object as PropType<Post>,
    required: true,
  },
});
</script>
