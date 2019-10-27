const Person = (function () {
  let _name = '';
  function Person(name) {
    _name = name;
  }

  Person.prototype.sayHi = function () {
    return console.log(`Hi ${_name}`);
  };

  return Person;
}());
const person = new Person('KIM');
person.sayHi();