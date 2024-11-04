function pipeline(...fn) {
  return function (args) {
    return fn.reduce((prev, fn) => fn(prev), args);
  };
}


const fn = pipeline(
  x => x + 1,
  x => x * 2
);
console.log(fn(3));


