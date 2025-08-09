export function buildLists(categories: Category[], operations: Operation[]) {
  return categories.map((category) => {
    const _operations = operations.filter(operation => operation.categoryId === category.id).sort((a, b) => b.amount - a.amount) ?? []
    return {
      ...category,
      operations: _operations,
      total: _operations.reduce((acc, operation) => acc + operation.amount, 0),
    }
  }) ?? []
}

export function useLists() {
  const categoriesStore = useCategoriesStore()
  const operationsStore = useOperationsStore()

  return computed(() => buildLists(categoriesStore.categories ?? [], operationsStore.operations ?? []))
}
