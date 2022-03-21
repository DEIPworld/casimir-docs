/* eslint-disable */
const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const findRoot = require('find-root');
/* eslint-enable */

const rootPath = path.resolve();
const reposPath = path.join(rootPath, '.repos');

const repositories = {
  'casimir-frontend': {
    archive: 'https://github.com/DEIPworld/casimir-frontend/archive/refs/heads/master.zip',
    destination: path.join(reposPath, 'casimir-frontend')
  },
  'casimir-backend': {
    archive: 'https://github.com/DEIPworld/casimir-backend/archive/refs/heads/master.zip',
    destination: path.join(reposPath, 'casimir-backend')
  }
};

const frontendPath = repositories['casimir-frontend'].destination;

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

const getPkgInfo = (filePath) => {
  const pkgRoot = findRoot(filePath);
  return fs.readJsonSync(path.join(pkgRoot, 'package.json'));
};

const getPkgReadme = (filePath) => {
  const pkgRoot = findRoot(filePath);
  const readmePath = path.join(pkgRoot, 'README.md');

  if (fs.pathExistsSync(readmePath)) {
    return fs.readFileSync(readmePath, 'utf8');
  }

  return '';
};

const saveJson = (name, json) => {
  fs.outputJsonSync(path.join('src', '.docs', `${name}.json`), json, { spaces: 2 });
};

module.exports = {
  rootPath,
  reposPath,

  getFrontendPackages,
  getInputFiles,
  getPkgInfo,
  getPkgReadme,
  saveJson,

  repositories
};
