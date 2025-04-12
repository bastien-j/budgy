export function useOperations() {
  const operations = useLocalStorage<Operation[]>('operations', () => [])

  function addOperation(operation: Operation) {
    operations.value.push(operation)
  }

  function updateOperation(operation: Operation) {
    const index = operations.value.findIndex(o => o.id === operation.id)
    if (index !== -1) {
      operations.value[index] = operation
    }
  }

  function removeOperation(id: string) {
    operations.value = operations.value.filter(operation => operation.id !== id)
  }

  return { operations, addOperation, removeOperation, updateOperation }
}
