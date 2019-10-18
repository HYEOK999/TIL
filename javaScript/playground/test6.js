const person = {
  // 데이터 프로퍼티
  firstName: 'Ungmo',
  lastName: 'Lee'

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티이다.
  // getter 함수
};

Object.defineProperty(person, 'lastName', {
  writable: false,
  enumerable: false,
});

Object.defineProperty(person, 'fullName', {
  // getter 함수
  get: function () { // === get() {
    return this.firstName + ' ' + this.lastName;
  },
  // setter 함수
  set: function (name) { // === set(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
  enumerable: true,
  // configurable: false
});

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');

console.log(descriptor);
person.fullName = 'Kim HYEOK';
console.log(person);
