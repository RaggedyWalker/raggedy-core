import Array from "../src/array/index.js";

const origin = [1, 2, 3];
console.log(origin.myUnshift(9, 8, 7));
console.log(origin);
// [9, 8, 7, 1, 2, 3]
// [9, 1, 2, 3]
// [9,4,5,6,1,2,3]
console.log(origin.mySplice(1, 2, 4, 5, 6));
console.log(origin);
const origin1 = [1, 2, 3];
console.log(origin1.mySplice(1, 2));
console.log(origin1);