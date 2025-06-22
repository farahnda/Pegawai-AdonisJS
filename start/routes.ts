import router from '@adonisjs/core/services/router'

router.get('/', async ({ view, auth }) => {
  return view.render('home', { auth })
})

router.resource('pegawai', 'pegawais_controller').as('pegawai')
router.resource('jabatan', 'jabatans_controller').as('jabatan')
router.resource('unit-kerja', 'unit_kerjas_controller').as('unit-kerja')
router.resource('absensi', 'absensis_controller').as('absensi')
router.resource('cuti', 'cutis_controller').as('cuti')
router.resource('gaji', 'gajis_controller').as('gaji')
router.get('/rekap', 'absensis_controller.rekap').as('rekap')
