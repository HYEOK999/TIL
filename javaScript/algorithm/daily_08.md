![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

문제 출저 : Poiema

### 1. 변수 x가 10보다 크고 20보다 작을 때 변수 x를 출력하는 조건식을 완성하라

```javascript
function problem01() {
  console.log('1번 문제입니다.');
  const i = 15;

  if (i > 10 && i < 20) {
    console.log(i);
  }
  console.log('-------------------');
  return i;
}

problem01();
```

<br/>
### 2. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.

![2번](https://user-images.githubusercontent.com/31315644/66459367-db3e9980-eaaf-11e9-9478-369e8eba6764.jpeg)

```javascript
function problem02() {
  console.log('2번 문제입니다.');
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      console.log(i);
    }
  }
  console.log('-------------------');
}

problem02();
```
<br/>
### 3. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 문자열로 출력하시오.

![3번](https://user-images.githubusercontent.com/31315644/66459386-e1cd1100-eaaf-11e9-97ea-1fdae9656e77.jpeg)

```javascript
function problem03() {
  console.log('3번 문제입니다.');
  let strNum = [];
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      strNum += i;
    }
  }
  console.log(strNum);
  console.log('-------------------');
}

problem03();
```
<br/>

### 4. for문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰수부터 출력하시오.

![4번](https://user-images.githubusercontent.com/31315644/66459373-dda0f380-eaaf-11e9-9cbf-bb23d3b0a914.jpeg)

```javascript
function problem04() {
  console.log('4번 문제입니다.');
  for (let i = 10; i > 0; i--) {
    if (i % 2 !== 0) {
      console.log(i);
    }
  }
  console.log('-------------------');
}

problem04();
```
<br/>

### 5. while문을 사용하여 0 부터 10 미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.

![5번](https://user-images.githubusercontent.com/31315644/66459402-e85b8880-eaaf-11e9-9eb6-9dd43ab3b9c8.jpeg)

```javascript
function problem05() {
  console.log('5번 문제입니다.');
  let i = 0;

  while (i < 10) {
    if (i % 2 === 0) {
      console.log(i);
    }
    i++;
  }
  console.log('-------------------');
}

problem05();
```
<br/>

### 6. while문을 사용하여 0 부터 10 미만의 정수 중에서 홀수만을 큰수부터 출력하시오.

![6번](https://user-images.githubusercontent.com/31315644/66459419-ed203c80-eaaf-11e9-9bd1-38cc8c98448e.jpeg)

```javascript
function problem06() {
  console.log('6번 문제입니다.');
  let i = 10;

  while (i <= 10 && i > 0) {
    if (i % 2 !== 0) {
      console.log(i);
    }
    i--;
  }
  console.log('-------------------');
}

problem06();
```
<br/>

### 7. for 문을 사용하여 0부터 10미만의 정수의 합을 출력하시오. (결과 : 45)

```javascript
function problem07() {
  console.log('7번 문제입니다.');
  let sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += i;
  }

  console.log(sum);
  console.log('-------------------');
}

problem07();
```
<br/>

### 8. 1부터 20 미만의 정수 중에서 2 또는 3의 배수가 아닌 수의 총합을 구하시오. (결과 : 73)

```javascript
function problem08() {
  console.log('8번 문제입니다.');
  let sum = 0;

  for (let i = 1; i < 20; i++) {
    if (i % 2 !== 0 && i % 3 !== 0) {
      sum += i;
    }
  }

  console.log(sum);
  console.log('-------------------');
}

problem08();
```
<br/>
### 9. 1부터 20 미만의 정수 중에서 2 또는 3의 배수인 수의 총합을 구하시오. (결과 : 117)

```javascript
function problem09() {
  console.log('9번 문제입니다.');
  let sum = 0;

  for (let i = 1; i < 20; i++) {
    if (i % 2 === 0 || i % 3 === 0) {
      sum += i;
    }
  }

  console.log(sum);
  console.log('-------------------');
}

problem09();
```
<br/>
### 10. 두 개의 주사위를 던졌을 때, 눈의 합이 6이 되는 모든 경우의 수를 출력하시오.

![10번](https://user-images.githubusercontent.com/31315644/66459438-f6a9a480-eaaf-11e9-8f22-654703b26ed3.jpeg)

```javascript
function problem10() {
  console.log('10번 문제입니다.');

  for (let i = 1; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if ((i + j) === 6) {
        console.log(`[ ${i}, ${j} ]`);
      }
    }
  }

  console.log('-------------------');
}

problem10();
```
<br/>

### 11. 삼각형 출력하기 - pattern 1

다음을 참고하여 *(별)로 높이가 5인(var line = 5) 삼각형을 문자열로 완성하라. 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.

![11번](https://user-images.githubusercontent.com/31315644/66459440-f7423b00-eaaf-11e9-9988-b205c77b97c7.jpeg)

```javascript
function problem11() {
  console.log('11번 문제입니다.');
  const line = 5;
  let star = '';

  for (let i = 0; i < line; i++) {
    for (let j = 0; j <= i; j++) {
      star += '*';
    }

    // 다른 방법
    // for (let j = 0; j <= line; j++) {
    //   if (j <= i) {
    //     star += '*';
    //   }
    // }

    star += '\n';
  }

  console.log(star);
  console.log('-------------------');
}

problem11();
```
<br/>

### 12. 삼각형 출력하기 - pattern 2

다음을 참고하여 *(별)로 트리를 문자열로 완성하라. 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.

![12번](https://user-images.githubusercontent.com/31315644/66459439-f6a9a480-eaaf-11e9-8347-9516bef3b7bb.jpeg)

```javascript
function problem12() {
  console.log('12번 문제입니다.');
  const line = 5;
  let star = '';

  for (let i = 0; i < line; i++) {
    // for (let x = 0; x <= i; x++) {
    //   star += ' ';
    // }
    // for (let j = i; j < line; j++) {
    //   star += '*';
    // }
    // star += '\n';

    // 다른방법
    for (let x = 0; x < line; x++) {
      if (x < i) {
        star += ' ';
      }
    }
    for (let j = 0; j < line; j++) {
      if (j >= i) {
        star += '*';
      }
    }
    star += '\n';
  }

  console.log(star);
  console.log('-------------------');
}

problem12();
```
<br/>

### 13. 삼각형 출력하기 - pattern 3

다음을 참고하여 *(별)로 트리를 문자열로 완성하라. 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.

![13번](https://user-images.githubusercontent.com/31315644/66459436-f6a9a480-eaaf-11e9-9336-86b1dafea176.jpeg)

```javascript
function problem13() {
  console.log('13번 문제입니다.');
  const line = 5;
  let star = '';

  for (let i = line; i > 0; i--) {
    for (let j = 1; j <= i; j++) {
      star += '*';
    }
    star += '\n';
  }

  console.log(star);
  console.log('-------------------');
}


problem13();
```
<br/>
### 14. 삼각형 출력하기 - pattern 4

다음을 참고하여 *(별)로 트리를 문자열로 완성하라. 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.

![14번](https://user-images.githubusercontent.com/31315644/66459437-f6a9a480-eaaf-11e9-88ae-4961ab37430d.jpeg)

```javascript
function problem14() {
  console.log('14번 문제입니다.');
  const line = 5;
  let star = '';
  for (let i = line; i > 0; i--) {
    for (let j = i - 1; j > 0; j--) {
      star += ' ';
    }
    for (let k = i - 1; k < line; k++) {
      star += '*';
    }
    star += '\n';
  }

  console.log(star);
  console.log('-------------------');
}

problem14();
```
<br/>
### 15. 정삼각형 출력하기

![15번](https://user-images.githubusercontent.com/31315644/66459434-f6110e00-eaaf-11e9-9698-918e507f369e.jpeg)

```javascript
function problem15() {
  console.log('15번 문제입니다.');
  const line = 5;
  let star = '';

  for (let i = 0; i < line; i++) {
    for (let j = 4; j > i; j--) {
      star += ' ';
    }
    for (let k = 0; k < (i * 2) + 1; k++) {
      star += '*';
    }
    star += '\n';
  }
  console.log(star);
  console.log('-------------------');
}

problem15();
```

<br/>

### 16. 역정삼각형 출력하기

![16번](https://user-images.githubusercontent.com/31315644/66459435-f6110e00-eaaf-11e9-8746-0d76c27dfe23.jpeg)

```javascript
function problem16() {
  console.log('16번 문제입니다.');
  const line = 5;
  let star = '';
  for (let i = line; i > 0; i--) {
    for (let j = line; j > i; j--) {
      star += ' ';
    }
    for (let k = 0; k < (i * 2) - 1; k++) {
      star += '*';
    }
    star += '\n';
  }

  console.log(star);
  console.log('-------------------');
}
problem16();
```