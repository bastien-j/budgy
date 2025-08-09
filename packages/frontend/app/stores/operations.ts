export const useOperationsStore = defineStore('operations', () => {
  const { data, clear, refresh } = useAPI<Operation[]>('/operations')

  const toast = useToast()

  async function createOperation(operation: Partial<Operation>, silent = false) {
    try {
      await useNuxtApp().$api('/operations', {
        method: 'POST',
        body: operation,
      })
      if (!silent) {
        await refresh()
        toast.add({ title: 'Opération créée', color: 'success' })
      }
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
      toast.add({ title: 'Opération supprimée', color: 'success' })
    }
    catch (error) {
      console.error(error)
    }
  }

  async function updateOperation(operation: Partial<Operation>, silent = false) {
    try {
      await useNuxtApp().$api(`/operations/${operation.id}`, {
        method: 'PATCH',
        body: operation,
      })
      if (!silent) {
        await refresh()
        toast.add({ title: 'Opération mise à jour', color: 'success' })
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  function findOperation(value: string) {
    return data.value?.find(operation => operation.name === value)
  }

  return {
    operations: data,
    createOperation,
    updateOperation,
    deleteOperation,
    findOperation,
    clear,
    refresh,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOperationsStore, import.meta.hot))
}
