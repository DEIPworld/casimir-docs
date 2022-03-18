/* eslint-disable */
const shell = require('shelljs');
const { repositories, rootPath } = require('./helpers');
/* eslint-enable */

function asyncExec(
  command,
  options = {}
) {
  return new Promise((resolve, reject) => {
    shell.exec(
      command,
      { ...options, async: false },
      (code, stdout, stderr) => {
        if (code !== 0) {
          const e = new Error();
          e.message = stderr;
          e.name = String(code);
          reject(e);
        } else {
          resolve(stdout);
        }
      }
    );
  });
}

(async () => {
  /* eslint-disable */
  const { default: ora } = await import('ora');
  /* eslint-enable */

  const logger = ora();

  logger.start('Prepare repositories...');

  shell.cd(repositories['casimir-frontend'].destination);

  logger.start('Installing packages');
  await asyncExec('npm install --ignore-scripts', { silent: true });
  logger.succeed();

  logger.start('Bootstrapping lerna');
  await asyncExec('npx lerna bootstrap', { silent: true });
  logger.succeed();

  shell.cd(rootPath);

  logger.stop();
})();
