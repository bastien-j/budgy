import Category from '#models/category'
import { categoryValidator } from '#validators/category'
import { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({ auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const categories = await user.related('categories').query()

    return categories
  }

  async store({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()

    const validatedData = await categoryValidator.validate(request.only(['name']))

    const category = new Category()

    await user.related('categories').save(category.fill(validatedData))

    return category
  }

  async show({ request }: HttpContext) {
    return request.body().category
  }

  async update({ request }: HttpContext) {
    const validatedData = await categoryValidator.validate(request.only(['name']))

    const category = request.body().category

    category.merge(validatedData)

    return await category.save()
  }

  async destroy({ request }: HttpContext) {
    await request.body().category.delete()
  }

  async operations({ request }: HttpContext) {
    const category = request.body().category

    const operations = await category.related('operations').query()

    return operations
  }
}
