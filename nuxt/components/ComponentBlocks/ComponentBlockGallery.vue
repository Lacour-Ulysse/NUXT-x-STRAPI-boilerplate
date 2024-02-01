<template>
  <section class="gallery-block">
    <h2 v-if="blockData.title">{{ blockData.title }}</h2>

    <carousel :items-to-show="1.25" v-if="blockData.medias">
      <slide
        v-for="(slide, idx) in blockData.medias.data"
        :key="slide.id ?? idx"
      >
        <NuxtImg
          sizes="sm:600px md:800px lg:100vw"
          :src="`${slide.attributes?.url}`"
          :alt="slide.attributes?.alternativeText ?? 'Slider image'"
        />
      </slide>

      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </section>
</template>

<script setup lang="ts">
// Doc : https://ismail9k.github.io/vue3-carousel/examples.html
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

// Types
import type { ComponentBlockGallery } from "@/types/Strapi";

const props = defineProps({
  blockData: {
    type: Object as PropType<ComponentBlockGallery>,
    required: true,
  },
});
</script>

<style lang="scss">
.gallery-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  padding: 1rem 0;
}
</style>
