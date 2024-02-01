<template>
  <div
    class="flex justify-between items-center px-2 w-full h-24 border-b border-gray-200 dark:border-gray-900"
  >
    <div>
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
    <h1>STRAPI x NUXT</h1>
    <NavigationMenu />
    <LanguageSwitcher />
    <ToggleDarkModeBtn />
  </div>
</template>
