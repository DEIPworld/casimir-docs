module.exports = {
  root: true,
  extends: [
    '@deip/eslint-config',
    '@deip/eslint-config/vue'
  ],
  rules: { // temp
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        vue: 'never'
      }
    ]
  }
};
