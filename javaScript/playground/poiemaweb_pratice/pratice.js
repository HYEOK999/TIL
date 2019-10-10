
const MAXNUMBER = 5;
var STAR = '';

console.log(
  '11번 문제 정답\n',
  practice(STAR, MAXNUMBER,
    function (i, j) { return i >= j; })
);

console.log(
  '12번 문제 정답\n',
  practice(STAR, MAXNUMBER,
    function (i, j) { return i <= j; })
);

console.log(
  '13번 문제 정답\n',
  practice(STAR, MAXNUMBER,
    function (i, j, value) { return i + j < value; })
);

console.log(
  '14번 문제 정답\n',
  practice(STAR, MAXNUMBER,
    function (i, j, value) { return i + j >= value - 1; })
);

console.log(
  '15번 문제 정답\n',
  practice(STAR, MAXNUMBER,
    function (i, j, value) { return i + j >= value - 1; },
    function (i, j) { return i > j; })
);

console.log(
  '16번 문제 정답\n',
  practice(STAR, MAXNUMBER,
    function (i, j) { return i <= j; },
    function (i, j) { return i < j; })
);

function practice(star, number, func, func2) {
  var stars = star;
  var argFouth = func2;
  var argLength = arguments.length;

  if (argFouth === undefined) {
    argFouth = null;
  }

  forMun(number, function (value, i) {
    if (argLength === 3 || argLength === 4) {
      doubleForMun(number, function (j) {
        stars += func(i, j, value) ? '*' : ' ';
      });
    }
    if (argLength === 4) {
      doubleForMun(number, function (j) {
        stars += func2(i, j) ? '*' : '';
      });
    }
  }, function (enter) {
    stars += enter;
  });

  return stars;
}

function forMun(number, func, enterFunc) {
  for (let i = 0; i < number; i++) {
    func(number, i);
    enterFunc('\n');
  }
}

function doubleForMun(list, iters) {
  for (let j = 0; j < list; j++) {
    iters(j);
  }
}