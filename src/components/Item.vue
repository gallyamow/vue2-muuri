<template>
  <div class="m-item">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'MItem',
    props: {}
  }
</script>

<style lang="scss" scoped>
  .m-item {
    display: block;
    position: absolute;
    z-index: 1;

    &.muuri-item-dragging {
      z-index: 3;
    }

    &.muuri-item-releasing {
      z-index: 2;
    }

    &.muuri-item-hidden {
      z-index: 0;
    }
  }

  /*.item-content {*/
  /*position: relative;*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*}*/
</style>
