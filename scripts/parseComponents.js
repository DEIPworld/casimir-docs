/* eslint-disable */
const vueDocs = require('vue-docgen-api');
/* eslint-enable */

const {
  getFrontendPackages,
  getInputFiles,
  getPkgInfo,
  saveJson
} = require('./helpers');

const packages = getFrontendPackages().casimir;

(async () => {
  /* eslint-disable */
  const { default: ora } = await import('ora');
  /* eslint-enable */

  const logger = ora();

  logger.start('Parsing components documentation');

  const inputs = packages.reduce((acc, pkg) => [...acc, ...getInputFiles(pkg, '{vue,jsx,tsx}')], []);

  const promises = inputs.map((file) => async () => {
    const data = await vueDocs.parse(file);
    return { ...data, package: getPkgInfo(file).name };
  });

  const components = await Promise.all(promises.map((fn) => fn()));

  saveJson('jsdoc', components);

  logger.succeed();
  logger.stop();
})();
