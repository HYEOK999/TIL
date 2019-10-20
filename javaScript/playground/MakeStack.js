const Stacks = (function () {
  function stacks (array = []) {
    if (!Array.isArray(array)) {
      throw TypeError;
    }
    this.array = array;
  }

  stacks.prototype.push = function (item) {
    return this.array.push(item);
  };

  stacks.prototype.pop = function () {
    return this.array.pop();
  };

  return stacks;
}());
const a = new Stacks([1, 2, 3]);

a.push(5);
console.log(a);

a.pop();
console.log(a);
