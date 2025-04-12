import { cloneFnJSON } from '@vueuse/core'

export function useResetRef<T>(ref: Ref<T>) {
  const initialValue = cloneFnJSON(toValue(ref))

  return extendRef(ref, {
    reset: () => {
      ref.value = cloneFnJSON(initialValue)
    },
  })
}
