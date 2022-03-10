/* eslint-disable */
const shell = require('shelljs');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
/* eslint-enable */

const getFiles = (p) => glob.sync(path.join(p, '**', '*.*'), { nodir: true });

const cleanDoclet = (doclet) => {
  const {
    comment,
    ___id,
    ___s,
    ...data
  } = doclet;
  return data;
};

const rootPath = path.resolve();

const casimirFrontendPath = path.join(rootPath, 'documented-repos', 'casimir-frontend');

const frontendPackages = fs.readJsonSync(path.join(casimirFrontendPath, 'lerna.json')).packages
  .reduce((acc, pattern) => [
    ...acc,
    ...glob.sync(path.join(casimirFrontendPath, pattern), { absolute: true })
  ], []);

const packages = [
  ...frontendPackages
];

let inputs = [];

for (const pkg of packages) {
  // const { name: pkgName } = fs.readJsonSync(path.join(pkg, 'package.json'));
  // const readmePath = path.join(pkg, 'README.md')

  const srcPath = path.join(pkg, 'src');
  const typesPath = path.join(pkg, 'types');
  const libPath = path.join(pkg, 'lib');

  const hasSrc = fs.pathExistsSync(srcPath);
  const hasTypes = fs.pathExistsSync(typesPath);
  const hasLib = fs.pathExistsSync(libPath);

  if (hasSrc) inputs = inputs.concat(getFiles(srcPath));
  if (hasTypes) inputs = inputs.concat(getFiles(typesPath));
  if (hasLib && !hasSrc) inputs = inputs.concat(getFiles(libPath));
}

const jsdocCommand = `jsdoc -X -c ${path.join(rootPath, 'jsdoc', 'config.js')} ${inputs.join(' ')}`;
const docletsStd = shell.exec(jsdocCommand, { silent: true }).stdout;

const doclets = JSON.parse(docletsStd)
  .filter((doclet) => !doclet.undocumented)
  .filter((doclet) => doclet.kind !== 'package')
  .map((doclet) => cleanDoclet(doclet));

console.info(doclets);
