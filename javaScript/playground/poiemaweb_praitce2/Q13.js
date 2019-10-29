/*
13. 중복없는 배열 **

길이가 n인 배열에 1부터 n까지 숫자가 중복 없이 한 번씩 들어 있는지를 확인하려고 한다.
1부터 n까지 숫자가 중복 없이 한 번씩 들어 있는 경우 true를,
아닌 경우 false를 반환하도록 함수 isNotOverlapArray을 완성하라. 단, 배열의 요소는 정수이다.

예를 들어 주어진 배열이 [4, 1, 3, 2]이라면 true, [4, 1, 3] 또는 [1, 3]이라면 false를 반환한다.
*/
function isNotOverlapArray(array) {
  return array.every((currentValue, index) => currentValue <= array.length && array.indexOf(currentValue) === index);
}

console.log(isNotOverlapArray([4, 1, 3, 2])); // true
console.log(isNotOverlapArray([4, 1, 3])); // false
console.log(isNotOverlapArray([1, 2, 2])); // false
