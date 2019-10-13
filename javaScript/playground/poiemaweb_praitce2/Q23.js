/*
23. 배열에서 특정 값만을 구하기

인수로 주어진 배열 arr에서 짝수이고 3보다 큰 수만을 구하여 이를 배열로 반환하는 함수를 작성하라
*/
function getArray(arr) {
  const numArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 == 0 && arr[i] > 3) {
      numArray.push(arr[i]);
    }
  }

  return numArray;
}

console.log(getArray([1, 2, 3, 4, 5, 6])); // [ 4, 6 ]
