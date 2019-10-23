const Prefixer = (function () {
  function Prefixer(prefix) {
    this.prefix = prefix;
  }
  Prefixer.prototype.prefixArray = function (arr) {
    return arr.map(function (item) {
      return this.prefix + item;
    }, this);
  };

  return Prefixer;
}());

const pre = new Prefixer('-webkit-');
const preArr = pre.prefixArray(['linear-gradient', 'border-radius']);
console.log(preArr);
