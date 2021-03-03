/**
 * @description
 * @class index
 * @author lj
 * @date 2021/03/02
 */

const fs = require('fs');
const program = require('commander');
const { packageInfo } = require('./config');

// 设置默认命令
const setupDefaultCommands = () => {
  program.version(packageInfo.version, '-v,--version', '输出当前版本号');
  program.helpOption('-h,--help', '获取帮助');
  program.addHelpCommand(false);
};

//commands命令文件地址
const commandsPath = `${ __dirname }/commands`;

class Service {
  constructor() {
    setupDefaultCommands();
    fs.readdirSync(commandsPath).forEach(registerCommands);
  }

  run(_id, _args = {}, rawArgv = []) {
    program.parse(rawArgv, { from: 'user' });
  }
}

const registerCommands = id => {
  const command = require(`${ commandsPath }/${ id }`);
  const commandName = id.split('.')[0];
  const alias = id.charAt(0);

  if (commandName === 'deploy') {
    program
        .command(commandName)
        .description(command.description)
        .alias(alias)
        .option('-m,--mode <mode>', 'setup deploy mode')
        .action(option => {
          command.apply(option.mode);
        });
  } else {
    program
        .command(commandName)
        .description(command.description)
        .alias(alias)
        .action(() => {
          command.apply();
        });
  }
};

module.exports = Service;