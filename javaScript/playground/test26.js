function GCD(a, b) {
  while (b != 0) {
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function LCM(a, b) {
  return (a * b) / GCD(a, b);
} // 두수를 곱하고 최대공약수를 빼준다.

function solution(n, m) {
  const answer = [GCD(n, m), LCM(n, m)];
  return answer;
}

console.log(solution(12, 3));
