const fs = require('fs');
const ora = require('ora');
const { Log, deployConfirm } = require('../../utils');
const {
  checkIsExistDeployConfig,
  appPluginPath,
  checkDevEnvParams,
  checkTestEnvParams,
  checkProdEnvParams
} = require('../../utils/verify');
const { createTaskList, executeTask } = require('./tasks');

module.exports = {
  description: '项目部署',
  async apply(env) {
    const hasDeployConfig = checkIsExistDeployConfig();
    if (hasDeployConfig) {
      if (env) {
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
        const answers = await deployConfirm(`${ Log.underLine(config.projectName) } 项目是否部署到 ${ Log.underLine(envConfig.name) }?`);
        if (answers.deployConfirm) {
          let taskList = createTaskList(envConfig, env);
          await executeTask(envConfig, taskList);
        } else {
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