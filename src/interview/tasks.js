// 执行耗时任务，不阻碍页面渲染
/**
 * 
 * @param {Function} task 
 * @returns 
 */
function runTimeConsumingTask(task) {
  return new Promise((resolve, reject) => {
    _runTimeConsumingTask(task, resolve);
  });
}

function _runTimeConsumingTask(task, callback) {
  let now = Date.now();
  requestAnimationFrame(() => {
    let end = Date.now();
    if (end - now <= 16.6) {
      task();
      callback();
    } else {
      _runTimeConsumingTask(task, callback);
    }
  });
}
