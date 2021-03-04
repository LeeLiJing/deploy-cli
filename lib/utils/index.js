const ora = require('ora');
const chalk = require('chalk');
const childProcess = require('child_process');
const fs = require('fs');
const inquirer = require('inquirer');

// 日志
class Log {
  success(msg) {
    ora().succeed(chalk.greenBright.bold(msg));
  }

  error(msg) {
    ora().fail(chalk.redBright.bold(msg));
  }

  info(msg) {
    ora().info(chalk.blueBright.bold(msg));
  }

  underLine(msg) {
    return chalk.underline.blueBright.bold(msg);
  }

  normal(msg) {
    console.log(msg);
  }
}


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

// 格式化配置文件
const formatConfig = () => {
  childProcess.execSync(`npx prettier --write deploy.config.js`);
};

// 想目标项目创建自动化脚本配置文件
const createConfigFiles = jsonObj => {
  const str = `module.exports = ${ JSON.stringify(jsonObj, null, 2) }`;
  fs.writeFileSync('deploy.config.js', str);
};

// 是否确认部署
const deployConfirm = msg => {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'deployConfirm',
      message: msg
    }
  ]);
};


module.exports = {
  Log: new Log(),
  createConfigJson,
  formatConfig,
  createConfigFiles,
  deployConfirm
};