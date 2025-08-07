<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { object, number, string, type InferType } from 'yup'

const props = defineProps<{
  categoryId?: number
}>()

const emit = defineEmits<{
  add: [boolean]
}>()

const categoriesStore = useCategoriesStore()

const operationFormSchema = object({
  amount: number().required('Required'),
  category: number().required('Required'),
  name: string().required('Required'),
})

type OperationFormSchema = InferType<typeof operationFormSchema>

const operationFormState = useResetRef(ref<Partial<OperationFormSchema>>({
  amount: undefined,
  category: props.categoryId,
  name: undefined,
}))

const operationsStore = useOperationsStore()

async function submitHandler(event: FormSubmitEvent<OperationFormSchema>) {
  operationsStore.createOperation({
    amount: event.data.amount,
    categoryId: event.data.category,
    name: event.data.name,
  })
  emit('add', true)
}
</script>

<template>
  <UForm
    ref="operationForm"
    class="space-y-4"
    :schema="operationFormSchema"
    :state="operationFormState"
    :validate-on="['change']"
    @submit="submitHandler"
  >
    <UFormField
      label="Name"
      name="name"
    >
      <UInput
        v-model="operationFormState.name"
        class="w-full"
        autofocus
      />
    </UFormField>

    <UFormField
      label="Amount"
      name="amount"
    >
      <UInput
        v-model="operationFormState.amount"
        class="w-full"
        type="number"
      />
    </UFormField>

    <UFormField
      label="Category"
      name="category"
    >
      <USelectMenu
        v-model="operationFormState.category"
        :items="categoriesStore.categories"
        label-key="name"
        value-key="id"
        class="w-full"
        :search-input="false"
        :disabled="!!props.categoryId"
      />
    </UFormField>

    <UButton
      label="Ajouter"
      type="submit"
    />
  </UForm>
</template>
