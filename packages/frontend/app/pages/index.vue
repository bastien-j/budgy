<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const authStore = useAuthStore()
const categoriesStore = useCategoriesStore()
const operationsStore = useOperationsStore()

const income = useLocalStorage('income', 0)

const totalExpenses = computed(() => Math.ceil((operationsStore.operations)?.reduce((acc, operation) => acc + operation.amount, 0) ?? 0))

const remaining = computed(() => Math.max(income.value - totalExpenses.value, 0))

const remainingPercentage = computed(() => (remaining.value / Math.max(income.value, 1)) * 100)

const color = computed(() => {
  if (remainingPercentage.value < 20) {
    return 'error'
  }
  if (remainingPercentage.value < 40) {
    return 'warning'
  }
  return 'success'
})

onMounted(() => {
  categoriesStore.refresh()
  operationsStore.refresh()
})

function exportDataToJSON() {
  const data = {
    income: income.value,
    categories: categoriesStore.categories,
    operations: operationsStore.operations,
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'budget.json'
  a.click()
}
</script>

<template>
  <div class="p-4 space-y-4 max-w-4xl mx-auto">
    <div class="flex items-center justify-between gap-4">
      <h1 class="text-2xl font-bold text-center">
        BUDGY, votre budget mensuel
      </h1>

      <div class="flex items-center gap-2">
        <UButton
          color="neutral"
          icon="material-symbols:download"
          label="Exporter"
          @click="exportDataToJSON()"
        />

        <ModalImport />

        <UButton
          color="error"
          icon="material-symbols:logout"
          label="Déconnexion"
          @click="authStore.logout()"
        />
      </div>
    </div>

    <div class="space-y-2">
      <UFormField label="Revenues mensuels">
        <UInput
          v-model="income"
          type="number"
          trailing-icon="i-lucide-euro"
        />
      </UFormField>
      <div class="flex items-center gap-2">
        Dépenses totales : {{ numberToCurrency(totalExpenses) }}
      </div>
      <div class="flex items-center gap-2">
        Reste : {{ numberToCurrency(remaining) }}
      </div>
      <UProgress
        :model-value="remainingPercentage"
        :color
      />
    </div>

    <div class="space-y-3">
      <div class="border border-gray-200 rounded-md p-4 flex justify-center">
        <ModalCategoryNew />
      </div>
      <CategoryList />
    </div>
  </div>
</template>
