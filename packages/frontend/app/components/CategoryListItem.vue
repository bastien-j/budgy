<script setup lang="ts">
defineProps<{
  list: List
}>()
</script>

<template>
  <div class="border border-gray-300 rounded-md p-4 space-y-2">
    <CategoryListItemHeader :list="list" />

    <ModalOperationNew
      :category-id="list.id"
    />

    <OperationItem
      v-for="operation in list.operations"
      :key="operation.id"
      :operation
    />
  </div>
</template>
