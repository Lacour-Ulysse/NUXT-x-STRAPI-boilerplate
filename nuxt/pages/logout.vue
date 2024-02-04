<template>
  <button @click="onClick">LOGOUT</button>
</template>

<script setup lang="ts">
const { logout } = useStrapiAuth();
const router = useRouter();

const onClick = () => {
  logout();

  router.push("/");
};
</script>
