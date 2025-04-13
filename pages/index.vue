<script setup lang="ts">
const { operations } = useOperations()

const income = useLocalStorage('income', 0)

const totalExpenses = computed(() => Math.ceil(operations.value.reduce((acc, operation) => acc + operation.amount, 0)))

const remaining = computed(() => Math.max(income.value - totalExpenses.value, 0))

const remainingPercentage = computed(() => (remaining.value / (income.value ?? 1)) * 100)

const color = computed(() => {
  if (remainingPercentage.value < 20) {
    return 'error'
  }
  if (remainingPercentage.value < 40) {
    return 'warning'
  }
  return 'success'
})
</script>

<template>
  <div class="p-4 space-y-4 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold text-center">
      BUDGY, votre budget mensuel
    </h1>

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
