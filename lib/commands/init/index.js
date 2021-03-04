const inquirer = require('inquirer');
const { checkIsExistDeployConfig } = require('../../utils/verify');
const { Log, createConfigJson, createConfigFiles, formatConfig } = require('../../utils');
const { inquireConfig } = require('../../config');


// 获取用户输入信息
const getUserInputInfo = () => {
  return inquirer.prompt(inquireConfig);
};

module.exports = {
  description: '初始化项目',
  apply() {
    const hasDeployConfig = checkIsExistDeployConfig();
    if (hasDeployConfig) {
      Log.error('deploy.config.js 配置文件已存在!');
      process.exit(1);
    } else {
      getUserInputInfo().then(inputInfo => {
        createConfigFiles(createConfigJson(inputInfo));
        formatConfig();
        Log.success(`配置文件生成成功，请查看项目目录下的 ${ Log.underLine('deploy.config.js') } 文件确认配置是否正确`);
        process.exit(0);
      });
    }
  }
};