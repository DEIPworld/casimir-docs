module.exports = {
  tags: {
    allowUnknownTags: true
  },
  plugins: [
    './plugins/typescript',
    './plugins/package-module',
    './plugins/ts-import',
    'plugins/markdown'
  ],
  source: {
    includePattern: '\\.(js|ts)$'
  }
};
