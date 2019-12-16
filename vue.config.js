module.exports = {
  css: {
    // use styles in js
    extract: false
  },

  configureWebpack: {
    externals: {
      muuri: 'muuri',
    }
  },

  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./demo/main.js')
      .end()
      .entry('library')
      .clear()
      .add('./src/index.js')
      .end()
  }
}
