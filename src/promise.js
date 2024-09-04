class RaggedyPromise {
  static PENDING = "请求中";
  static FULFILLED = "请求成功";
  static REJECTED = "请求失败";

  constructor(executor) {
    this.status = RaggedyPromise.PENDING;
    this.result = null;
    this.onFulFilledArray = [];
    this.onRejectedArray = [];
    try {
      executor(this.resovle.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resovle(data) {
    if (this.status !== RaggedyPromise.PENDING) {
      return;
    }
    this.result = data;
    this.status = RaggedyPromise.FULFILLED;
    this.onFulFilledArray.forEach((fn) => fn(this.result));
  }

  reject(data) {
    if (this.status !== RaggedyPromise.PENDING) {
      return;
    }
    this.result = data;
    this.status = RaggedyPromise.REJECTED;
    this.onRejectedArray.forEach((fn) => fn(this.result));
  }

  /**
   *
   * @param {*} onFulFilled
   * onFulFilled的返回值非promise类型时，resolve这个参数；
   * onFulFilled的返回值为promise类型时，then返回的promise的状态取决于onFulFilled返回的promise的状态
   * @param {*} onRejected
   * @returns
   */
  then(onFulFilled, onRejected) {
    let newPromise = new RaggedyPromise((resovle, reject) => {
      if (typeof onFulFilled !== "function") {
        onFulFilled = (value) => value;
      }
      if (typeof onRejected !== "function") {
        onRejected = (error) => {
          throw error;
        };
      }

      // 把成功回掉变成微任务，满足A+要求，在执行栈清空之后执行
      const fulFilledMicroTask = () => {
        queueMicrotask(() => {
          try {
            let x = onFulFilled(this.result);
            resolvePromise(newPromise, x, resovle, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      const rejectedMicroTask = () => {
        queueMicrotask(() => {
          try {
            let x = onRejected(this.result);
            resolvePromise(newPromise, x, resovle, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      if (this.status === RaggedyPromise.PENDING) {
        this.onFulFilledArray.push(fulFilledMicroTask);
        this.onRejectedArray.push(rejectedMicroTask);
      } else if (this.status === RaggedyPromise.FULFILLED) {
        fulFilledMicroTask();
      } else if (this.status === RaggedyPromise.REJECTED) {
        rejectedMicroTask();
      }
    });
    return newPromise;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 如果 promise2 === x， 执行 reject，错误原因为 TypeError
  if (promise2 === x) {
    reject(new TypeError("The promise and the return value are the same"));
  }

  // 如果 x 是函数或对象
  if ((typeof x === "object" && x != null) || typeof x === "function") {
    let then;
    try {
      then = x.then;
    } catch (error) {
      reject(error);
    }

    // 如果 x.then 是函数
    if (typeof then === "function") {
      // Promise/A+ 2.3.3.3.3 只能调用一次
      let called = false;
      try {
        then.call(
          x,
          (y) => {
            // resolve的结果依旧是promise 那就继续解析 | 递归解析
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (err) => {
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } catch (error) {
        if (called) return;
        reject(error);
      }
    } else {
      // 如果 x.then 不是函数
      resolve(x);
    }
  } else {
    // 如果 x 不是 promise 实例
    resolve(x);
  }
}

// export default RaggedyPromise;
module.exports = RaggedyPromise;
