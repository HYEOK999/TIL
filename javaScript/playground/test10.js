function solution(n) {
  let answer = '';
  if (n % 3 == 0) {
    answer += String(Math.floor(n / 3) - 1) + String(4);
    answer = Number(answer);
  } else {
    answer += String(Math.floor(n / 3)) + String(n % 3);
    answer = Number(answer);
  }

  return String(answer);
}

solution(11); // 42
