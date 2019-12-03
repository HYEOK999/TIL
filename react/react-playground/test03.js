function solution(s) {
  let answer = s.length;
  let a = s[0] + s[1];
  let arr = s.slice(-(s.length) + 2);
  let count = 1;
  let answerArr  = '';

  while (true) {
    count++;
    if (count > (s.length) / 2 + 1) break;

    if (arr.startsWith(a)) {
      answerArr = answerArr + count + a;
      arr = arr.slice(-(arr.length) + count);
    } else {
      a =
    }
  }

  return answer;
}

solution('ababcdcdababcdcd');
