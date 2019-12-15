module.exports = {
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
