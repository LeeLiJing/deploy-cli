/**
 * @description
 * @class deploy
 * @author lj
 * @date 2021/03/03
 */
const fs = require('fs');
const ora = require('ora');
const inquirer = require('inquirer');
const archiver = require('archiver');
const { NodeSSH } = require('node-ssh');
const childProcess = require('child_process');
const { checkDeployConfigExists, logs, appPluginPath } = require('../utils');
const { createEnvConfig, deployConfirm, createTaskList, executeTaskList } = require('../utils/task');
const { customConfigFiles } = require('../config');

const ssh = new NodeSSH();

//任务列表
let taskList;


module.exports = {
  description: '项目部署',
  async apply(env) {
    if (checkDeployConfigExists()) {
      const config = require(appPluginPath(customConfigFiles));
      const { projectName, cluster } = config;
      const currentTime = new Date().getTime();

      if (env) {
        const envConfig = createEnvConfig(config, env);
        const answers = await deployConfirm(`${ logs.underline(projectName) } 项目是否部署到 ${ logs.underline(envConfig.name) }?`);
        if (answers.deployConfirm) {
          taskList = createTaskList(envConfig);
          await executeTaskList(envConfig, taskList);
        } else {
          process.exit(1);
        }

      } else {
        logs.error('请使用deploy-cli -m或--mode 指定部署环境');
        process.exit(1);
      }
    } else {
      logs.error(`${ logs.underline('deploy.config.js') } 文件不存在，请使用 deploy-cli init 或者 deploy-cli i 命令创建.`);
      process.exit(1);
    }
  }
};