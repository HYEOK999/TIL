/*
12. 중복 요소 제거 **

인수로 전달된 배열의 요소 중에서 중복된 요소를 제외하고 유니크한 요소만을 반환하는 함수를 작성하라.

for 문은 사용하지 않도록 하자.

*/
function uniq(array) {
  return array.filter(function (item, index) {
    return array.indexOf(item) == index;
  });
}

console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [ 2, 1, 3, 4 ]
