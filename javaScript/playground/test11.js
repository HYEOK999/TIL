const Queue = (function () {
  function Queue (array = []) {
    if (!Array.isArray(array)) {
      console.log('error');
    }
    this.array = array;
  }

  Queue.prototype.push = function (a) {
    this.array.push(a);
  };

  Queue.prototype.shift = function () {
    this.array.shift();
  };

  return Queue;
}());

const queue = new Queue([1, 2]);
console.log(queue); // [1, 2]

queue.push(3);
console.log(queue); // [1, 2, 3]

queue.shift(); // -> 1
console.log(queue); // [2, 3]
