import Operation from '#models/operation'
import { categoryOperationValidator, operationValidator } from '#validators/operation'
import { HttpContext } from '@adonisjs/core/http'

export default class OperationsController {
  async index({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()

    const categoryId = request.param('category_id')

    if (categoryId) {
      const operations = await user
        .related('operations')
        .query()
        .where('category_id', Number(categoryId))

      return operations
    }

    const operations = await user.related('operations').query()

    return operations
  }

  async store({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()

    const categoryId = request.param('category_id')

    const validator = categoryId ? categoryOperationValidator : operationValidator

    const keys = categoryId ? ['name', 'amount'] : ['name', 'amount', 'categoryId']

    const validatedData = await validator.validate(request.only(keys))

    const operation = new Operation().fill(validatedData)

    if (categoryId) {
      operation.categoryId = Number(categoryId)
    }

    await user.related('operations').save(operation)

    return operation
  }

  async show({ request }: HttpContext) {
    return request.body().operation
  }

  async update({ request }: HttpContext) {
    const validatedData = await operationValidator.validate(
      request.only(['name', 'amount', 'categoryId'])
    )

    const operation = request.body().operation

    operation.merge(validatedData)

    return await operation.save()
  }

  async destroy({ request }: HttpContext) {
    await request.body().operation.delete()
  }
}
