const fs = require('fs');
const os = require('os');
const { checkPackageExists } = require('../utils');

const devConfig = [
  {
    type: 'input',
    name: 'developmentName',
    message: '环境名称:',
    default: '开发环境',
    when: (answers) => answers.deployEnvList.includes('development')

  },
  {
    type: 'input',
    name: 'developmentScript',
    message: '打包命令',
    default: 'npm run build || yarn build',
    when: (answers) => answers.deployEnvList.includes('development')

  },
  {
    type: 'input',
    name: 'developmentHost',
    message: '服务器地址',
    when: (answers) => answers.deployEnvList.includes('development')
  },
  {
    type: 'number',
    name: 'developmentPort',
    message: '服务器端口号',
    default: 8080,
    when: (answers) => answers.deployEnvList.includes('development')
  },
  {
    type: 'input',
    name: 'developmentUserName',
    message: '用户名',
    default: 'root',
    when: (answers) => answers.deployEnvList.includes('development')
  },
  {
    type: 'password',
    name: 'developmentPassword',
    message: '密码',
    when: (answers) => answers.deployEnvList.includes('development')
  },
  {
    type: 'input',
    name: 'developmentDistPath',
    message: '本地打包目录',
    default: 'dist',
    when: (answers) => answers.deployEnvList.includes('development')
  },
  {
    type: 'input',
    name: 'developmentWebDir',
    message: '部署路径',
    when: (answers) => answers.deployEnvList.includes('development')
  },
  {
    type: 'confirm',
    name: 'developmentIsRemoveRemoteFile',
    message: '是否删除远程文件',
    default: true,
    when: (answers) => answers.deployEnvList.includes('development')
  },
  {
    type: 'confirm',
    name: 'developmentIsRemoveLocalFile',
    message: '是否删除本地打包文件',
    default: true,
    when: (answers) => answers.deployEnvList.includes('development')
  }
];

const commonConfig = {
  packageInfo: require('../../package.json'),
  customConfigFiles: 'deploy.config.js',
  inquirerConfig: [
    {
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称:',
      default() {
        let hasPkg = checkPackageExists();
        return hasPkg.exists ? hasPkg.name : '';
      }
    },
    {
      type: 'input',
      name: 'privateKey',
      message: '请输入本地私钥地址:',
      default: `${ os.homedir() }/.ssh/id_rsa`
    },
    {
      type: 'password',
      name: 'passphrase',
      message: '请输入本地私钥密码:',
      default: ''
    },
    {
      type: 'checkbox',
      name: 'deployEnvList',
      message: '请选择需要部署的环境:',
      choices: [
        {
          name: 'development',
          checked: true
        },
        {
          name: 'test'
        },
        {
          name: 'production'
        }
      ]
    },
    ...devConfig
  ]
};

module.exports = commonConfig;