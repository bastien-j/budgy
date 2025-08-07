export const useCategoriesStore = defineStore('categories', () => {
  const { data, clear, refresh } = useAPI<Category[]>('/categories')

  async function createCategory(category: Partial<Category>) {
    try {
      await useNuxtApp().$api('/categories', {
        method: 'POST',
        body: category,
      })
      await refresh()
    }
    catch (error) {
      console.error(error)
    }
  }

  async function updateCategory(category: Partial<Category>) {
    try {
      await useNuxtApp().$api(`/categories/${category.id}`, {
        method: 'PATCH',
        body: category,
      })
      await refresh()
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
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    categories: data,
    createCategory,
    updateCategory,
    deleteCategory,
    clear,
    refresh,
  }
})
