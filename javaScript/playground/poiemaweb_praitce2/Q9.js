/*
9. 정수제곱근 판별하기

nextSqaure함수는 정수를 인수로 전달받는다.
n이 임의의 정수 x의 제곱이라면 x+1의 제곱을 리턴하고, n이 임의의 정수 x의 제곱이 아니라면 ‘no’를 리턴하는 함수를 작성하라.
예를 들어 n이 121이라면 이는 정수 11의 제곱이므로 (11+1)의 제곱인 144를 리턴하고, 3이라면 ‘no’을 리턴한다.
*/
function nextSqaure(n) {
  let answer = 0;
  if (n === undefined) return 'no';

  for (let i = 0; i <= n; i++) {
    if (i ** 2 === n) {
      answer = (i + 1) ** 2;
      break;
    } else {
      answer = 'no';
    }
  }
  return answer;
}

console.log(nextSqaure()); // no
console.log(nextSqaure(0)); // 1
console.log(nextSqaure(1)); // 4
console.log(nextSqaure(2)); // no
console.log(nextSqaure(3)); // no
console.log(nextSqaure(121)); // 144
console.log(nextSqaure(165)); // no
console.log(nextSqaure(400)); // 441
