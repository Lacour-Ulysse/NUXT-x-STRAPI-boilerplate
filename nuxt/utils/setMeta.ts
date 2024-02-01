import { useMetaTagsStore } from "@/store/metaTags";

// Use reset (boolean) param to rollback to main meta tags, provide dedicated SEO content for specfic page threw metaTags param (object)
// TODO : Type for metaTags
export const setMeta = (reset = false, metaTags: any = {}) => {
  try {
    // reset = true uses meta tags from pinia (=> main ones, fetch from app.vue)
    const meta = reset ? useMetaTagsStore() : metaTags;
    const tags = reset ? meta.allMetaTags : metaTags;

    // Set Head title (titleTemplate set in setMetaAndTranslations.ts)
    useHead({
      title: () => tags.title,
    });

    // Set SEO meta tags
    useSeoMeta({
      robots: "index,follow",
      ogTitle: () => tags.title,
      description: () => tags.description,
      ogDescription: () => tags.description,
      twitterTitle: () => tags.title,
      twitterDescription: () => tags.description,
    });

    // Set meta image data
    useSeoMeta({
      twitterCard: "summary_large_image",
      ogImage: () => tags.imageUrl,
      ogImageAlt: () => tags.imageAlt,
      ogImageWidth: () => tags.imageWidth,
      ogImageHeight: () => tags.imageHeight,
      twitterImage: () => tags.imageUrl,
      twitterImageWidth: () => tags.imageWidth,
      twitterImageHeight: () => tags.imageHeight,
    });
  } catch (error) {
    console.error("setMeta", error);
  }
};
