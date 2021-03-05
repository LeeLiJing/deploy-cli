const inquirer = require('inquirer');
const fs = require('fs');
const childProcess = require('child_process');
const { inquireConfig } = require('../../config');
const { Log } = require('../../utils');
const { checkIsExistDeployConfig } = require('../../utils/verify');


// 获取用户输入信息
const getUserInputInfo = () => {
  return inquirer.prompt(inquireConfig);
};

// 创建配置JSON对象
const createConfigJson = info => {
  const jsonObj = {
    projectName: info.projectName
  };

  const { deployEnvList } = info;

  deployEnvList.forEach(item => {
    switch (item) {
      case 'development':
        jsonObj[item] = {
          script: info[`${ item }Script`]
        };
        break;
      case 'testing':
        break;
      case 'production':
        break;
    }
  });
  return jsonObj;
};

// 向目标项目创建自动化脚本配置文件
const createConfigFiles = jsonObj => {
  const str = `module.exports = ${ JSON.stringify(jsonObj, null, 2) }`;
  fs.writeFileSync('deploy.config.js', str);
};

// 格式化配置文件
const formatConfig = () => {
  childProcess.execSync(`npx prettier --write deploy.config.js`);
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

