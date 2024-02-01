// Fallback/default translations in @locales/current_locale.json files loaded with @utils/loadFallbacksTranslations.ts

import { defineStore } from "pinia";

export const useTranslationsStore = defineStore("translationsStore", () => {
  const allTranslations = ref({
    test: "test - to erase",
  });

  const setTranslations = (translations: any) => {
    allTranslations.value = { ...allTranslations.value, ...translations };
  };

  return { setTranslations, allTranslations };
});
