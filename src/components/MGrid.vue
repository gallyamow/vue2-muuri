<template>
  <div
    v-if="true"
    ref="container"
    :class="['m-grid', containerClass ? containerClass : '']"
  >
    <slot />
  </div>
</template>

<script>
import Muuri from 'muuri'
import { MUURI_GRID_EVENTS, MUURI_GRID_OPTIONS, MUURI_GRID_METHODS, translateOptionName } from '../consts'

const props = {
  /**
   * @param {Number} [options.showDuration=300]
   */
  showDuration: {
    type: Number
  },
  /**
   * @param {String} [options.showEasing="ease"]
   */
  showEasing: {
    type: String
  },
  /**
   * @param {Object} [options.visibleStyles]
   */
  visibleStyles: {
    type: Object
  },
  /**
   * @param {Number} [options.hideDuration]
   */
  hideDuration: {
    type: Object
  },
  /**
   * @param {String} [options.hideEasing="ease"]
   */
  hideEasing: {
    type: String
  },
  /**
   * @param {Object} [options.hiddenStyles]
   */
  hiddenStyles: {
    type: Object
  },
  /**
   * Alias of layout because muuri has such method name
   * todo: nested props validator
   * @param {(Function|LayoutOptions)} [options.layout]
   * @property
   */
  layoutOptions: {
    type: [Function, Object]
  },
  /**
   * @param {(Boolean|Number)} [options.layoutOnResize=100]
   */
  layoutOnResize: {
    type: [Boolean, Number],
    default: undefined
  },
  /**
   * @param {Boolean} [options.layoutOnInit=true]
   */
  layoutOnInit: {
    type: Boolean,
    default: undefined
  },
  /**
   * @param {Number} [options.layoutDuration=300]
   */
  layoutDuration: {
    type: Number
  },
  /**
   * @param {String} [options.layoutEasing="ease"]
   */
  layoutEasing: {
    type: String
  },
  /**
   * @param {?Object} [options.sortData=null]
   */
  sortData: {
    type: Object
  },
  /**
   * @param {Boolean} [options.dragEnabled=false]
   */
  dragEnabled: {
    type: Boolean,
    default: undefined
  },
  /**
   * @param {?HTMLElement} [options.dragContainer=null]
   */
  dragContainer: {
    type: HTMLElement
  },
  /**
   * @param {Function|DragStartPredicate} [options.dragStartPredicate]
   */
  dragStartPredicate: {
    type: [Function, Object]
  },
  /**
   * @param {?String} [options.dragAxis]
   */
  dragAxis: {
    type: String
  },
  /**
   * @param {(Boolean|Function)} [options.dragSort=true]
   */
  dragSort: {
    type: [Boolean, Function],
    default: undefined
  },
  /**
   * @param {Number} [options.dragSortInterval=100]
   */
  dragSortInterval: {
    type: Number
  },
  /**
   * @param {(Function|DragSortPredicate)} [options.dragSortPredicate]
   */
  dragSortPredicate: {
    type: [Function, Object]
  },
  /**
   * @param {Number} [options.dragReleaseDuration]
   */
  dragReleaseDuration: {
    type: Number
  },
  /**
   * @param {String} [options.dragReleaseEasing]
   */
  dragReleaseEasing: {
    type: String
  },
  /**
   * @param {Object} [options.dragHammerSettings={touchAction: "none"}]
   */
  dragHammerSettings: {
    type: Object
  },
  /**
   * @param {String} [options.containerClass="muuri"]
   */
  containerClass: {
    type: String
  },
  /**
   * @param {String} [options.itemClass="muuri-item"]
   */
  itemClass: {
    type: String
  },
  /**
   * @param {String} [options.itemVisibleClass="muuri-item-visible"]
   */
  itemVisibleClass: {
    type: String
  },
  /**
   * @param {String} [options.itemHiddenClass="muuri-item-hidden"]
   */
  itemHiddenClass: {
    type: String
  },
  /**
   * @param {String} [options.itemPositioningClass="muuri-item-positioning"]
   */
  itemPositioningClass: {
    type: String
  },
  /**
   * @param {String} [options.itemDraggingClass="muuri-item-dragging"]
   */
  itemDraggingClass: {
    type: String
  },
  /**
   * @param {String} [options.itemReleasingClass="muuri-item-releasing"]
   */
  itemReleasingClass: {
    type: String
  }
}

const computed = {
  propsToOptions () {
    return MUURI_GRID_OPTIONS.reduce((obj, option) => {
      if (this[option] !== undefined) {
        obj[option] = this[option]
      }
      return obj
    }, {})
  }
}

/**
 * @type {Object<String, Function>}
 */
const muuriOptionWatchers = MUURI_GRID_OPTIONS.reduce((obj, option) => {
  obj[option] = function (value) {
    const properOptionName = translateOptionName(option)

    // todo: find proper way to set options
    this.$muuri._settings[properOptionName] = value
    this.refreshMuuri()
  }
  return obj
}, {})

const watch = {
  ...muuriOptionWatchers
}

/**
 * options watchers
 * @type {Object<String, Function>}
 */
const muuriMethods = MUURI_GRID_METHODS.reduce((obj, method) => {
  obj[method] = function (...args) {
    this.$muuri[method](...args)
  }
  return obj
}, {})

const methods = {
  ...muuriMethods,

  refreshMuuri () {
    this.$muuri.layout()
  },

  addItem (id, item) {
    // todo: find proper way
    this.items.push(item.$el)
  },

  listenMuuri () {
    MUURI_GRID_EVENTS.forEach((event) => {
      this.listeners[event] = this.getListenerFunction(event, this)
      this.$muuri.on(event, this.listeners[event])
    })
  },

  unlistenMuuri () {
    MUURI_GRID_EVENTS.forEach((event) => {
      this.$muuri.off(event, this.listeners[event])
      delete this.listeners[event]
    })
  },

  getListenerFunction (event, ctx) {
    return function (...args) {
      ctx.onEvent(event, args)
    }
  },

  onEvent (event, ...args) {
    this.$emit(event, args)
  }
}

export default {
  name: 'MGrid',

  /**
   * @property {Muuri|undefined} $muuri
   */
  $muuri: undefined,

  props,

  data () {
    return {
      /**
       * @property {HTMLElement[]}
       */
      items: [],
      /**
       * @property {Function[]}
       */
      listeners: {}
    }
  },

  computed,

  watch,

  mounted () {
    this.items = (this.$slots.default || []).map(vnode => {
      return vnode.elm
    })

    this.$muuri = new Muuri(this.$refs.container, { items: this.items, ...this.propsToOptions })
    this.listenMuuri()

    this.$once('hook:beforeDestroy', () => {
      this.unlistenMuuri()
      this.$muuri.destroy(true)
      this.$muuri = undefined
    })
  },
  methods
}

/**
 * @typedef {Object} LayoutOptions
 * @property {Boolean} [fillGaps]
 * @property {Boolean} [horizontal]
 * @property {Boolean} [alignRight]
 * @property {Boolean} [alignBottom]
 * @property {Boolean} [rounding]
 */

/**
 * @typedef {Object} DragStartPredicate
 * @property {Number} [distance]
 * @property {Number} [delay]
 * @property {Boolean|String} [handle]
 */

/**
 * @typedef {Object} DragSortPredicate
 * @property {Number} [threshold]
 * @property {String} [action]
 */
</script>

<style lang="scss" scoped>
  .m-grid {
    position: relative;
  }
</style>
