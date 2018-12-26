<template>
    <grid :show-duration="300">
        <item>
            <div class="card white" style="width: 200px; height: 200px">
            </div>
        </item>
        <item>
            <div class="card blue" style="width: 400px; height: 200px">
            </div>
        </item>
        <item>
            <div class="card red" style="width: 600px; height: 400px">
            </div>
        </item>
    </grid>
</template>

<script>
  import Grid from '../src/components/Grid'
  import Item from '../src/components/Item'

  export default {
    name: 'app',
    components: {
      Grid,
      Item
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
