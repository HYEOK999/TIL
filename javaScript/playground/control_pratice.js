// // 콜백 함수를 사용하지 않으면 함수를 분리해야 한다.
// function printToUpperCase() {
//   var string = 'Hello';
//   return string.toUpperCase();
// }

// console.log(printToUpperCase()); // HELLO

// function printToLowerCase() {
//   var string = 'Hello';
//   return string.toLowerCase();
// }

// console.log(printToLowerCase()); // hello
function outer(fn) {
  var x = 1;
  var y = 2;
  return fn(x, y);// 3
}

function inner(x, y) {
  var dd = x + y;
  return dd;
}

console.log(
  outer(inner)
);
