const Counter = (function makeCounter() {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  // 클로저를 반환
  return function (predicate) {
    // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
    counter = predicate(counter);
    return counter;
  };
}());

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다
console.log(Counter(increase)); // 1
console.log(Counter(increase)); // 2
console.log(Counter(decrease)); // 1
console.log(Counter(decrease)); // 0
