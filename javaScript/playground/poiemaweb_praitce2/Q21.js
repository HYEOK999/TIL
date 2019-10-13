/*
21. 두 정수 사이의 합

adder 함수는 정수 x, y를 인수로 전달받는다. 두 수와 두 수 사이에 있는 모든 정수를 더해서 리턴하도록 함수를 완성하라.

x와 y가 같은 경우는 둘 중 아무 수나 리턴한다. x, y는 음수나 0, 양수일 수 있으며 둘의 대소 관계도 정해져 있지 않다.

예를 들어 x가 3, y가 5이면 12를 리턴한다.
*/
function adder(x, y) {
  if (x === y) return x;

  let answer = 0;

  for (let i = x; i <= y; i++) {
    answer += i;
  }

  return answer;
}

console.log(adder(3, 5)); // 12
