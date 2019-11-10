function solution(s) {
  var answer = true;

  if (s.length % 2) return false;
  while (s.indexOf('()') !== -1) {
    s = s.replace('()', '');
  }

  answer = s.length == 0 ? true : false;
  return answer;
}


console.log(solution(')()('));
