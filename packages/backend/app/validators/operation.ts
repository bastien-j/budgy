import vine from '@vinejs/vine'

export const operationValidator = vine.compile(
  vine.object({
    name: vine.string(),
    amount: vine.number(),
    categoryId: vine.number().optional(),
  })
)

export const categoryOperationValidator = vine.compile(
  vine.object({
    name: vine.string(),
    amount: vine.number(),
  })
)
