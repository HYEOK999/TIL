const Person = function () {
  let _name = '';

  function Persons(name) {
    _name = name;
  }

  Persons.prototype.sayHi = function(){
    console.log(`${_name}`);
  }

  return Persons;
};

const me = new Person('Lee');
console.log(me.prototype);
console.log(typeof(me));