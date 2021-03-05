const fs = require('fs');
const { resolve } = require('path');
const { Log } = require('../utils');


// 项目根目录
const appDirectory = fs.realpathSync(process.cwd());

// 生成全路径方法
const appPluginPath = relativePath => resolve(appDirectory, relativePath);

// 检查目标项目中是否存在自动化配置
const checkIsExistDeployConfig = () => {
  const projectPath = appPluginPath('deploy.config.js');
  return fs.existsSync(projectPath);
};

//检查目标项目中是否存在package.json,如果存在返回内容对象
const checkIsExitsPackageJson = () => {
  const pkgPath = appPluginPath('package.json');
  const hasPkg = fs.existsSync(pkgPath);

  if (hasPkg) {
    return {
      isExists: true,
      result: require(pkgPath)
    };
  } else {
    return {
      isExists: false
    };
  }
};

module.exports = {
  appPluginPath,
  checkIsExistDeployConfig,
  checkIsExitsPackageJson
};