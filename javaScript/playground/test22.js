function solution(num) {
  let answer = 0;

  function reapeatFn(x) {
    if (!(x % 2)) {
      answer++;
      x /= 2;
    } else {
      answer++;
      x = (x * 3) + 1;
    }

    if (x == 1) return answer;

    if (answer >= 500) {
      answer = -1;
      return answer;
    }
    return reapeatFn(x);
  }

  return reapeatFn(num);
}

console.log(solution(626331));
