const {
  getFrontendPackages,
  getPkgInfo,
  getPkgReadme,
  saveJson
} = require('./helpers');

const parsePackages = () => {
  console.info('Packages jsdoc parsing');

  const packagesInfo = getFrontendPackages().casimir
    .map((pkg) => {
      const { name } = getPkgInfo(pkg);
      const description = getPkgReadme(pkg);
      return {
        name,
        description
      };
    });

  saveJson('packages', packagesInfo);

  console.info('Done');
};

parsePackages();
