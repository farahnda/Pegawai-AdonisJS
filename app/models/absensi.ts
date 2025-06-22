import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Pegawai from './pegawai.js'

export default class Absensi extends BaseModel {
  @column({ isPrimary: true })
  declare public id: number

  @column()
  declare public pegawaiId: number

  @column.date()
  declare public tanggal: DateTime

  @column()
  declare public status: string // 'hadir', 'izin', 'alpha'

  @belongsTo(() => Pegawai)
  declare public pegawai: BelongsTo<typeof Pegawai>
}
