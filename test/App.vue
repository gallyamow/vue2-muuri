<template>
  <div>
    <section class="grid-demo">
      <h2 class="section-title"><span>Grid Demo</span></h2>

      <div class="controls cf">
        <div class="control search">
          <div class="control-icon">
            <i class="material-icons">
              &#xE8B6;
            </i>
          </div>
          <input
            class="control-field search-field form-control "
            type="text"
            name="search"
            placeholder="Search..."
          />
        </div>
        <div class="control filter">
          <div class="control-icon">
            <i class="material-icons">
              &#xE152;
            </i>
          </div>

          <div class="select-arrow">
            <i class="material-icons">
              &#xE313;
            </i>
          </div>
          <select
            v-model="selectedColor"
            class="control-field filter-field form-control"
          >
            <option value="">
              All
            </option>
            <option
              v-for="(label, key) in colors"
              :key="key"
              :value="key"
            >
              {{ label }}
            </option>
          </select>
        </div>
        <div class="control sort">
          <div class="control-icon">
            <i class="material-icons">
              &#xE164;
            </i>
          </div>
          <div class="select-arrow">
            <i class="material-icons">
              &#xE313;
            </i>
          </div>
          <select
            v-model="selectedSorting"
            class="control-field sort-field form-control"
          >
            <option
              v-for="(label, key) in sorting"
              :key="key"
              :value="key"
            >
              {{ label }}
            </option>
          </select>
        </div>
        <div class="control layout">
          <div class="control-icon">
            <i class="material-icons">
              &#xE871;
            </i>
          </div>
          <div class="select-arrow">
            <i class="material-icons">
              &#xE313;
            </i>
          </div>
          <select
            v-model="selectedPosition"
            class="control-field layout-field form-control"
          >
            <option
              v-for="(label, key) in positions"
              :key="key"
              :value="key"
            >
              {{ label }}
            </option>
          </select>
        </div>
      </div>

      <MGrid
        container-class="grid"
        item-class="item"
        :drag-enabled="true"
        :show-duration="300"
        :layout="layoutOptions"
      >
        <MItem
          v-for="item in items"
          :key="item.id"
          :class="['item', 'w'+item.width, 'h'+item.height, item.color]"
        >
          <div class="item-content">
            <div class="card">
              <div class="card-id">
                {{ item.id }}
              </div>
              <div class="card-title">
                {{ item.title }}
              </div>
              <div class="card-remove">
                <i class="material-icons">
                  &#xE5CD;
                </i>
              </div>
            </div>
          </div>
        </MItem>
      </MGrid>

      <div class="grid-footer">
        <button
          class="add-more-items btn btn-primary"
          @click="addMoreItems(5)"
        >
          <i class="material-icons">
            &#xE145;
          </i>
          Add more items
        </button>
      </div>
    </section>
  </div>
</template>

<script>
  import { getUuid } from '@/consts'
  import MGrid from '@/components/MGrid'
  import MItem from '@/components/MItem'

  const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz'

  /**
   * inspired by https://codepen.io/bcwang/pen/OxRMeb
   */
  export default {
    name: 'App',
    components: {
      MGrid,
      MItem
    },
    data () {
      return {
        selectedPosition: 'left-top',
        selectedSorting: 'order',
        selectedColor: '',
        items: [],
        positions: {
          'left-top': 'Left Top',
          'left-top-fillgaps': 'Left Top (fill gaps)',
          'right-top': 'Right Top',
          'right-top-fillgaps': 'Right Top (fill gaps)',
          'left-bottom': 'Left Bottom',
          'left-bottom-fillgaps': 'Left Bottom (fill gaps)',
          'right-bottom': 'Right Bottom',
          'right-bottom-fillgaps': 'Right Bottom (fill gaps)'
        },
        sorting: {
          'order': 'Drag',
          'title': 'Title (drag disabled)',
          'color': 'Color (drag disabled)'
        },
        colors: {
          'red': 'Red',
          'blue': 'Blue',
          'green': 'Green'
        }
      }
    },
    computed: {
      /**
       * @returns {LayoutOptions}
       */
      layoutOptions () {
        return {
          horizontal: false,
          alignRight: this.selectedPosition.indexOf('right') > -1,
          alignBottom: this.selectedPosition.indexOf('bottom') > -1,
          fillGaps: this.selectedPosition.indexOf('fillgaps') > -1
        }
      }
    },
    created () {
      this.addMoreItems(20)
    },
    methods: {
      addMoreItems (count) {
        this.items = this.items.concat([...Array(count)].map(() => this.generateRandomItem()))
      },
      generateRandomItem () {
        const id = getUuid()
        const color = this.getRandomItems(Object.keys(this.colors))
        const title = this.getRandomItems(CHARACTERS) + this.getRandomItems(CHARACTERS)
        const width = Math.floor(Math.random() * 2) + 1
        const height = Math.floor(Math.random() * 2) + 1
        return { id, color, title, width, height }
      },
      getRandomItems (collections) {
        return collections[Math.floor(Math.random() * collections.length)]
      }
    }
  }
</script>

<style>
  @import './styles.scss';
</style>
