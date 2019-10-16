function Person(name){//Pe
  console.log(this);
  if(this instanceof Person){
    console.log("true");
  }
  else{
    console.log("false");
  }
  this.name = 'Lee';
  this.sayHi = function(){
    return this.name;
  };
  console.log(this);
}

//const me = Person(); // undefined
const me = Person();
console.log(me);