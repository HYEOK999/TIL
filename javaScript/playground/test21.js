// function solution(s) {
//   let answer = '';

//   console.log(s.split('').sort().reverse().join(''));
//   return answer;
// }

// solution('ZbcdefgA');

// function solution(strings, n) {
//   let answer = [];


//   return strings.sort((a, b) => (a[n] > b[n] ? 1 : (a[n] < b[n] ? -1 : (a > b ? 1 : -1))));

// }

// console.log(solution(["abzcd", "cdzab", "abzfg", "abzaa", "abzbb", "bbzaa"],2));

function solution(progresses, speeds) {
  let answer = [];
  let count = 0;

  while (progresses[0]) {
    count = 0;
    for (let i = 0; i < progresses.length; i++) {
      progresses[i] = progresses[i] + speeds[i];
    }
    while (progresses[0] >= 100) {
      count++;
      progresses.shift();
    }

    answer.push(count);
  }

  return answer;
}

console.log(solution([93, 30, 55], [1, 30, 5]));
