const Person = (function () {
  // 생성자 함수

  let _name = '';

  function Person(name) {
    _name = name;
  }

  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${_name}`);
  };

  return Person;
}());

const me = new Person('Lee');
me.sayHello();

// 모든 함수는 호출했을 때 자신이 생성된곳의 상위 스코프를 기억한다.