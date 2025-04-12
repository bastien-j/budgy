<script setup lang="ts">
defineProps<{
  operation: Operation
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <UModal
    title="Modifier l'opération"
    description="Modifier l'opération pour suivre vos dépenses"
  >
    <template #body>
      <FormOperationEdit
        :operation="operation"
        @update="$emit('close')"
      />
    </template>
  </UModal>
</template>
