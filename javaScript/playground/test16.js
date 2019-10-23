const Numbers = (function () {
  function Numbers() {
    this.numberArray = [];
  }

  Numbers.prototype.multiply = function (arr) {
    arr.forEach(function (item) {
      // 외부에서 this를 전달하지 않으면 this는 전역 객체를 가리킨다.
      this.numberArray.push(item * item);
    }, this); // forEach 메소드 내부에서 this로 사용될 객체를 전달
  };

  return Numbers;
}());

const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
console.log(numbers.numberArray); // [1, 4, 9]