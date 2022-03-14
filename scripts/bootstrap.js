/* eslint-disable */
const shell = require('shelljs');
const yargs = require('yargs/yargs');
const { repos, rootPath } = require('./helpers');
/* eslint-enable */

const { argv } = yargs(process.argv.slice(2));

const opts = {
  init: argv.init || false,
  bootstrap: argv.bootstrap || true
};

if (opts.init) {
  console.log('init')
  shell.exec('git submodule update --init --recursive');
} else {
  shell.exec('git submodule sync --recursive');
  shell.exec('git submodule update --recursive --remote');
}

if (opts.bootstrap) {
  shell.cd(repos['casimir-frontend']);
  shell.exec('npm install');
  shell.exec('npx lerna bootstrap');
  shell.cd(rootPath);
}
