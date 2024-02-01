<script setup lang="ts">
// Types
import type { ComponentSocialsSeo } from "@/types/Strapi";

// i18n / Language
const locale = ref(useI18n().locale);

import { GET_META_AND_TRANSLATIONS } from "@/gql/MetaAndTranslations";
import type { Query } from "@/types/Strapi";

// i18n Head
// Docs : https://v8.i18n.nuxtjs.org/guide/seo
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

// Fetch & set meta tags on set up
await loadFallbacksTranslations();
const { data, error } = await useAsyncQuery<Query>(GET_META_AND_TRANSLATIONS, {
  locale: locale.value,
});
const strapiMeta = data?.value?.websiteInformation?.data?.attributes
  ?.SEO as ComponentSocialsSeo;
useHead({
  titleTemplate: (titleChunk) => {
    if (strapiMeta?.title == titleChunk) return titleChunk;
    return titleChunk
      ? `${titleChunk} - ${strapiMeta?.title}`
      : strapiMeta?.title;
  },
});
setMetaAndTranslations(data, error);

// Watch for locale changes so meta tags and translations update when changing language
watch(
  () => locale.value,
  async () => {
    await loadFallbacksTranslations();
    const { data, error } = await useAsyncQuery<Query>(
      GET_META_AND_TRANSLATIONS,
      {
        locale: locale.value,
      }
    );
    const strapiMeta = data?.value?.websiteInformation?.data?.attributes
      ?.SEO as ComponentSocialsSeo;
    useHead({
      titleTemplate: (titleChunk) => {
        if (strapiMeta?.title == titleChunk) return titleChunk;
        return titleChunk
          ? `${titleChunk} - ${strapiMeta?.title}`
          : strapiMeta?.title;
      },
    });
    setMetaAndTranslations(data, error);
  }
);

// Favicon
// TODO : favicon from Strapi ?
useHead({
  link: [
    {
      rel: "icon",
      type: "svg",
      href: "https://api.iconify.design/fluent-emoji-flat:new-moon-face.svg",
    },
  ],
});
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
      <Head>
        <template v-for="link in head.link" :key="link.id">
          <Link
            :id="link.id"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta
            :id="meta.id"
            :property="meta.property"
            :content="meta.content"
          />
        </template>
      </Head>
      <Body>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </Body>
    </Html>
  </div>
</template>
