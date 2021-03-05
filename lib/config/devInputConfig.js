const devInputConfig = [
  {
    type: 'input',
    name: 'developmentScript',
    message: '开发环境启动命令:',
    default: 'vue-cli-service serve --open --mode development --host 127.0.0.1 --port 8080',
    when: answers => answers.deployEnvList.includes('development')
  }
];

module.exports = devInputConfig;