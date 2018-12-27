export const MUURI_GRID_OPTIONS = [
  'showDuration',
  'showEasing',
  'visibleStyles',
  'hideDuration',
  'hideEasing',
  'hiddenStyles',
  'layout',
  'layoutOnResize',
  'layoutOnInit',
  'layoutDuration',
  'layoutEasing',
  'sortData',
  'dragEnabled',
  'dragContainer',
  'dragStartPredicate',
  'dragAxis',
  'dragSort',
  'dragSortInterval',
  'dragSortPredicate',
  'dragReleaseDuration',
  'dragReleaseEasing',
  'dragHammerSettings',
  'containerClass',
  'itemClass',
  'itemVisibleClass',
  'itemHiddenClass',
  'itemPositioningClass',
  'itemDraggingClass',
  'itemReleasingClass'
]

export const MUURI_GRID_EVENTS = [
  'synchronize',
  'layoutStart',
  'layoutEnd',
  'add',
  'remove',
  'showStart',
  'showEnd',
  'hideStart',
  'hideEnd',
  'filter',
  'sort',
  'move',
  'send',
  'beforeSend',
  'receive',
  'beforeReceive',
  'dragInit',
  'dragStart',
  'dragMove',
  'dragScroll',
  'dragEnd',
  'dragReleaseStart',
  'dragReleaseEnd',
  'destroy'
]

export const getUuid = (function () {
  let counter = 0
  return function () {
    return ++counter
  }
})()
