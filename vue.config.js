module.exports = {
  chainWebpack: config => {
    config
      .entry('app')
      .clear()
      .add('./test/main.js')
      .end()
  }
}
