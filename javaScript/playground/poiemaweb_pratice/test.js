
var a = 5;
var b = 10;
var c = 11;
var d = 20;

function arr(aa, bb, cc) {
  console.log(cc);
  return cc;
}

arr(a, b, c, d);


var add1 = function () {
  var a = 10;
	return a;
}();

console.log(add1);

var add2 = (function () {
  var b = 20;
  return function (x, y) {
    return x + y + b;
  };
}());

console.log(add2(1,2));


function test (a) {
  return function (b){
    return a+b;
  }
}

console.log(test(1)(2))

