import type { HttpContext } from '@adonisjs/core/http'
import UnitKerja from 'app/models/unit_kerja.js'

export default class UnitKerjasController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const units = await UnitKerja.all()
    return view.render('unit_kerja.index', { units })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('unit_kerja.create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    await UnitKerja.create(request.only(['nama_unit', 'lokasi']))
    return response.redirect('/unit-kerja')
  }

  /**
   * Show individual record
   */
  // async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const unit = await UnitKerja.findOrFail(params.id)
    return view.render('unit_kerja.edit', { unit })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const unit = await UnitKerja.findOrFail(params.id)
    unit.merge(request.only(['nama_unit', 'lokasi']))
    await unit.save()
    return response.redirect('/unit-kerja')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const unit = await UnitKerja.findOrFail(params.id)
    await unit.delete()
    return response.redirect('/unit-kerja')
  }
}
