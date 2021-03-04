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

//检查development环境模式下参数是否正确
const checkDevEnvParams = (config, env) => {
  if (config) {
    if (!config[env]['script']) {
      Log.error(`配置错误: ${ Log.underLine(`${ env }环境`) } ${ Log.underLine(`script 属性`) } 配置不正确!`);
      process.exit(1);
    }
  } else {
    Log.error('配置错误:未指定部署环境或者部署环境不存在!');
    process.exit(1);
  }
  return config;
};

//检查testing环境模式下参数是否正确
const checkTestEnvParams = (config, env) => {

};

//检查production环境模式下参数是否正确
const checkProdEnvParams = (config, env) => {

};

module.exports = {
  checkIsExistDeployConfig,
  checkIsExitsPackageJson,
  appPluginPath,
  checkDevEnvParams,
  checkTestEnvParams,
  checkProdEnvParams
};