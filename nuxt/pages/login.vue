<template>
  <button @click="onClick">LOGIN</button>
</template>

<script setup lang="ts">
const { login } = useStrapiAuth();
const router = useRouter();

const onClick = async () => {
  try {
    await login({
      identifier: "ulysselejovial@gmail.com",
      password: "fuv.UZR!mth8jbq5hft",
    });

    router.push("/preview");
  } catch (e) {
    console.error(e);
  }
};
</script>
