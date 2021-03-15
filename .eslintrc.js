module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['prettier', 'prettier/vue', 'plugin:nuxt/recommended'],
  rules: {
    'vue/html-closing-bracket-newline': 'off',
    'no-unused-vars': 'off',
    'no-multi-spaces': 2,
    'import/no-named-as-default-member': 'off',
  },
};
