function solution(n) {
  let answer = '';
  let temp = 0;

  while (n > 0) {
    temp = n % 3;
    n = Math.floor(n / 3);
    if (temp == 0) {
      temp = 4;
      n--;
    }
    answer += temp;
  }

  answer = answer.split('').reverse().join('');

  return answer;
}


solution(3);
