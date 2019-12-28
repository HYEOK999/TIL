
function solution(number, k) {
  if(number.charAt(0) == '0') return "0"
  let num = number.split('');
  let stCount = 0;
  let count = number.length - k;
  let aCount = 0;
  let subNum = [];
  let answer = '';

  for (let i = 0; i < count; i++) {
    subNum = num.slice(stCount, -count + 1 + i);
    console.log(subNum);
    console.log(num);


    console.log(subNum.indexOf(`${Math.max(...subNum)}`));
    if (subNum.indexOf(`${Math.max(...subNum)}`) === -1) {
      subNum = num.slice(-stCount);
      console.log(subNum);
      answer += Math.max(...subNum);
      console.log(answer);

      break;
    }
    answer += Math.max(...subNum);
    console.log(answer);

    stCount += subNum.indexOf(`${Math.max(...subNum)}`) + 1;
    console.log(stCount);
    aCount += subNum.indexOf(`${Math.max(...subNum)}`);
    console.log(aCount);

    if (aCount >= k) {
      subNum = `${num.slice(-count + 1 + i).join('')}`;
      console.log(subNum);
      answer += subNum;
      break;
    }
  }

  return answer;
}

console.log(solution("1924", 2))
// console.log(solution("1231234",3))
// console.log(solution("4177252841",4))
// console.log(solution("4177252841",1))
// console.log(solution("321",1))
