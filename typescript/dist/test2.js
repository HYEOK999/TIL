"use strict";
var Queue = /** @class */ (function () {
    function Queue() {
        this.list = [];
    }
    Object.defineProperty(Queue.prototype, "length", {
        get: function () {
            return this.list.length;
        },
        enumerable: true,
        configurable: true
    });
    Queue.prototype.enqueue = function (item) {
        this.list.push(item);
    };
    Queue.prototype.dequeue = function () {
        return this.list.shift();
    };
    return Queue;
}());
var queue = new Queue();
queue.enqueue(0);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
console.log('55', queue.length);
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
