const ora = require('ora');
const chalk = require('chalk');
const childProcess = require('child_process');
const { Log, maxBuffer } = require('../../utils');

module.exports = async (config) => {
  try {
    const { script } = config;
    Log.normal(`即将运行用户自定义脚本: ${ chalk.yellowBright.bold(script) }`);
    const spinner = ora('正在运行自定义脚本...\n');
    spinner.start();

    await new Promise((resolve, reject) => {
      childProcess.exec(script, { cwd: process.cwd(), maxBuffer: maxBuffer }, e => {
        console.log(e);
        spinner.stop();
        if (e === null) {
          Log.success('自定义脚本运行成功!');
          resolve();
        } else {
          reject(e.message);
        }
      });
    });
  } catch (e) {
    Log.error('运行自定义脚本失败!');
    Log.error(e);
    process.exit(1);
  }
};