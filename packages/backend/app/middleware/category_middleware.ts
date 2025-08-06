import Category from '#models/category'
import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext, ResponseStatus } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class EnsureCategoryBelongsToUser {
  async handle(ctx: HttpContext, next: NextFn) {
    const categoryId = ctx.params.categoryId || ctx.params.id

    if (!categoryId) {
      throw new Exception('Category ID is required', { status: ResponseStatus.BadRequest })
    }

    const category = await Category.find(categoryId)
    if (!category) {
      throw new Exception('Category not found', { status: ResponseStatus.NotFound })
    }

    if (category.userId !== ctx.auth.getUserOrFail().id) {
      throw new Exception('Access denied', { status: ResponseStatus.Forbidden })
    }

    ctx.request.body().category = category

    await next()
  }
}
