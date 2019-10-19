const Person = (function () {
  // 생성자 함수

  let _name = '';

  function Person(name) {
    _name = name;
  }

  // 프로토타입 메소드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${_name}`);
  };

  // 생성자 함수를 반환
  return Person;
}());

const me = new Person('Lee');
console.log(me);
me.sayHello();

const you = new Person('Kim');
you.sayHello();

// 모든 함수는 호출했을 때 자신이 생성된곳의 상위 스코프를 기억한다.
const kk = {
  name: 'Lee',
};
//console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
console.log(kk.name);
console.log(Object.getOwnPropertyDescriptor(kk, 'name'));
