import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'operations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('CASCADE')
      table.string('name').notNullable()
      table.decimal('amount', 10, 2).notNullable()
      table
        .integer('category_id')
        .unsigned()
        .nullable()
        .references('categories.id')
        .onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
