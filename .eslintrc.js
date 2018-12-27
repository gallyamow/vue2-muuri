module.exports = {
  root: true,
  // используется default
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    '@vue/standard',
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:vue-libs/recommended'
  ],
  rules: {},

  // override if necessary
  overrides: [
    {
      // fix проблемы первых отступов внутри <script>
      files: ['*.vue'],
      rules: {
        indent: 0,
        'vue/script-indent': [2, 2, {
          'baseIndent': 1,
          'switchCase': 1
        }]
      }
    }
  ]
}
