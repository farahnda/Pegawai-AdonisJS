import type { HttpContext } from '@adonisjs/core/http'
import Pegawai from 'app/models/pegawai.js'

export default class GajisController {
  public async index({ view }: HttpContext) {
    const pegawais = await Pegawai.all()
    return view.render('gaji/index', { pegawais })
  }
}

//   public async create({ view }: HttpContext) {
//     return view.render('gaji/create')
//   }

//   public async store({ request, response }: HttpContext) {
//     await Gaji.create(request.only(['pegawai_id', 'jumlah', 'tanggal']))
//     return response.redirect().toRoute('gaji.index')
//   }

//   public async edit({ params, view }: HttpContext) {
//     const gaji = await Gaji.findOrFail(params.id)
//     return view.render('gaji/edit', { gaji })
//   }

//   public async update({ params, request, response }: HttpContext) {
//     const gaji = await Gaji.findOrFail(params.id)
//     gaji.merge(request.only(['pegawai_id', 'jumlah', 'tanggal']))
//     await gaji.save()
//     return response.redirect().toRoute('gaji.index')
//   }

//   public async destroy({ params, response }: HttpContext) {
//     const gaji = await Gaji.findOrFail(params.id)
//     await gaji.delete()
//     return response.redirect().toRoute('gaji.index')
//   }
// }
