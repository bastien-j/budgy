export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const baseURL = typeof config.public.apiBaseUrl === 'string' ? config.public.apiBaseUrl : '/'

  const api = $fetch.create({
    baseURL,
    onRequest({ options }) {
      if (authStore.token) {
        options.headers.set('Authorization', `Bearer ${authStore.token}`)
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
