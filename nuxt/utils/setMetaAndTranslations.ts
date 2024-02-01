// Types
import type { FormatData } from "@/types/Images";
import type {
  ComponentUiTranslations,
  ComponentSocialsSeo,
} from "@/types/Strapi";

// Store
import { useTranslationsStore } from "@/store/translations";
import { useMetaTagsStore } from "@/store/metaTags";

// Utils
import { setMeta } from "@/utils/setMeta";

// Get Meta informations from Strapi or fallbacks
export const setMetaAndTranslations = (data: any, error: any) => {
  // Use env variables
  const runtimeConfig = useRuntimeConfig();

  // i18n / Language (accessing threw nuxtApp locale since utils are not in setup script)
  const nuxtApp = useNuxtApp();

  // Store utility functions
  const translationsStore = useTranslationsStore();
  const seoStore = useMetaTagsStore();
  const { setTranslations } = translationsStore;
  const { setMetaTags } = seoStore;

  // Fetch meta/seo tags from Strapi and handle error with fallback
  // For translations we're using default/fallbacks from @locales/current_locale.json files with @utils/loadFallbacksTranslations.ts
  try {
    // If error OR no data fetched, use default and raise error
    if (error.value || !data?.value?.websiteInformation?.data) {
      // Default meta and translations
      useHead({
        titleTemplate: (titleChunk) => {
          if (nuxtApp.$i18n.t("site_title") == titleChunk) return titleChunk;
          return titleChunk
            ? `${titleChunk} - ${nuxtApp.$i18n.t("site_title")}`
            : nuxtApp.$i18n.t("site_title");
        },
      });
      useSeoMeta({
        robots: "index,follow",
        description: () =>
          nuxtApp.$i18n.t("site_description") ?? "Website description",
      });

      throw error;
    }

    // // // // // // // // // // //
    // // // TRANSLATIONS // // // /

    const strapiTranslations = data?.value?.websiteInformation?.data?.attributes
      ?.Translations as ComponentUiTranslations;

    const translationsObject = { ...strapiTranslations };
    delete translationsObject.__typename;

    // Update Pinia translations
    setTranslations(translationsObject);

    // // // // // // // // // // //
    // // // SEO/META TAGS // // //

    const strapiMeta = data?.value?.websiteInformation?.data?.attributes
      ?.SEO as ComponentSocialsSeo;

    // useHead({
    //   titleTemplate: (titleChunk) => {
    //     if (strapiMeta?.title == titleChunk) return titleChunk;
    //     return titleChunk
    //       ? `${titleChunk} - ${strapiMeta?.title}`
    //       : strapiMeta?.title;
    //   },
    // });

    const metaImage: FormatData =
      strapiMeta?.image?.data?.attributes?.formats.large ||
      strapiMeta?.image?.data?.attributes?.formats.thumbnail;

    // Meta tags object, fallbacks with @locales/current_locale.json file
    const seoObject = {
      title: strapiMeta?.title ?? nuxtApp.$i18n.t("site_title"),
      description:
        strapiMeta?.description ?? nuxtApp.$i18n.t("site_description"),
      imageUrl: `${runtimeConfig.public.STRAPI_SITE_URL}${metaImage.url}`,
      imageWidth: metaImage.width,
      imageHeight: metaImage.height,
      imageAlt: strapiMeta?.image?.data?.attributes?.alternativeText ?? "",
    };

    // Update Pinia meta tags
    setMetaTags(seoObject);

    // Update head meta tags
    setMeta(true, seoObject);
  } catch (error) {
    console.error("setMetaAndTranslations", error);
  }
};
