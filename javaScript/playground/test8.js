function solution(n) {
  var answer = '';
  do{
    if (n % 3 == 0) {
      answer += String(4);
      answer = Number(answer);
    } else {
      answer += String(n % 3);
      answer = Number(answer);
    }
    n = Math.floor((n / 3) - 1);
  }while (n == 0);

  return String(answer);
}

console.log(solution(3)); //42 , 111