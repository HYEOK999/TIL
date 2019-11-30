let arr = [1,2,3,4,5];
let entries = [];
arr.forEach(function (v, i) {
  entries.push([i,v,this[i]]);
}, [10, 20, 30, 40, 50]);
console.log(entries);