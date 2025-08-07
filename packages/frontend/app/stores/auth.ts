interface UserAuthResponse {
  displayName: string
  token?: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>()
  const user = ref<string>()

  async function register(credentials: { email: string, password: string }) {
    const data = await useNuxtApp().$api<UserAuthResponse>('/register', {
      method: 'POST',
      body: credentials,
    })

    token.value = data.token
    user.value = data.displayName
  }

  async function login(credentials: { email: string, password: string }) {
    const data = await useNuxtApp().$api<UserAuthResponse>('/login', {
      method: 'POST',
      body: credentials,
    })

    token.value = data.token
    user.value = data.displayName
  }

  async function logout() {
    await useNuxtApp().$api('/logout')
    user.value = undefined
    token.value = undefined
    await navigateTo('/login')
    useCategoriesStore().clear()
    useOperationsStore().clear()
  }

  return {
    token,
    user,
    register,
    login,
    logout,
  }
}, {
  persist: {
    pick: ['token', 'user'],
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
