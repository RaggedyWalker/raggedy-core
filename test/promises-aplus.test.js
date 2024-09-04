const RaggedyPromise = require("../src/promise");

module.exports = {
  deferred() {
    const res = {};
    // 自己手写的Promise
    res.promise = new RaggedyPromise((resolve, reject) => {
      // 内部将resolve和reject赋值上去
      res.resolve = resolve;
      res.reject = reject;
    });
    return res;
  },
};
