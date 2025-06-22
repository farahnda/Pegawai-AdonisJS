import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Jabatan from './jabatan.js'
import UnitKerja from './unit_kerja.js'
import Absensi from './absensi.js'
import Cuti from './cuti.js'

export default class Pegawai extends BaseModel {
  @column({ isPrimary: true })
  declare public id: number

  @column()
  declare public nip: string

  @column()
  declare public nama: string

  @column()
  declare public jabatanId: number

  @column()
  declare public unitKerjaId: number

  @column()
  declare public gaji: number

  @belongsTo(() => Jabatan)
  declare public jabatan: BelongsTo<typeof Jabatan>

  @belongsTo(() => UnitKerja)
  declare public unitKerja: BelongsTo<typeof UnitKerja>

  @hasMany(() => Absensi)
  declare public absensis: HasMany<typeof Absensi>

  @hasMany(() => Cuti)
  declare public cutis: HasMany<typeof Cuti>
}
