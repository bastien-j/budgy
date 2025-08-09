<script setup lang="ts">
const lists = useSorted(useLists(), (a, b) => b.total - a.total)
</script>

<template>
  <CategoryListItem
    v-for="list in lists"
    :key="list.id"
    :list="list"
  />
</template>
