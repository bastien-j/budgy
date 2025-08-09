export const useCategoriesStore = defineStore('categories', () => {
  const { data, clear, refresh } = useAPI<Category[]>('/categories')

  const toast = useToast()

  async function createCategory(category: Partial<Category>, silent = false) {
    try {
      const newCategory = await useNuxtApp().$api<Category>('/categories', {
        method: 'POST',
        body: category,
      })
      if (!silent) {
        await refresh()
        toast.add({ title: 'Catégorie créée', color: 'success' })
      }
      return newCategory
    }
    catch (error) {
      console.error(error)
    }
  }

  async function updateCategory(category: Partial<Category>, silent = false) {
    try {
      await useNuxtApp().$api<Category>(`/categories/${category.id}`, {
        method: 'PATCH',
        body: category,
      })
      if (!silent) {
        await refresh()
        toast.add({ title: 'Catégorie mise à jour', color: 'success' })
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  async function deleteCategory(id: number) {
    try {
      await useNuxtApp().$api(`/categories/${id}`, {
        method: 'DELETE',
      })
      await refresh()
      toast.add({ title: 'Catégorie supprimée', color: 'success' })
    }
    catch (error) {
      console.error(error)
    }
  }

  function findCategory(name: string) {
    return data.value?.find(category => category.name === name)
  }

  return {
    categories: data,
    createCategory,
    updateCategory,
    deleteCategory,
    findCategory,
    clear,
    refresh,
  }
})
