// function curry(fn, ...args) {

// }

// function add(...list) {

// }

const curry = function (fn, ...a) {
  // 实参数量大于等于形参数量吗？
  return a.length >= fn.length
    ? // 如果大于返回执行结果
      fn(...a)
    : // 反之继续柯里化，递归，并将上一次的参数以及下次的参数继续传递下去
      (...b) => curry(fn, ...a, ...b);
};
const add = (a, b, c) => a + b + c;
  
// const add = (...elements) => elements.reduce((pre, cur) => pre + cur, 0);
// 将add加工成柯里化函数
const addCurry = curry(add);
console.log(addCurry(1, 2, 3)); // 6
console.log(addCurry(1)(2)(3)); // 6
console.log(addCurry(1, 2)(3)); // 6
console.log(addCurry(1)(2, 3)); // 6
