<template>
  <MGrid :show-duration="300">
    <MItem>
      <div
        class="card white"
        style="width: 200px; height: 200px">
        Привет
      </div>
    </MItem>
    <MItem>
      <div
        class="card blue"
        style="width: 400px; height: 200px">
      </div>
    </MItem>
    <MItem>
      <div
        class="card red"
        style="width: 600px; height: 400px">
      </div>
    </MItem>
  </MGrid>
</template>

<script>
  import MGrid from '../src/components/MGrid'
  import MItem from '../src/components/MItem'

  export default {
    name: 'App',
    components: {
      MGrid,
      MItem
    }
  }
</script>

<style>
  .card {
    border: 1px solid gray;
  }

  .white {
    background: white;
  }

  .blue {
    background: blue;
  }

  .red {
    background: red;
  }
</style>
