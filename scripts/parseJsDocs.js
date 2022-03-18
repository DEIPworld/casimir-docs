/* eslint-disable */
const shell = require('shelljs');
const path = require('path');
const log = require("npmlog");
/* eslint-enable */

const {
  rootPath, getFrontendPackages, getInputFiles, saveJson, getPkgInfo
} = require('./helpers');

const packages = getFrontendPackages().casimir;

const transformDoclets = (doclets) => doclets
  .filter((doclet) => !doclet.undocumented)
  .filter((doclet) => doclet.kind !== 'package')
  .map((doclet) => {
    const {
      comment, ___id, ___s, meta,
      ...docletData
    } = doclet;

    const { name: packageName } = getPkgInfo(meta.path);

    return {
      ...docletData,
      package: packageName
    };
  });

const getDoclets = (inputs) => {
  const jsdocCommand = `jsdoc -X -c ${path.join(rootPath, 'scripts', 'jsdoc', 'config.js')} ${inputs.join(' ')}`;
  const { stdout: rawData } = shell.exec(jsdocCommand, { silent: true });
  return JSON.parse(rawData);
};

(async () => {
  /* eslint-disable */
  const { default: ora } = await import('ora');
  /* eslint-enable */

  const logger = ora();

  logger.start('Parsing JsDoc documentation');

  const inputs = packages.reduce((acc, pkg) => [...acc, ...getInputFiles(pkg, '{js,ts}')], []);
  const doclets = transformDoclets(getDoclets(inputs));

  saveJson('jsdoc', doclets);

  logger.succeed();
  logger.stop();
})();
