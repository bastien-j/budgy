<script setup>
definePageMeta({
  layout: 'empty',
})

const email = ref('')
const password = ref('')
const error = ref('')

const authStore = useAuthStore()

async function login() {
  try {
    await authStore.login({ email: email.value, password: password.value })
    navigateTo('/')
  }
  catch (e) {
    console.error(e)
    error.value = 'Invalid email or password'
  }
}
</script>

<template>
  <form
    class="min-w-100 absolute top-[50%] left-[50%] -translate-[50%] shadow-lg rounded p-4 flex flex-col gap-4 bg-slate-100"
    @submit.prevent="login"
  >
    <span class="text-lg">Login</span>

    <UInput
      v-model="email"
      icon="material-symbols:mail"
      placeholder="Email"
      type="email"
      name="email"
      autocomplete="email"
      autofocus
      required
    />

    <UInput
      v-model="password"
      icon="material-symbols:lock"
      placeholder="Password"
      type="password"
      name="password"
      autocomplete="current-password"
      required
    />

    <UButton
      class="justify-center"
      color="neutral"
      icon="material-symbols:login"
      label="Login"
      type="submit"
    />

    <div
      v-if="error"
      class="error"
    >
      {{ error }}
    </div>
  </form>
</template>
