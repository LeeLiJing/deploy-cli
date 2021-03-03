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
const { checkDeployConfigExists, logs } = require('../utils');

const ssh = new NodeSSH();
const maxBuffer = 5 * 1000 * 1024;

//任务列表
let taskList;

module.exports = {
  description: '项目部署',
  async apply(env) {
    if (checkDeployConfigExists()) {

    } else {
      logs.error(`${ logs.underline('deploy.config.js') } 文件不存在，请使用 deploy-cli init 或者 deploy-cli i 命令创建.`);
      process.exit(1);
    }
  }
};