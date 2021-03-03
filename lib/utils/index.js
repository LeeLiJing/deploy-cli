const fs = require('fs');
const ora = require('ora');
const { resolve } = require('path');
const chalk = require('chalk');
// 项目根目录
const appDirectory = fs.realpathSync(process.cwd());

// 生成全路径方法
const appPluginPath = relativePath => resolve(appDirectory, relativePath);

// 日志
const log = (type, msg) => {
  if (!msg) {
    return console.log(type);
  }
  switch (type) {
    case 'success':
      ora().succeed(chalk.greenBright.bold(msg));
      break;
    case 'info':
      ora().info(chalk.blueBright.bold(msg));
      break;
    case 'error':
      ora().fail(chalk.redBright.bold(msg));
      break;
  }
};
log.success = (msg) => {
  log('success', msg);
};
log.info = (msg) => {
  log('info', msg);
};
log.error = (msg) => {
  log('error', msg);
};
log.underline = (msg) => {
  return chalk.underline.blueBright.bold(msg);
};

// 检查部署配置文件是否存在
const checkDeployConfigExists = () => {
  const { customConfigFiles } = require('../config');

  return fs.existsSync(appPluginPath(customConfigFiles));
};

// 检查项目是否存在package.json
checkPackageExists = () => {
  let hasProjectPkg = fs.existsSync(appPluginPath('package.json'));
  if (hasProjectPkg) {
    return {
      exists: true,
      name: appPluginPath('package.json').name
    };
  } else {
    return {
      exists: false,
      name: ''
    };
  }
};

module.exports = {
  checkDeployConfigExists: checkDeployConfigExists,
  logs: log,
  checkPackageExists: checkPackageExists
};