<script setup lang="ts">
import { ModalCategoryEdit, ModalDelete } from '#components'

defineProps<{
  list: List
}>()

const categoriesStore = useCategoriesStore()

const overlay = useOverlay()

const modalDelete = overlay.create(ModalDelete)

async function removeCategoryHandler(list: List) {
  const confirm = await modalDelete.open().result
  if (confirm) {
    categoriesStore.deleteCategory(list.id)
  }
}

const modalEdit = overlay.create(ModalCategoryEdit)
</script>

<template>
  <div class="flex items-center gap-2">
    <UTooltip text="Modifier la catégorie">
      <UButton
        color="info"
        size="sm"
        icon="i-lucide-pencil"
        variant="soft"
        @click="modalEdit.open({ category: list })"
      />
    </UTooltip>

    <h2 class="text-lg font-bold">
      {{ list.name }}
    </h2>

    <div class="text-sm text-gray-500 font-bold">
      ({{ numberToCurrency(list.total) }})
    </div>

    <UTooltip
      class="ml-auto"
      text="Supprimer la catégorie et toutes ses opérations"
    >
      <UButton
        color="error"
        icon="i-lucide-trash"
        size="md"
        variant="soft"
        @click="removeCategoryHandler(list)"
      />
    </UTooltip>
  </div>
</template>
