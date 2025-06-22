import type { HttpContext } from '@adonisjs/core/http'
import Jabatan from 'app/models/jabatan.js'

export default class JabatansController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const jabatans = await Jabatan.all()
    return view.render('jabatan.index', { jabatans })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('jabatan.create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['nama_jabatan', 'tunjangan'])
    await Jabatan.create(data)
    return response.redirect('/jabatan')
  }

  /**
   * Show individual record
   */
  // async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const jabatan = await Jabatan.findOrFail(params.id)
    return view.render('jabatan.edit', { jabatan })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const jabatan = await Jabatan.findOrFail(params.id)
    jabatan.merge(request.only(['nama_jabatan', 'tunjangan']))
    await jabatan.save()
    return response.redirect('/jabatan')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const jabatan = await Jabatan.findOrFail(params.id)
    await jabatan.delete()
    return response.redirect('/jabatan')
  }
}
