<script setup lang="ts">
defineProps<{
  category: Category
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <UModal
    title="Modifier la catégorie"
    description="Modifier la catégorie pour organiser vos opérations"
  >
    <template #body>
      <FormCategoryEdit
        :category="category"
        @update="$emit('close')"
      />
    </template>
  </UModal>
</template>
