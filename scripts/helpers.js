/* eslint-disable */
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
/* eslint-enable */

const rootPath = path.resolve();

const frontendPath = path.join(rootPath, 'vendor', 'casimir-frontend');

const getFrontendPackages = () => fs.readJsonSync(path.join(frontendPath, 'lerna.json')).packages
  .reduce((acc, pattern) => {
    const type = pattern.split('/')[1];
    const packages = glob.sync(path.join(frontendPath, pattern), { absolute: true });
    return { ...acc, ...{ [type]: packages } };
  }, {});

const getFiles = (p, ext = '*') => glob.sync(path.join(p, '**', `*.${ext}`), { nodir: true });

const getInputFiles = (pkg, ext) => {
  let inputs = [];

  const srcPath = path.join(pkg, 'src');
  const typesPath = path.join(pkg, 'types');
  const libPath = path.join(pkg, 'lib');

  const hasSrc = fs.pathExistsSync(srcPath);
  const hasTypes = fs.pathExistsSync(typesPath);
  const hasLib = fs.pathExistsSync(libPath);

  if (hasSrc) inputs = inputs.concat(getFiles(srcPath, ext));
  if (hasTypes) inputs = inputs.concat(getFiles(typesPath, ext));
  if (hasLib && !hasSrc) inputs = inputs.concat(getFiles(libPath, ext));

  return inputs;
};

module.exports = {
  rootPath,
  getFrontendPackages,
  getInputFiles
};
