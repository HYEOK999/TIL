function transMap(n, num) {
  let res = 0;
  let arr = '';
  for (let i = 0; i < n; i++) {
    res = num % 2;
    num = Math.floor((num /= 2));

    if (res) arr += '#';
    else arr += ' ';
  }
  return arr.split('').reverse().join('');
}

function solution(n, arr1, arr2) {
  const completedMap = [];
  let answer = '';

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      answer += transMap(n, arr1[i])[j] === '#' || transMap(n, arr2[i])[j] === '#' ? '#' : ' ';
    }
    completedMap.push(answer);
    answer = '';
  }
  return completedMap;
}

solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28]);
