import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pegawais'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nip').unique().notNullable()
      table.string('nama').notNullable()
      table
        .integer('jabatan_id')
        .unsigned()
        .references('id')
        .inTable('jabatans')
        .onDelete('CASCADE')
      table
        .integer('unit_kerja_id')
        .unsigned()
        .references('id')
        .inTable('unit_kerjas')
        .onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('gaji').notNullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
