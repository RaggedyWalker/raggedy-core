import { deepCopy } from "../src/object/index.js";

const a ={a:1};
const b = a;
let source1 = {a,b:1};
a.source1 = source1;
let target1 = deepCopy(source1);
console.log(target1);


let source2 = [{a:{aa:1,bb:2},b:3},{c:{cc:22,bb:2},b:6}];
let target2 = deepCopy(source2);
console.log(target2);