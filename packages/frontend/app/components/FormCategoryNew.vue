<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { v4 as uuidv4 } from 'uuid'
import { object, string, type InferType } from 'yup'

const emit = defineEmits<{
  add: []
}>()

const categoryFormSchema = object({
  name: string().required('Required'),
})

type CategoryFormSchema = InferType<typeof categoryFormSchema>

const categoryFormState = useResetRef(ref<Partial<CategoryFormSchema>>({
  name: undefined,
}))

const { addCategory } = useCategories()

async function submitHandler(event: FormSubmitEvent<CategoryFormSchema>) {
  addCategory({
    id: uuidv4(),
    name: event.data.name,
  })
  emit('add')
}
</script>

<template>
  <UForm
    ref="categoryForm"
    class="space-y-4"
    :schema="categoryFormSchema"
    :state="categoryFormState"
    :validate-on="['change']"
    @submit="submitHandler"
  >
    <UFormField
      label="Libellé"
      name="name"
    >
      <UInput
        v-model="categoryFormState.name"
        class="w-full"
        autofocus
      />
    </UFormField>

    <UButton
      label="Ajouter"
      type="submit"
    />
  </UForm>
</template>
