module.exports = {
  root: true,
  extends: [
    '@deip/eslint-config',
    '@deip/eslint-config/vue'
  ],
  settings: {
    'import/resolver': {
      // alias: {
      //   map: [
      //     ['@', './src']
      //   ],
      //   extensions: ['.js', '.jsx', '.vue']
      // },
      webpack: {
        config: require.resolve('@vue/cli-service/webpack.config.js')
      }
    }
  }
};
