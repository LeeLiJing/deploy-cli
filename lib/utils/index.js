const ora = require('ora');
const chalk = require('chalk');
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
  maxBuffer: 5 * 1000 * 1024,
  Log: new Log(),
  deployConfirm
};