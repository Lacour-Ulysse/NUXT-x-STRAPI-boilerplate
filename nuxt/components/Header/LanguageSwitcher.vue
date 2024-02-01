<script setup lang="ts">
// Get current locale (as ref), setter and supported locales
const currentLocale = ref(useI18n().locale);
const { locales, setLocale } = useI18n();
const supportedLocales = locales.value as Array<any>;

// Full name of current locale
const getFullLocaleName = (currentLocale: string) => {
  const currentLocaleName = supportedLocales.find(
    (loc) => loc.code === currentLocale
  );
  return currentLocaleName ? currentLocaleName.name : currentLocale;
};

// Create dropdown items array
import type { DropdownItem } from "#ui/types";

const dropdownItems = ref<Array<Array<DropdownItem>>>([]);

function createDropdown() {
  for (const loc of supportedLocales) {
    if (loc.code !== currentLocale.value) {
      dropdownItems.value.push([
        {
          label: loc.name,
          click: () => {
            setLocale(loc.code);
          },
          class: "w-full",
        },
      ]);
    }
  }
}

// Create dropdown setup
createDropdown();

// Watch for locale changes to update dropdown
watch(
  () => currentLocale.value,
  () => {
    dropdownItems.value = [];
    createDropdown();
  }
);
</script>

<template>
  <UDropdown
    :items="dropdownItems"
    :popper="{ arrow: true, placement: 'bottom-start' }"
    class="w-28"
  >
    <UButton
      color="white"
      :label="getFullLocaleName(currentLocale)"
      trailing-icon="i-heroicons-chevron-down-20-solid"
      class="w-28 justify-around"
    />
  </UDropdown>
</template>

<style lang="scss">
[data-popper-placement="bottom-start"] {
  @apply w-28;
}
[role="menuitem"] {
  @apply justify-center;
}
</style>
