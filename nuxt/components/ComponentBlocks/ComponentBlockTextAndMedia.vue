<template>
  <section class="text-and-media">
    <h2 v-if="blockData.title">{{ blockData.title }}</h2>
    <div
      :class="[
        'text-and-media__wrapper',
        `media--${blockData.media_side ? blockData.media_side : 'left'}`,
      ]"
    >
      <div
        v-if="blockData.media?.data?.attributes?.mime.startsWith('video/')"
        class="media"
      >
        <ClientOnly>
          <VideoPlayer
            :options="{
              fluid: true,
              autoplay: true,
              muted: true,
              controls: true,
              sources: [
                {
                  src: strapiURL + blockData.media?.data?.attributes?.url,
                  type: blockData.media?.data?.attributes?.mime,
                },
              ],
            }"
          />
          <!-- <VideoPlayer
          v-if="blockData.media?.data?.attributes?.mime.startsWith('video/')"
          :videoUrl="strapiURL + blockData.media?.data?.attributes?.url"
        /> -->
        </ClientOnly>
      </div>

      <div v-else-if="blockData.media?.data?.attributes?.url" class="media">
        <NuxtImg
          loading="lazy"
          sizes="sm:600px md:800px lg:100vw"
          :src="`${blockData.media.data.attributes?.url}`"
          :alt="blockData.media.data.attributes?.alternativeText ?? 'image'"
        />
      </div>

      <div class="text">
        <Richtext v-if="blockData.text" :rich-text="blockData.text" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.text-and-media {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  padding: 1rem 0;

  .text-and-media__wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;

    .text,
    .media {
      width: 50%;
    }

    &.media {
      &--left {
        .media {
          order: 1;
        }
        .text {
          order: 2;
        }
      }
      &--right {
        .media {
          order: 2;
        }
        .text {
          order: 1;
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
// Types
import type { ComponentBlockTextAndMedia } from "@/types/Strapi";

const runtimeConfig = useRuntimeConfig();
const strapiURL = runtimeConfig.public.STRAPI_SITE_URL;

const props = defineProps({
  blockData: {
    type: Object as PropType<ComponentBlockTextAndMedia>,
    required: true,
  },
});
</script>
