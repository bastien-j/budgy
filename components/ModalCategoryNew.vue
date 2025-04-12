<script setup lang="ts">
const open = ref(false)
</script>

<template>
  <UModal
    v-model:open="open"
    title="Ajouter une catégorie"
    description="Ajoutez une catégorie pour organiser vos opérations"
  >
    <UButton
      color="neutral"
      label="Nouvelle catégorie"
      trailing-icon="i-lucide-plus"
      variant="soft"
    />

    <template #body>
      <FormCategoryNew @add="open = false" />
    </template>
  </UModal>
</template>
