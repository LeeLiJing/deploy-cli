const fs = require('fs');
const { program } = require('commander');
const pkg = require('../package.json');

//注册命令
const registerCommands = name => {
  const commandContent = require(`${ __dirname }/commands/${ name }`);
  const alias = name.charAt(0);

  switch (name) {
    case 'init':
      program
          .command(name)
          .description(commandContent.description)
          .alias(alias)
          .action(() => {
            commandContent.apply();
          });
      break;
    case 'deploy':
      program
          .command(name)
          .description(commandContent.description)
          .alias(alias)
          .option('-m,--mode <mode>', '设置部署模式')
          .action(option => {
            commandContent.apply(option.mode);
          });
      break;
  }
};


class Service {
  constructor() {
    //设置默认命令
    program.version(pkg.version, '-v,--version', '当前版本号');
    program.helpOption('-h.--help', '获取帮助');
    program.addHelpCommand(false);

    //读取command命令文件
    fs.readdirSync(`${ __dirname }/commands`).forEach(registerCommands);
  }

  run(_id, _args = {}, rawArgv = []) {
    program.parse(rawArgv, { from: 'user' });
  }
}

module.exports = Service;