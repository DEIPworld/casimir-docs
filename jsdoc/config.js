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
    includePattern: '\\.(jsx|js|ts|tsx)$'
  }
};
