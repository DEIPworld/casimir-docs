const {
  getFrontendPackages,
  getPkgInfo,
  getPkgReadme,
  saveJson
} = require('./helpers');

const packages = getFrontendPackages().casimir;

(async () => {
  /* eslint-disable */
  const { default: ora } = await import('ora');
  /* eslint-enable */

  const logger = ora();

  logger.start('Parsing packages readme');

  const data = packages.map((pkg) => {
    const { name } = getPkgInfo(pkg);
    const description = getPkgReadme(pkg);
    return {
      name,
      description
    };
  });

  saveJson('packages', data);

  logger.succeed();
  logger.stop();
})();
