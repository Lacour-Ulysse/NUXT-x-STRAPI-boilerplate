<script setup>
// i18n / Language
const { t } = useI18n();

// State
import { useTranslationsStore } from "@/store/translations";
import { storeToRefs } from "pinia";

const translationsStore = useTranslationsStore();
const { allTranslations } = storeToRefs(translationsStore);
</script>

<template>
  <div>
    {{ allTranslations }}
  </div>
</template>
