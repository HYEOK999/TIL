function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea());
console.log(circle2.getArea());
console.log(Circle.prototype.getArea());
console.log(Circle.prototype === Object.getPrototypeOf(circle1));

const obj1 = Object.create(Object.prototype, {
  x: { value: 1 }
});

const obj2 = {};
obj2.x = 1;

console.log(Object.getOwnPropertyDescriptor(obj1, 'x'));

console.log(Object.getOwnPropertyDescriptor(obj2, 'x'));

const person = {};
Object.defineProperty(person, 'lastName', {
  value : 'lee'
});

console.log(Object.getOwnPropertyDescriptor(person,'lastName'));