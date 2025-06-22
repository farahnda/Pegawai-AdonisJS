import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Pegawai from './pegawai.js'

export default class UnitKerja extends BaseModel {
  @column({ isPrimary: true })
  declare public id: number

  @column()
  declare public nama_unit: string

  @column()
  declare public lokasi: string

  @hasMany(() => Pegawai)
  declare public pegawais: HasMany<typeof Pegawai>
}
