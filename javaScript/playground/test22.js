class Base {
  constructor() {
  console.log(new.target);
	console.log(this instanceof Derived);
	console.log(this instanceof Base);
	console.log(this instanceof Object);
  }
}

class Derived extends Base {
  constructor() { super(); }
}

