# vue2-muuri

[Muuri](https://github.com/haltu/muuri) is a JavaScript layout engine that allows you to build all kinds of layouts and make them responsive, sortable, filterable, draggable and/or animated.

### Install

```sh
npm install vue2-muuri
```

### Usage

```vue
<MGrid
    ref="grid"
    container-class="grid"
    item-class="item"
    :show-duration="300"
  >
    <MItem class="item">
      Item 1
    </MItem>
    <MItem class="item">
      Item 2
    </MItem>
    <MItem class="item">
      Item 3
    </MItem>
  </MGrid>
```

### Run demo

```
npm run demo
```

## TODO

* we use layoutSettings as alias of muuri's layout option
* pass item methods
* declarative sort + declarative 
