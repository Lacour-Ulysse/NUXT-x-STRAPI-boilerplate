<template>
  <div
    class="flex justify-between items-center px-2 w-full h-24 border-b border-gray-200 dark:border-gray-900"
  >
    <div class="w-2/12 flex justify-start">
      <NuxtLink to="/">
        <img
          src="@/assets/image/logo.png"
          alt="Logo"
          class="w-16 h-16"
          width="64px"
          height="64px"
        />
      </NuxtLink>
    </div>
    <div class="w-8/12 flex justify-center"><NavigationMenu /></div>

    <div class="w-2/12 flex justify-end"><LanguageSwitcher /></div>

    <!-- <ToggleDarkModeBtn /> -->
  </div>
</template>
