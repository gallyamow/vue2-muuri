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
import { MUURI_GRID_EVENTS, MUURI_GRID_OPTIONS, MUURI_GRID_METHODS } from '../consts'

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

export const translateOptionName = name => {
  switch (name) {
    // alias of layout because muuri has such method name
    case 'layoutOptions':
      return 'layout'
  }
  return name
}

/**
 * @type {Object<String, Function>}
 */
const muuriOptionWatchers = MUURI_GRID_OPTIONS.reduce((obj, option) => {
  obj[option] = function (value) {
    const properOptionName = translateOptionName(option)

    // todo: find proper way to set options
    this.$muuri._settings[properOptionName] = value
    this.applySettingsMuuri()
  }
  return obj
}, {})

/**
 * Watchers for muuri options
 * @type {Object<String, Function>}
 */
const muuriMethods = MUURI_GRID_METHODS.reduce((obj, method) => {
  obj[method] = function (...args) {
    this.$muuri[method](...args)
  }
  return obj
}, {})

export default {
  name: 'MGrid',

  /**
   * @property {Muuri|undefined} $muuri
   */
  $muuri: undefined,

  provide () {
    return {
      itemAdded: this.itemAdded,
      itemRemoved: this.itemRemoved
    }
  },

  props,

  data () {
    return {
      $muuri: undefined,

      /**
       * @property {MItem[]}
       */
      items: [],
      /**
       * @property {Function[]}
       */
      listeners: {}
    }
  },

  computed: {
    propsToOptions () {
      return MUURI_GRID_OPTIONS.reduce((obj, option) => {
        if (this[option] !== undefined) {
          obj[option] = this[option]
        }
        return obj
      }, {})
    }
  },

  watch: {
    ...muuriOptionWatchers
  },

  mounted () {
    // initial
    this.items = (this.$slots.default || []).map(vnode => {
      return vnode.componentInstance
    })

    this.$muuri = new Muuri(this.$refs.container, {
      items: this.items.map(item => item.$el),
      ...this.propsToOptions
    })

    this.listenMuuri()

    this.$once('hook:beforeDestroy', () => {
      this.unlistenMuuri()
      this.$muuri.destroy(true)
      this.$muuri = undefined
    })
  },

  methods: {
    ...muuriMethods,

    itemAdded (item) {
      this.items.push(item)

      if (this.$muuri) {
        // todo: should I use remove before add?
        this.$muuri.add(item.$el)
      }
    },

    itemRemoved (item) {
      this.items = this.items.filter(v => v !== item)

      if (this.$muuri) {
        this.$muuri.remove(item.$el)
      }
    },

    // todo: implement
    applySettingsMuuri () {
      this.$muuri.layout()
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
}
</script>

<style lang="scss" scoped>
  .m-grid {
    position: relative;
  }
</style>
