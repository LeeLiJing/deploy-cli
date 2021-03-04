const ora = require('ora');
const fs = require('fs');
const childProcess = require('child_process');
const inquirer = require('inquirer');
const archiver = require('archiver');
const { logs } = require('./index');

const maxBuffer = 5 * 1000 * 1024;

// 检查环境是否正确并返回部署环境信息
const createEnvConfig = (config, env) => {
  const keys = ['name', 'host', 'port', 'username', 'distPath', 'webDir'];

  if (config) {
    keys.forEach(k => {
      if (!config[env][k] || config[env][k] === '/') {
        logs.error(`配置错误: ${ logs.underline(`${ env }环境`) } ${ logs.underline(`${ k }属性`) } 配置不正确`);
        process.exit(1);
      }
    });
  } else {
    logs.error('配置错误:未指定部署环境或这顶部署环境不存在');
    process.exit(1);
  }

  return Object.assign(config[env], {
    privateKey: config.privateKey,
    passphrase: config.passphrase
  });
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

// 执行打包脚本
const execBuild = async (config, index) => {
  try {
    const { script } = config;
    logs(`Step ${ index }: ${ script }`);
    const spinner = ora('正在打包中\n');
    spinner.start();

    await new Promise(((resolve, reject) => {
      childProcess.exec(script, { cwd: process.cwd(), maxBuffer: maxBuffer }, (e) => {
        spinner.stop();
        if (e === null) {
          logs.success('打包成功!');
          resolve();
        } else {
          reject(e.message);
        }
      });
    }));
  } catch (e) {
    logs.error('打包失败！');
    logs.error(e);
    process.exit(1);
  }
};

// 打包Zip
const buildZip = async (config, index) => {
  await new Promise((resolve, reject) => {
    logs(`Step ${ index }: 压缩打包 ${ logs.underline(config.distPath) } Zip`);
    const archive = archiver('zip', {
      zlib: { level: 9 }
    }).on('error', e => {
      logs.error(e);
    });

    const output = fs
        .createWriteStream(`${ process.cwd() }/${ config.distPath }.zip`)
        .on('close', e => {
          if (e) {
            logs.error(`压缩打包zip出错: ${ e }`);
            reject(e);
            process.exit(1);
          } else {
            logs.success(`${ logs.underline(`${ config.distPath }.zip`) }打包成功`);
            resolve();
          }
        });
    archive.pipe(output);
    archive.directory(config.distPath, false);
    archive.finalize();
  });
};

// 连接ssh
const connectSSH = async (config, index) => {
  try {
    logs(`Step ${ index }: ssh连接 ${ logs.underline(config.host) }`);

  } catch (e) {
    logs.error(e);
    process.exit(1);
  }

};

// 上传本地文件
const uploadLocalFile = async (config, index) => {
};

// 删除远程文件
const removeRemoteFile = async (config, index) => {
};

// 解压远程文件
const unzipRemoteFile = async (config, index) => {
};

// 删除本地打包文件
const removeLocalFile = async (config, index) => {
};

// 断开ssh
const disconnectSSH = async (config, index) => {
};

// 执行任务列表
const executeTaskList = async (config, taskList) => {
  for (const [index, execute] of new Map(taskList.map((execute, index) => [index, execute]))) {
    await execute(config, index + 1);
  }
};

// 创建任务列表
const createTaskList = (config) => {
  const { script, isRemoveRemoteFile = true, isRemoveLocalFile = true } = config;
  let taskList = [];
  // script && taskList.push(execBuild);
  // taskList.push(buildZip);
  taskList.push(connectSSH);
  // taskList.push(uploadLocalFile);
  // isRemoveRemoteFile && taskList.push(removeRemoteFile);
  // taskList.push(unzipRemoteFile);
  // isRemoveLocalFile && taskList.push(removeLocalFile);
  // taskList.push(disconnectSSH);
  return taskList;
};
module.exports = {
  createEnvConfig,
  deployConfirm,
  createTaskList,
  executeTaskList
};