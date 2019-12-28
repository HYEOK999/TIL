function solution(number, k) {
  if (number.charAt(0) == '0') return '0';
  const num = number.split('');
  let answer = '';
  let max = 0;
  let index = 0;
  let j = k + 1;
  let remainK = k;

  for (let i = 0; i < number.length - k; i++) {
    max = num.slice(index, j);
    answer += Math.max(...max);
    index += max.join('').indexOf(Math.max(...max)) + 1;
    remainK -= max.join('').indexOf(Math.max(...max));
    if (remainK <= 0) {
      answer += num.slice(index).join('');
      break;
    }
    j += 1;
  }
  return answer;
}

const aaa = `${1234567890 * 100000}`;
console.log(solution(aaa, 999999));
