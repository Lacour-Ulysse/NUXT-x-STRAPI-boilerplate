// Store
import { useTranslationsStore } from "@/store/translations";

// Type
import type { DefaultTranslation } from "@/types/Utils";

export const loadFallbacksTranslations = async () => {
  try {
    // i18n / Language (accessing nuxtApp locale since utils not in setup script)
    const nuxtApp = useNuxtApp();
    const locale = nuxtApp.$i18n.locale;

    // Store utility functions
    const translationsStore = useTranslationsStore();
    const { setTranslations } = translationsStore;

    // Import json data from @locales/locale.json file
    const translation = await import(`~/locales/${locale.value}.json`);
    const translations: DefaultTranslation = translation.default;

    // Remove unecessary data from json file
    const filteredTranslations = Object.fromEntries(
      Object.entries(translations).map(([key, value]) => [
        key,
        value.body.static,
      ])
    );

    // Update store
    setTranslations(filteredTranslations);
  } catch (error) {
    console.error("loadFallbacksTranslations", error);
  }
};
