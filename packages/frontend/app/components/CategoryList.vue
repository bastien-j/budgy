<script setup lang="ts">
const categoriesStore = useCategoriesStore()

const operationsStore = useOperationsStore()

const lists = computed(() => {
  const _lists = []
  for (const category of categoriesStore.categories ?? []) {
    const _operations = operationsStore.operations?.filter(operation => operation.categoryId === category.id).sort((a, b) => b.amount - a.amount) ?? []
    _lists.push({
      id: category.id,
      name: category.name,
      operations: _operations,
      total: _operations.reduce((acc, operation) => acc + operation.amount, 0),
    })
  }
  return _lists.sort((a, b) => b.total - a.total)
})
</script>

<template>
  <CategoryListItem
    v-for="list in lists"
    :key="list.id"
    :list="list"
  />
</template>
