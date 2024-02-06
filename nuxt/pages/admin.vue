<template>
  <UNotification
    v-if="showNotif"
    :icon="
      errorNotif ? 'i-ic-twotone-error' : 'i-icon-park-twotone-preview-open'
    "
    :color="errorNotif ? 'red' : 'primary'"
    id="notif"
    :title="errorNotif ? 'Wrong credentials' : 'Logged in'"
    :description="
      errorNotif
        ? 'Try again or warn an administrator.'
        : 'You can now view all drafts as published.'
    "
    :timeout="3000"
    :callback="notifCallback"
    class="bg-transparent"
  />
  <main
    v-if="!user"
    class="flex-1 w-full mt-4 flex flex-col items-center justify-center"
  >
    <h1 class="p-2 text-lg font-semibold">Enter preview mode :</h1>
    <UForm
      :state="state"
      class="w-full max-w-lg flex flex-col items-center gap-6"
      @submit="loginUser"
    >
      <UFormGroup label="Email" name="email" class="w-full flex flex-col gap-1">
        <UInput v-model="state.identifier" />
      </UFormGroup>

      <UFormGroup
        label="Password"
        name="password"
        class="w-full flex flex-col gap-1"
      >
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit"> Login </UButton>
    </UForm>
  </main>
  <main
    v-else
    class="flex-1 w-full mt-4 flex flex-col items-center justify-center"
  >
    <UButton
      icon="i-pepicons-print-eye-closed"
      size="xl"
      color="red"
      variant="solid"
      label="Logout"
      :trailing="false"
      @click="logoutUser"
    />
  </main>
</template>

<script setup lang="ts">
// Nuxt UI
import type { FormSubmitEvent } from "#ui/types";

// Routing
const router = useRouter();

// Auth/Preview mode
const user = ref(useStrapiUser());

// Authentication
const { login, logout } = useStrapiAuth();
const state = reactive({
  identifier: "",
  password: "",
});

// Notification
const showNotif = ref(false);
const errorNotif = ref(false);

async function loginUser(event: FormSubmitEvent<any>) {
  try {
    await login(state);
    showNotif.value = true;
  } catch (e) {
    console.error(e);
    errorNotif.value = true;
    showNotif.value = true;
  }
}

const logoutUser = () => {
  router.push("/");
  setTimeout(() => logout(), 1000);
};

function notifCallback() {
  showNotif.value = false;
  errorNotif.value = false;
}
</script>
