function solution(s) {
  let answer = 0;

  let temp = '';
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    temp += s[i];

    while (s.includes(temp)) {

    }

    count >= ( i + 1 ) ? count : ( i + 1 );
  }

  return answer;
}

solution("aabbaccc");