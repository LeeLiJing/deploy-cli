const { checkIsExistDeployConfig, appPluginPath } = require('../../utils/verify');
const { Log, deployConfirm } = require('../../utils');
const { checkDevEnvParams, checkTestEnvParams, checkProdEnvParams } = require('../../utils/checkParams');
const devTask = require('./devTask');

module.exports = {
  description: '项目部署',
  async apply(env) {
    const hasDeployConfig = checkIsExistDeployConfig();
    if (hasDeployConfig) {
      if (env) {
        if (env === 'development' || env === 'testing' || env === 'production') {
          const currentTime = new Date().getTime();
          const config = require(appPluginPath('deploy.config.js'));
          let envConfig;

          switch (env) {
            case 'development':
              envConfig = checkDevEnvParams(config, env);
              break;
            case 'testing':
              envConfig = checkTestEnvParams(config, env);
              break;
            case 'production':
              envConfig = checkProdEnvParams(config, env);
              break;
          }
          const answers = await deployConfirm(`是否运行 ${ Log.underLine(envConfig.projectName) } 项目?`);
          if (answers.deployConfirm) {
            let taskList = [];
            if (env === 'development') {
              await devTask(envConfig);
            }

          } else {
            process.exit(1);
          }
        } else {
          Log.error(`部署环境参数 ${ Log.underLine(env) } 错误,请使用既定环境参数(development,testing,production)`);
          process.exit(1);
        }
      } else {
        Log.error('请使用deploy-cli -m或--mode 指定部署环境');
        process.exit(1);
      }
    } else {
      Log.error(`${ Log.underLine('deploy.config.js') } 文件不存在，请使用 deploy-cli init 或者 deploy-cli i 命令创建.`);
      process.exit(1);
    }
  }
};