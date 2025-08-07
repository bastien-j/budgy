export const useOperationsStore = defineStore('operations', () => {
  const { data, clear, refresh } = useAPI<Operation[]>('/operations')

  async function createOperation(operation: Partial<Operation>) {
    try {
      await useNuxtApp().$api('/operations', {
        method: 'POST',
        body: operation,
      })
      await refresh()
    }
    catch (error) {
      console.error(error)
    }
  }

  async function deleteOperation(id: number) {
    try {
      await useNuxtApp().$api(`/operations/${id}`, {
        method: 'DELETE',
      })
      await refresh()
    }
    catch (error) {
      console.error(error)
    }
  }

  async function updateOperation(operation: Partial<Operation>) {
    try {
      await useNuxtApp().$api(`/operations/${operation.id}`, {
        method: 'PATCH',
        body: operation,
      })
      await refresh()
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    operations: data,
    createOperation,
    updateOperation,
    deleteOperation,
    clear,
    refresh,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOperationsStore, import.meta.hot))
}
