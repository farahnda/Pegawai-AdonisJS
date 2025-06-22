import type { HttpContext } from '@adonisjs/core/http'
import Pegawai from 'app/models/pegawai.js'
import Jabatan from 'app/models/jabatan.js'
import UnitKerja from 'app/models/unit_kerja.js'

export default class PegawaisController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const pegawais = await Pegawai.query().preload('jabatan').preload('unitKerja')
    return view.render('pegawai.index', { pegawais })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    const jabatans = await Jabatan.all()
    const units = await UnitKerja.all()
    return view.render('pegawai.create', { jabatans, units })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['nip', 'nama', 'jabatanId', 'unitKerjaId', 'gaji'])
    await Pegawai.create(data)
    return response.redirect('/pegawai')
  }

  /**
   * Show individual record
   */
  // async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const pegawai = await Pegawai.findOrFail(params.id)
    const jabatans = await Jabatan.all()
    const units = await UnitKerja.all()
    return view.render('pegawai.edit', { pegawai, jabatans, units })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const pegawai = await Pegawai.findOrFail(params.id)
    const data = request.only(['nip', 'nama', 'jabatanId', 'unitKerjaId', 'gaji'])
    pegawai.merge(data)
    await pegawai.save()
    return response.redirect('/pegawai')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const pegawai = await Pegawai.findOrFail(params.id)
    await pegawai.delete()
    return response.redirect('/pegawai')
  }
}
