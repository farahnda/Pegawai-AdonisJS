import edge from 'edge.js'
import env from '#start/env'
import { edgeIconify } from 'edge-iconify'

/**
 * Register a plugin
 */
edge.use(edgeIconify)

edge.mount('', 'resources/views')

/**
 * Define a global property
 */
edge.global('appUrl', env.get('APP_URL'))
