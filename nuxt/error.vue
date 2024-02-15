<script setup>
const error = useError();

const handleError = () => {
  clearError({
    redirect: "/",
  });
};
</script>

<template>
  <NuxtLayout>
    <!-- 404 page -->
    <main
      v-if="error?.statusCode === 404"
      class="min-h-full flex flex-col gap-2 p-2 justify-center items-center"
    >
      <h1>
        <strong>404</strong>
      </h1>
      <p>Sorry, that page doesn't exist.</p>
    </main>

    <!-- Default error page -->
    <main
      v-else-if="error"
      class="min-h-full flex flex-col gap-5 p-2 justify-center items-center"
    >
      <h1 class="text-2xl">
        <strong v-if="error?.statusCode"
          >ERROR - {{ error?.statusCode }}</strong
        >
        <strong v-else>ERROR</strong>
      </h1>

      <!-- Error message -->
      <pre
        v-if="error?.message"
        class="w-full text-xl flex justify-center items-center"
      >
          <strong>{{ error?.message }}</strong>
        </pre>

      <!-- Error stack trace -->
      <pre
        v-if="error?.stack"
        v-html="error?.stack"
        class="max-w-full border border-gray-300 rounded-lg px-5 py-2.5 mx-8"
      ></pre>

      <!-- Error resolver -->
      <a
        class="text-gray-900 hover:text-white border border-gray-300 hover:bg-gray-900 font-bold cursor-pointer rounded-lg text-sm px-5 py-2.5 text-center transition-colors dark:border-white-600 dark:text-white dark:hover:text-black dark:hover:bg-white"
        @click="handleError"
      >
        HOME
      </a>
    </main>
  </NuxtLayout>
</template>
