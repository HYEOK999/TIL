function Person(name){//Pe
  console.log(this);
  if(this instanceof Person){
    console.log("true");
  }
  this.name = 'Lee';
  this.sayHi = function(){
    return this.name;
  };
  console.log(this);
}

//const me = Person(); // undefined
const me = new Person();
console.log(me);