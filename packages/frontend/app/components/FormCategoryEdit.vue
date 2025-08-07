<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { object, string, type InferType } from 'yup'

const props = defineProps<{
  category: Category
}>()

const emit = defineEmits<{
  update: []
}>()

const categoryFormSchema = object({
  name: string().required('Required'),
})

type CategoryFormSchema = InferType<typeof categoryFormSchema>

const categoryFormState = useResetRef(ref<Partial<CategoryFormSchema>>({
  name: props.category.name,
}))

const categoriesStore = useCategoriesStore()

async function submitHandler(event: FormSubmitEvent<CategoryFormSchema>) {
  categoriesStore.updateCategory({
    id: props.category.id,
    name: event.data.name,
  })
  emit('update')
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
      color="info"
      label="Modifier"
      type="submit"
    />
  </UForm>
</template>
