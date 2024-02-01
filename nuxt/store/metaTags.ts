import { defineStore } from "pinia";

export const useMetaTagsStore = defineStore("metaTagsStore", () => {
  const allMetaTags = ref({
    title: "My website",
    description: "My website description",
    imageUrl: "My website image url",
    imageAlt: "My website image alt",
    imageWidth: 1200,
    imageHeight: 630,
  });

  const setMetaTags = (metaTags: any) => {
    allMetaTags.value = { ...allMetaTags.value, ...metaTags };
  };

  return { setMetaTags, allMetaTags };
});
