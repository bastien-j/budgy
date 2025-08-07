<script setup lang="ts">
import { ModalDelete, ModalOperationEdit } from '#components'

defineProps<{
  operation: Operation
}>()

const operationsStore = useOperationsStore()

const overlay = useOverlay()

const modalDelete = overlay.create(ModalDelete)

async function removeOperationHandler(id: number) {
  const confirm = await modalDelete.open().result
  if (confirm) {
    operationsStore.deleteOperation(id)
  }
}

const modalEdit = overlay.create(ModalOperationEdit)
</script>

<template>
  <div class="flex items-center gap-2">
    <UTooltip text="Modifier l'opération">
      <UButton
        color="info"
        size="sm"
        icon="i-lucide-pencil"
        variant="soft"
        @click="modalEdit.open({ operation })"
      />
    </UTooltip>

    <div class="font-semibold">
      {{ operation.name }}
    </div>

    <div class="ml-auto">
      {{ numberToCurrency(operation.amount) }}
    </div>

    <UTooltip text="Supprimer l'opération">
      <UButton
        color="error"
        icon="i-lucide-trash"
        size="sm"
        variant="soft"
        @click="removeOperationHandler(operation.id)"
      />
    </UTooltip>
  </div>
</template>
