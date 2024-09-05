import RaggedyPromise from "../src/promise.js";
// const RaggedyPromise = require("../src/promise.js");

// 正版的
let promise = new Promise((resolve, reject) => {
  resolve("一个真的promise");
  reject("一个真的promise，但是我错了");
});
promise
  .then(
    (data) => {
      console.log(data);
      // 几种情况：return data, return promise，
      //   return 666;
      //   return Promise.resolve(777);
      return Promise.reject(999);
      //   throw new Error(-111);
    },
    (err) => {
      console.log(err);
    }
  )
  .then(
    (data) => {
      console.log(data);
    },
    (err) => {
      console.log("err:", err);
    }
  )
  .catch((err) => {
    console.log(err.message);
  });

// raggedy版
let rPromise = new RaggedyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("\n我造的promise，成功了");
    reject("一个人造的promise，我错了😈");
  }, 0);
});
rPromise
  .then(
    (data) => {
      console.log(data);
      return data + "then";
    },
    (err) => {
      console.log("我造的promise失败了:", err);
    }
  )
  .then((data) => console.log(data));
