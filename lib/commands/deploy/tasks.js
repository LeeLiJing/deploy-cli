//创建执行任务列表
const createTaskList = (config, env) => {
  console.log(config);
  console.log(env);
  let taskList = [];
  switch (env) {
    case 'development':
      const { script } = config;
      script && taskList.push(customExec);
      break;
    case 'testing':
      break;
    case 'production':
      break;
  }
  return taskList;
};

// 执行任务列表
const executeTask = async (config, taskList) => {
  // console.log(config);
  // console.log(taskList);
  // for (const [index, execute] of new Map(taskList.map((execute, index) => [index, execute]))) {
  //   await execute(config, index + 1);
  // }
};

//执行用户自定义命令
const customExec = () => {

};

module.exports = {
  createTaskList,
  executeTask
};