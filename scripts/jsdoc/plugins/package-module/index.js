/* eslint-disable */
const path = require('path');
const findRoot = require('find-root');
const fs = require('fs-extra');
/* eslint-enable */

const modulesDump = [];

const docCommentsRegex = /\/\*\*\s*(?:[^*]|(?:\*(?!\/)))*\*\//g;
const moduleNameRegex = /@module\s+([\w/]+)?/;

exports.handlers = {
  beforeParse(e) {
    if (
      docCommentsRegex.test(e.source)
        && !moduleNameRegex.test(e.source)
    ) {
      const packagePath = path.join(findRoot(e.filename), 'package.json');
      const { name: packageName } = fs.readJsonSync(packagePath);

      const moduleComment = [
        '/**',
        ` * @module ${packageName}`,
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
