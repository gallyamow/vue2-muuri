import Grid from './components/Grid'
import Item from './components/Item'

/**
 * todo: env? or const version = '__VERSION__'
 * @const {string} muuri version.
 */
const VERSION = 'C_PKG_VERSION'

/**
 * Registers all VueLayers components.
 * @param {Vue|VueConstructor} Vue
 * @param {Vue2MuuriOptions} [options]
 */
function plugin (Vue, options = {}) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  Vue.use(Grid, options)
  Vue.use(Item, options)
}

export default plugin

export {
  VERSION,
  plugin as install,
  Grid,
  Item
}

/**
 * @typedef {Object} Vue2MuuriOptions
 * @property {string} [prop1] Prop1 description
 */
