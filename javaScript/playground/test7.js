function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.getMath = function () {
  return [this.radius * 2, Math.PI * this.radius ** 2];
};

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1);
console.log(circle2);
