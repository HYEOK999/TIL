function solution(number, k) {
  let length = number.length;
  let i = 0;

  while( i < length - 1 && k > 0) {
    if(number[i] < number[i + 1]) {
      if(i != 0) {
        number = number
        number = number[:i] + number[i+1:]
        length -= 1
        k -= 1
        i -= 1
      } else {
        number = number[:i] + number[i + 1:]
        length -= 1
        k -= 1
        i = 0
      }
    } else {
      i += 1;

    }
    if (k > 0)  return number[:-k]
  }

  return number;
}

    console.log(solution('1924', 2));
    // console.log(solution("1231234",3))
    // console.log(solution("4177252841",4))
    // console.log(solution("4177252841",1))
    // console.log(solution("321",1))