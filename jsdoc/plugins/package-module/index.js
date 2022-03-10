/* eslint-disable */
const path = require('path');
const findRoot = require('find-root');
const fs = require('fs-extra');
/* eslint-enable */

const modulesDump = [];

const docCommentsRegex = /\/\*\*\s*(?:[^*]|(?:\*(?!\/)))*\*\//g;
const moduleNameRegex = /@module\s+([\w/]+)?/;

const getReadmeRows = (readmePath) => {
  const readme = fs.pathExistsSync(readmePath) ? fs.readFileSync(readmePath, 'utf8') : '';
  return readme.split('\n').map((row) => ` * ${row}`);
};

exports.handlers = {
  beforeParse(e) {
    if (
      docCommentsRegex.test(e.source)
        && !moduleNameRegex.test(e.source)
    ) {
      const pkgRoot = findRoot(e.filename);
      const readmePath = path.join(pkgRoot, 'README.md');
      const packagePath = path.join(pkgRoot, 'package.json');

      const readme = getReadmeRows(readmePath);

      const { name: moduleName } = fs.readJsonSync(packagePath);

      const moduleComment = [
        '/**',
        ...readme,
        ` * @module ${moduleName}`,
        ' */'
      ].join('\n');

      e.source = [
        moduleComment,
        '',
        e.source
      ].join('\n');
    }
  },

  newDoclet(e) {
    const { doclet } = e;
    if (doclet.kind === 'module') {
      if (modulesDump.includes(doclet.name)) {
        e.defaultPrevented = true;
      } else {
        modulesDump.push(doclet.name);
      }
    }
  }
};
