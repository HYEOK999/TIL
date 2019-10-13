![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

문제 출저 : poiema 알고리즘 연습 문제

### 6. 핸드폰번호 가리기

핸드폰 요금 고지서에 표시할 전화번호는 개인정보 보호를 위해 맨 뒷자리 4자리를 제외한 나머지를 `*`으로 바꿔야 한다. 전화번호를 나타내는 문자열 str을 입력받는 hideNumbers 함수를 완성하라 예를들어 s가 ‘01033334444’면 `*******4444`를 리턴하고, ‘027778888’인 경우는 `*****8888`을 리턴한다.

```javascript
function hideNumbers(str) {
  let answer = '';
  for (let i = 0; i < str.length - 4; i++) {
    answer += '*';
  }

  for (let i = str.length - 4; i < str.length; i++) {
    answer += str[i];
  }

  console.log(answer);
  return answer;
}

console.log(hideNumbers('01033334444')); // *******4444
console.log(hideNumbers('027778888'));   // *****8888
```

<br/>

### 7. 문자열을 숫자로 바꾸기

strToInt 메소드는 문자열을 인수로 전달받는다. 전달받은 문자열 인수를 숫자로 변환한 결과를 반환하도록 strToInt를 작성하라.

예를 들어 str이 ‘1234’이면 1234를 반환하고, ‘-1234’이면 -1234를 반환한다. str은 부호(+,-)와 숫자로만 구성되어 있고, 잘못된 값이 입력되는 경우는 없다.

```javascript
function strToInt(str) {
	return +str;
}

console.log(strToInt('1234'));  // 1234
console.log(strToInt('-1234')); // -1234
```

<br/>

### 8. 수박수박수박수박수박수?

waterMelon 함수는 정수를 인수로 전달받는다. 길이가 n이고, 수박수박수…와 같은 패턴을 유지하는 문자열을 리턴하도록 함수를 완성하라.

예를 들어 n이 4이면 ‘수박수박’을 리턴하고 3이라면 ‘수박수’를 리턴한다.

```javascript
function waterMelon(n) {
  let answer = '';

  for (let i = 0; i < n; i++) {
    if (i % 2 == 0) {
      answer += '수';
    } else {
      answer += '박';
    }
  }
  return answer;
}

// console.log(`n이 3인 경우: ${waterMelon(3)}`);
// console.log(`n이 4인 경우: ${waterMelon(4)}`);
console.log(`n이 3인 경우: ${waterMelon(3)}`);
console.log(`n이 4인 경우: ${waterMelon(4)}`);
```

<br/>

### 9. 정수제곱근 판별하기

nextSqaure함수는 정수를 인수로 전달받는다. n이 임의의 정수 x의 제곱이라면 x+1의 제곱을 리턴하고, n이 임의의 정수 x의 제곱이 아니라면 ‘no’를 리턴하는 함수를 작성하라.

예를 들어 n이 121이라면 이는 정수 11의 제곱이므로 (11+1)의 제곱인 144를 리턴하고, 3이라면 ‘no’을 리턴한다.

```javascript
function nextSqaure(n) {
  let answer = 0;
  if (n === undefined) return 'no';

  for (let i = 0; i <= n; i++) {
    if (i ** 2 === n) {
      answer = (i + 1) ** 2;
      break;
    } else {
      answer = 'no';
    }
  }
  return answer;
}

console.log(nextSqaure());    // no
console.log(nextSqaure(0));   // 1
console.log(nextSqaure(1));   // 4
console.log(nextSqaure(2));   // no
console.log(nextSqaure(3));   // no
console.log(nextSqaure(121)); // 144
console.log(nextSqaure(165)); // no
console.log(nextSqaure(400)); // 441
```

<br/>

### 10. 배열의 최대/최소값 구하기 *

배열의 요소 중 최대값/최소값을 반환하는 함수를 완성하라.

```javascript
function getMaxValueFromArray(array) {
  return Math.max.apply(0, array);
}
console.log(getMaxValueFromArray([3, 6, -2, -5, 7, 3])); // 7

function getMinValueFromArray(array) {
  return Math.min.apply(0, array);
}
console.log(getMinValueFromArray([3, 6, -2, -5, 7, 3])); // -5
```

<br/>