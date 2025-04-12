<script setup lang="ts">
defineProps<{
  categoryId?: string
}>()

const open = ref(false)
</script>

<template>
  <UModal
    v-model:open="open"
    title="Ajouter une opération"
    description="Ajoutez une opération pour suivre vos dépenses"
  >
    <UButton
      color="neutral"
      label="Nouvelle opération"
      size="sm"
      trailing-icon="i-lucide-plus"
      variant="soft"
    />

    <template #body>
      <FormOperationNew
        :category-id="categoryId"
        @add="open = false"
      />
    </template>
  </UModal>
</template>
