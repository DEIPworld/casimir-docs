/* eslint-disable */
const fs = require('fs-extra');
const path = require('path');
const decompress = require('decompress');
/* eslint-enable */

const stream = require('stream');
const { promisify } = require('util');

const pipeline = promisify(stream.pipeline);

const { repositories, reposPath } = require('./helpers');

(async () => {
  /* eslint-disable */
  const { default: ora } = await import('ora');
  const { default: got } = await import('got');
  /* eslint-enable */

  const logger = ora();

  logger.info('Downloading repositories');

  fs.emptyDirSync(reposPath);

  for (const { archive, destination } of Object.values(repositories)) {
    const repoName = path.basename(destination);
    const archiveExt = path.extname(archive);
    const archiveFile = `${repoName}${archiveExt}`;
    const targetFile = path.join(destination, archiveFile);

    const loggerMessage = `Downloading ${repoName}`;

    fs.ensureDirSync(destination);

    const downloadStream = got.stream(archive);
    const fileWriterStream = fs.createWriteStream(targetFile);

    downloadStream
      .on('downloadProgress', ({ transferred, total, percent }) => {
        const percentage = total ? Math.round(percent * 100) : '???';
        const progress = `${transferred}/${total || '???'} (${percentage}%)`;

        logger.text = `${loggerMessage} ${progress}`;
      })
      .on('error', (error) => {
        logger.fail(`Download failed: ${error.message}`);
      });

    fileWriterStream
      .on('error', (error) => {
        logger.fail(`Could not write file to system: ${error.message}`);
      });

    logger.start(loggerMessage);
    try {
      // eslint-disable-next-line no-await-in-loop
      await pipeline(downloadStream, fileWriterStream);
      logger.succeed();
    } catch (error) {
      logger.fail(`Something went wrong. ${error.message}`);
    }

    logger.start(`Extracting ${archiveFile}`);
    try {
      // eslint-disable-next-line no-await-in-loop
      await decompress(targetFile, destination, { strip: 1 });
      logger.succeed();
    } catch (error) {
      logger.fail(`Something went wrong. ${error.message}`);
    }

    fs.removeSync(targetFile);
  }

  logger.stop();
})();
