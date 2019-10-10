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

function f(f) {
  var string  = 'Hello';
  return f(string);
}

console.log( f(function (str){
  return str.toUpperCase();
}));

console.log( f(function(str){
  return str.toLowerCase();
}));