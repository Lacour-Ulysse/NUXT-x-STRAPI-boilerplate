<template>
  <main
    :key="strapiPage.id ?? 'key'"
    v-if="strapiPage?.attributes"
    class="grid-layout md:flex flex-col md:flex-wrap md:justify-center gap-10 p-3"
  >
    <h1>{{ strapiPage.attributes.title }}</h1>

    <!-- Show all components -->
    <div class="components w-full">
      <component
        :is="block.component"
        v-for="(block, index) in blocks"
        :key="index"
        :blockData="block.data"
      >
      </component>
    </div>
  </main>
</template>

<script setup lang="ts">
// Types
import type { PageEntity, PageComponentsDynamicZone } from "@/types/Strapi";

const props = defineProps({
  strapiPage: {
    type: Object as PropType<PageEntity>,
    required: true,
  },
  blocks: {
    type: Array as PropType<Array<PageComponentsDynamicZone | any>>,
  },
});
</script>
