import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import Pegawai from 'app/models/pegawai.js'
import Absensi from 'app/models/absensi.js'

export default class AbsensisController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const absensis = await Absensi.query().preload('pegawai')
    return view.render('absensi.index', { absensis })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    const pegawais = await Pegawai.all()
    return view.render('absensi.create', { pegawais })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['pegawaiId', 'tanggal', 'status'])
    await Absensi.create({
      pegawaiId: data.pegawaiId,
      tanggal: DateTime.fromISO(data.tanggal),
      status: data.status,
    })
    return response.redirect('/absensi')
  }

  /**
   * Lihat laporan absensi
   */

  async laporan({ request, view }: HttpContext) {
    const bulan = request.input('bulan') || DateTime.now().month
    const tahun = request.input('tahun') || DateTime.now().year

    const laporan = await db
      .from('absensis')
      .select('pegawai_id')
      .count('* as total')
      .whereRaw('extract(month from tanggal) = ?', [bulan])
      .andWhereRaw('extract(year from tanggal) = ?', [tahun])
      .groupBy('pegawai_id')

    return view.render('absensi.laporan', { laporan, bulan, tahun })
  }

  public async rekap({ request, view, auth }: HttpContext) {
    const bulan = Number(request.input('bulan') || DateTime.now().month)
    const tahun = Number(request.input('tahun') || DateTime.now().year)

    const bulanList = [
      { value: 1, label: 'Januari' },
      { value: 2, label: 'Februari' },
      { value: 3, label: 'Maret' },
      { value: 4, label: 'April' },
      { value: 5, label: 'Mei' },
      { value: 6, label: 'Juni' },
      { value: 7, label: 'Juli' },
      { value: 8, label: 'Agustus' },
      { value: 9, label: 'September' },
      { value: 10, label: 'Oktober' },
      { value: 11, label: 'November' },
      { value: 12, label: 'Desember' },
    ]
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const bulan_nama = bulanList.find((b) => b.value === bulan)?.label || ''

    // Ambil semua pegawai
    const pegawaiList = await Pegawai.query().preload('absensis', (absensiQuery) => {
      absensiQuery
        .whereRaw('EXTRACT(MONTH FROM tanggal) = ?', [bulan])
        .whereRaw('EXTRACT(YEAR FROM tanggal) = ?', [tahun])
    })

    const dataRekap = pegawaiList.map((pegawai) => {
      const hadir = pegawai.absensis.filter((a) => a.status === 'hadir').length
      const izin = pegawai.absensis.filter((a) => a.status === 'izin').length
      const alfa = pegawai.absensis.filter((a) => a.status === 'alfa').length
      return {
        nama: pegawai.nama,
        hadir,
        izin,
        alfa,
      }
    })

    return view.render('rekap', {
      user: auth.user,
      bulan,
      tahun,
      bulanList,
      bulan_nama,
      tahunSekarang: DateTime.now().year,
      dataRekap,
    })
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
  // async destroy({ params }: HttpContext) {}
}
