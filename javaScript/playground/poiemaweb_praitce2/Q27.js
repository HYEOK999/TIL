/*
27. 요일 구하기 **

2016년 1월 1일은 금요일이다. 2016년 a월 b일은 무슨 요일일까? 두 수 a, b를 입력받아 a월 b일이 무슨 요일인지 출력하는 getDayName 함수를 완성하라.

요일의 이름은 일요일부터 토요일까지 각각 SUN, MON, TUE, WED, THU, FRI, SAT를 출력한다.
예를 들어 a=5, b=24가 입력된다면 5월 24일은 화요일이므로 TUE를 반환한다.
*/
function getDayName(a, b) {
  let answer = '';
  const DAY_OF_THE_WEEK = ['FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU'];
  let j = 0;

  function forMun(month, day) {
    for (let x = 1; x <= day; x++) {
      if (month == a && x == b) {
        answer = DAY_OF_THE_WEEK[j];
        break;
      } else {
        j++;
        if (j == 7) {
          j = 0;
        }
      }
    }
  }

  for (let month = 1; month <= a; month++) {
    switch (month) {
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        forMun(month, 31);
        break;
      case 4: case 6: case 9: case 11:
        forMun(month, 30);
        break;
      default:
        forMun(month, 29);
        break;
    }
  }

  return answer;
}

console.log(getDayName(5, 24)); // TUE
console.log(getDayName(1, 9)); // SAT

// 다른 풀이

function getDayNameOther(a, b) {
  let month = String(a);
  let day = String(b);
  const WEEK = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }

  const ANSWER = WEEK[new Date(`2016-${month}-${day}`).getDay()];

  return ANSWER;
}


console.log(getDayNameOther(5, 24)); // TUE
console.log(getDayNameOther(1, 1)); // FRI
