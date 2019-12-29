function solution(number, k) {
  let answer = '';
  let max = 0;
  let index = -1;

  for (let i = 0; i < number.length - k; i++) {
    max = 0;
    for (let j = index + 1; j <= k + i; j++) {
      if (max < number[j]) {
        index = j;
        max = number[j];
        console.log(max);
        if (max === '9') break;
      }
    }
    answer += max;
  }

  return answer;
}


console.log(solution('1924', 2));
// console.log(solution("1231234",3))
// console.log(solution("4177252841",4))
// console.log(solution("4177252841",1))
// console.log(solution("321",1))
