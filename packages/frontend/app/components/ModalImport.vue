<script setup lang="ts">
import { objectPick } from '@vueuse/core'

const categoriesStore = useCategoriesStore()
const operationsStore = useOperationsStore()

const income = useLocalStorage('income', 0)

const open = ref(false)

const toast = useToast()

function importDataFromJSON(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file)
    return

  const reader = new FileReader()
  reader.onload = (e) => {
    const data = JSON.parse(e.target?.result as string)
    importData(data)
  }
  reader.readAsText(file)
}

const isImporting = ref(false)
async function importData(data: { income: number, categories: Category[], operations: Operation[] }) {
  isImporting.value = true
  const { income: _income, operations, categories } = data

  income.value = _income
  const lists = buildLists(categories, operations)

  for (const list of lists) {
    let category = categoriesStore.findCategory(list.name)
    if (!category) {
      category = await categoriesStore.createCategory(objectPick(list, ['name']), true)
      if (!category) {
        continue
      }
    }

    for (const operation of list.operations) {
      const _operation = operationsStore.findOperation(operation.name)
      if (_operation) {
        if (_operation.categoryId !== category.id || _operation.amount !== operation.amount) {
          await operationsStore.updateOperation({ ..._operation, amount: operation.amount, categoryId: category.id }, true)
        }
      }
      else {
        await operationsStore.createOperation({ ...objectPick(operation, ['amount', 'name']), categoryId: category.id }, true)
      }
    }
  }

  await categoriesStore.refresh()
  await operationsStore.refresh()

  open.value = false
  toast.add({ title: 'Importation terminée', color: 'success' })
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Importer"
    description="Importer un fichier JSON"
    @after:leave="isImporting = false"
  >
    <UButton
      color="neutral"
      icon="material-symbols:upload"
      label="Importer"
    />

    <template #body>
      <UInput
        v-if="!isImporting"
        class="w-full"
        type="file"
        accept="application/json"
        @change="importDataFromJSON"
      />

      <div
        v-else
        class="flex items-center justify-center"
      >
        <Icon
          name="material-symbols:progress-activity"
          class="text-4xl animate-spin"
        />
      </div>
    </template>
  </UModal>
</template>
