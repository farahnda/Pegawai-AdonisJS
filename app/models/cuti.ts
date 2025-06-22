import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Pegawai from './pegawai.js'

export default class Cuti extends BaseModel {
  @column({ isPrimary: true })
  declare public id: number

  @column()
  declare public pegawaiId: number

  @column.date()
  declare public tanggalMulai: DateTime

  @column.date()
  declare public tanggalAkhir: DateTime

  @column()
  declare public alasan: string

  @belongsTo(() => Pegawai)
  declare public pegawai: BelongsTo<typeof Pegawai>
}
