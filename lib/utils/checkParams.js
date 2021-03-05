const { Log } = require('../utils');

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
  return {
    projectName: config.projectName,
    script: config[env]['script']
  };
};

//检查testing环境模式下参数是否正确
const checkTestEnvParams = (config, env) => {

};

//检查production环境模式下参数是否正确
const checkProdEnvParams = (config, env) => {

};

module.exports = {
  checkDevEnvParams,
  checkTestEnvParams,
  checkProdEnvParams
};