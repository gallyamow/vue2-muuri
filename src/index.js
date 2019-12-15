import MGrid from './components/MGrid'
import MItem from './components/MItem'

/**
 * todo: env? or const version = '__VERSION__'
 * @const {string} muuri version.
 */
const VERSION = 'C_PKG_VERSION'

/**
 * Registers all VueLayers components.
 * @param {Vue|VueConstructor} Vue
 * @param {*} options
 */
function plugin (Vue, options = {}) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  Vue.component(MGrid.name, MGrid)
  Vue.component(MItem.name, MItem)
}

export default plugin

export {
  VERSION,
  plugin as install,
  MGrid,
  MItem
}
