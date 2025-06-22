import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Pegawai from './pegawai.js'

export default class Jabatan extends BaseModel {
  @column({ isPrimary: true })
  declare public id: number

  @column()
  declare public nama_jabatan: string

  @column()
  declare public tunjangan: number

  @hasMany(() => Pegawai)
  declare public pegawais: HasMany<typeof Pegawai>
}
