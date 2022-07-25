const {
  getFrontendPackages,
  getPkgInfo,
  getPkgType,
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
    const type = getPkgType(pkg);

    getPkgType(pkg)
    return {
      name,
      type,
      description
    };
  });

  saveJson('packages', data);

  logger.succeed();
  logger.stop();
})();
