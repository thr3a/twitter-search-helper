module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "vue/max-attributes-per-line": "off"
    // "semi": [
    //   "error",
    //   "always"
    // ]
  }
}
