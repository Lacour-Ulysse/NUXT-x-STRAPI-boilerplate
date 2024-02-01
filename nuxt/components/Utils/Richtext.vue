<template>
  <div class="richtext" v-html="richText"></div>
</template>

<script setup lang="ts">
const props = defineProps({
  richText: {
    type: String,
    required: true,
  },
});
</script>
