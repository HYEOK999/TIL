"use strict";
var Circle = /** @class */ (function () {
    function Circle(radius) {
        this.radius = radius;
        this.radius = radius;
    }
    Circle.prototype.getArea = function () {
        return this.radius * this.radius * Math.PI;
    };
    return Circle;
}());
var Retangle = /** @class */ (function () {
    function Retangle(width, height) {
        this.width = width;
        this.height = height;
        this.width = width;
        this.height = height;
    }
    Retangle.prototype.getArea = function () {
        return this.width * this.height;
    };
    return Retangle;
}());
var shape = [new Circle(5), new Retangle(5, 5)];
var circle = new Circle(5);
var rectangle = new Retangle(10, 5);
console.log(circle.radius);
console.log(rectangle);
