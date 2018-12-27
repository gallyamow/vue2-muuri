<template>
  <div
    v-if="true"
    ref="container"
    :class="['m-grid', containerClass]"
  >
    <slot />
  </div>
</template>

<script>
  import Muuri from 'muuri'

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
     * todo: nested props validator
     * @param {(Function|LayoutOptions)} [options.layout]
     * @property
     */
    layout: {
      type: [Function, Object]
    },
    /**
     * @param {(Boolean|Number)} [options.layoutOnResize=100]
     */
    layoutOnResize: {
      type: [Boolean, Number]
    },
    /**
     * @param {Boolean} [options.layoutOnInit=true]
     */
    layoutOnInit: {
      type: Boolean
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
      type: Boolean
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
      type: [Boolean, Function]
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

  export default {
    name: 'MGrid',
    props,
    data () {
      return {}
    },
    computed: {
      /**
       * @returns {HTMLElement[]}
       */
      items () {
        return this.$slots.default.map(vnode => {
          return vnode.elm
        })
      },

      options () {
        return {}
      }
    },

    mounted () {
      Object.defineProperties(this, {
        /**
         * @property {Muuri|undefined}
         */
        $muuri: {
          enumerable: true,
          get: () => new Muuri(this.$refs.container, { items: this.items, ...this.options })
        }
      })

      this.$once('hook:beforeDestroy', function () {
        this.$muuri.destroy(true)
      })
    }
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
