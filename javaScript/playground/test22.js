class Person{
  #_name = '';

  constructor(name){
    this.#_name = name;
  }

  sayHi(){
    return console.log('Hi' + this.#_name);
  }
}

const person = new Person();
person.sayHi();