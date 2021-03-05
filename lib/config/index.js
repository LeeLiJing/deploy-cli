const devInputConfig = require('./devInputConfig');
const { checkIsExitsPackageJson } = require('../utils/verify');

const commonConfig = {
  packageInfo: require('../../package.json'),
  inquireConfig: [
    {
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称(不支持中文):',
      default() {
        let hasPkg = checkIsExitsPackageJson();
        return hasPkg.isExists ? hasPkg.result.name : '';
      }
    },
    {
      type: 'checkbox',
      name: 'deployEnvList',
      message: '请选择要部署的环境(可多选):',
      choices: [
        {
          name: '开发环境',
          value: 'development',
          checked: true
        },
        {
          name: '48服务器测试环境',
          value: 'testing'
        },
        {
          name: '生产环境',
          value: 'production'
        }
      ]
    },
    ...devInputConfig
  ]
};

module.exports = commonConfig;