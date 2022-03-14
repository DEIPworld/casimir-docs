/* eslint-disable */
const vueDocs = require('vue-docgen-api');
const log = require('npmlog');
/* eslint-enable */

const {
  getFrontendPackages,
  getInputFiles,
  getPkgInfo,
  saveJson
} = require('./helpers');

const packages = getFrontendPackages().casimir;

async function parsePackagesComponents() {
  console.info('Packages components parsing');

  const inputs = packages.reduce((acc, pkg) => [...acc, ...getInputFiles(pkg, '{vue,jsx,tsx}')], []);

  const promises = inputs.map((file) => async () => {
    const data = await vueDocs.parse(file);
    return {
      ...data,
      package: getPkgInfo(file).name
    };
  });

  const components = await Promise.all(promises.map((fn) => fn()));

  saveJson('jsdoc', components);

  console.info('Done');
}

parsePackagesComponents();
