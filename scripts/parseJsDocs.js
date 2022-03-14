/* eslint-disable */
const shell = require('shelljs');
const fs = require('fs-extra');
const path = require('path');
/* eslint-enable */

const { getFrontendPackages, rootPath, getInputFiles } = require('./helpers');

const cleanDoclet = (doclet) => {
  const {
    comment,
    ___id,
    ___s,
    meta,
    ...data
  } = doclet;
  return data;
};

const inputs = getFrontendPackages().casimir.reduce((acc, pkg) => [
  ...acc,
  ...getInputFiles(pkg, '{js,ts}')
], []);

const jsdocCommand = `jsdoc -X -c ${path.join(rootPath, 'scripts', 'jsdoc', 'config.js')} ${inputs.join(' ')}`;
const docletsStd = shell.exec(jsdocCommand, { silent: true }).stdout;

const doclets = JSON.parse(docletsStd)
  .filter((doclet) => !doclet.undocumented)
  .filter((doclet) => doclet.kind !== 'package')
  .map((doclet) => cleanDoclet(doclet));

fs.outputJsonSync(path.join('src', '.docs', 'jsdocs.json'), doclets, { spaces: 2 });
