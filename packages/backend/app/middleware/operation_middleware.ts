import Operation from '#models/operation'
import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext, ResponseStatus } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class EnsureOperationBelongsToUser {
  async handle(ctx: HttpContext, next: NextFn) {
    const operationId = ctx.params.operationId || ctx.params.id

    if (!operationId) {
      throw new Exception('Operation ID is required', { status: ResponseStatus.BadRequest })
    }

    const operation = await Operation.find(operationId)

    const categoryId = ctx.request.param('category_id')

    if (!operation || (categoryId && operation.categoryId !== Number(categoryId))) {
      throw new Exception('Operation not found', { status: ResponseStatus.NotFound })
    }

    if (operation.userId !== ctx.auth.getUserOrFail().id) {
      throw new Exception('Access denied', { status: ResponseStatus.Forbidden })
    }

    ctx.request.body().operation = operation

    await next()
  }
}
