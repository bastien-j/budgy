export function useCategories() {
  const categories = useLocalStorage<Category[]>('categories', () => [])

  function addCategory(category: Category) {
    categories.value.push(category)
  }

  function updateCategory(category: Category) {
    const index = categories.value.findIndex(c => c.id === category.id)
    if (index !== -1) {
      categories.value[index] = category
    }
  }

  function removeCategory(id: string) {
    categories.value = categories.value.filter(category => category.id !== id)
  }

  return { categories, addCategory, removeCategory, updateCategory }
}
