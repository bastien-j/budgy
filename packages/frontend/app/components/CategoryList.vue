<script setup lang="ts">
const { categories } = useCategories()
const { operations } = useOperations()

const lists = computed(() => {
  const _lists = []
  for (const category of categories.value) {
    const _operations = operations.value.filter(operation => operation.categoryId === category.id).sort((a, b) => b.amount - a.amount)
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
