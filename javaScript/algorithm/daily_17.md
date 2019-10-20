![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

문제 출처 : poiema 알고리즘 연습 문제



### 26. 특별한 정렬 **

n개의 정수를 가진 배열이 있다. 이 배열은 양의 정수와 음의 정수를 모두 가지고 있다. 이 배열을 좀 특별한 방법으로 정렬해야 한다. 음의 정수는 앞쪽에 내림차순으로, 양의 정수는 뒷쪽에 있어야 한다. 단, 인수로 주어진 원본 배열은 변경되지 않아야 한다.

예를 들어, [-1, 1, 3, -2, 2, 0]이 주어졌을 때, [-1, -2, 0, 1, 2, 3]를 반환한다.

```javascript
function specialSort(array) {
	return array.sort();
}

const testArray = [-1, 1, 3, -2, 2, 0];

console.log(testArray); // [ -1, 1, 3, -2, 2, 0 ]
console.log(specialSort(testArray)); // [ -1, -2, 0, 1, 2, 3 ]
```

<br/>



### 27. 요일 구하기 **

2016년 1월 1일은 금요일이다. 2016년 a월 b일은 무슨 요일일까? 두 수 a, b를 입력받아 a월 b일이 무슨 요일인지 출력하는 getDayName 함수를 완성하라.

요일의 이름은 일요일부터 토요일까지 각각 SUN, MON, TUE, WED, THU, FRI, SAT를 출력한다. 예를 들어 a=5, b=24가 입력된다면 5월 24일은 화요일이므로 TUE를 반환한다.

```javascript
function getDayName(a, b) {
  let answer = '';
  const dayOfTheWeek = ['FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU'];
  let j = 0;

  for (let month = 1; month <= a; month++) {
    switch (month) {
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        for (let x = 1; x <= 31; x++) {
          if (month == a && x == b) {
            answer = dayOfTheWeek[j];
            break;
          } else {
            j++;
            if (j == 7) {
              j = 0;
            }
          }
        }
        break;
      case 4: case 6: case 9: case 11:
        for (let x = 1; x <= 30; x++) {
          if (month == a && x == b) {
            answer = dayOfTheWeek[j];
            break;
          } else {
            j++;
            if (j == 7) {
              j = 0;
            }
          }
        }
        break;
      default:
        for (let x = 1; x <= 29; x++) {
          if (month == a && x == b) {
            answer = dayOfTheWeek[j];
            break;
          } else {
            j++;
            if (j == 7) {
              j = 0;
            }
          }
        }
        break;
    }
  }

  return answer;
}

console.log(getDayName(5, 24)); // TUE

// 다른 풀이

function getDayNameOther(a, b) {
  let month = String(a);
  let day = String(b);
  const week = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }

  let answer = week[new Date(`2016-${month}-${day}`).getDay()];

  return answer;
}


console.log(getDayNameOther(5, 24)); // TUE
console.log(getDayNameOther(1, 1)); // FRI
```

<br/>

