function Circle(radius) {
  this.radius = radius;
  // Circle 이랑 프로토타입 함수를 보고 싶으면 인스턴스.getProperty를 치세요.
}

Circle.prototype.jirum = function () {
  return [this.radius * 2, Math.PI * this.radius ** 2];
};

Circle.prototype.getProperty = function () {
  return `현재 프로퍼티: ${Object.getOwnPropertyNames(this)} 프로토타입 프로퍼티: ${Object.getOwnPropertyNames(Object.getPrototypeOf(this))}`;
};

const circle2 = new Circle(10);

console.log(circle2.getProperty());
console.log(circle2.jirum());
