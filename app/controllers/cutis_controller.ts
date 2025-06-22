import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import Pegawai from 'app/models/pegawai.js'
import Cuti from 'app/models/cuti.js'

export default class CutisController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const cutis = await Cuti.query().preload('pegawai')
    return view.render('cuti.index', { cutis })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    const pegawais = await Pegawai.all()
    return view.render('cuti.create', { pegawais })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const { pegawaiId, tanggalMulai, tanggalAkhir, alasan } = request.only([
      'pegawaiId',
      'tanggalMulai',
      'tanggalAkhir',
      'alasan',
    ])

    const mulai = DateTime.fromISO(tanggalMulai)
    const akhir = DateTime.fromISO(tanggalAkhir)
    const jumlahHari = akhir.diff(mulai, 'days').days + 1

    const totalCutiTahunIni = await db
      .from('cutis')
      .where('pegawai_id', pegawaiId)
      .andWhereRaw('extract(year from tanggal_mulai) = ?', [mulai.year])
      .sum('tanggal_akhir - tanggal_mulai + 1 as total')

    const totalCuti = Number.parseInt(totalCutiTahunIni[0].total ?? 0)

    if (totalCuti + jumlahHari > 12) {
      session.flash('error', 'Jumlah cuti melebihi batas 12 hari/tahun')
      return response.redirect().back()
    }

    await Cuti.create({
      pegawaiId,
      tanggalMulai: mulai,
      tanggalAkhir: akhir,
      alasan,
    })

    return response.redirect('/cuti')
  }

  /**
   * Show individual record
   */
  // async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  // async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const cuti = await Cuti.findOrFail(params.id)
    await cuti.delete()
    return response.redirect('/cuti')
  }
}
