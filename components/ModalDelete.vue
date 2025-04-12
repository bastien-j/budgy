<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Êtes-vous sûr ?',
})

const emit = defineEmits<{
  close: [boolean]
}>()
</script>

<template>
  <UModal
    :title
    :description="title"
    :ui="{ footer: 'justify-end' }"
    :close="{ onClick: () => $emit('close', false) }"
    :dismissible="false"
  >
    <template #footer>
      <UButton
        color="neutral"
        label="Annuler"
        variant="soft"
        @click="emit('close', false)"
      />
      <UButton
        color="error"
        label="Supprimer"
        variant="soft"
        @click="emit('close', true)"
      />
    </template>
  </UModal>
</template>
