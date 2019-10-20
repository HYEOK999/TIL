// 배열의 요소 중에 10보다 큰 요소가 1개 이상 존재하는지 확인
let results = [5, 10, 15]

let result = results.some(function(i){
  return i > 10;
});

console.log(result);
