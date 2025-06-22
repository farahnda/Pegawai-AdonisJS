import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'absensis'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('pegawai_id')
        .unsigned()
        .references('id')
        .inTable('pegawais')
        .onDelete('CASCADE')
      table.date('tanggal').notNullable()
      table.enum('status', ['hadir', 'izin', 'alpha']).notNullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
