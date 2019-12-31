![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

### 큰 수 만들기

###### 문제 설명

어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자를 구하려 합니다.

예를 들어, 숫자 1924에서 수 두 개를 제거하면 [19, 12, 14, 92, 94, 24] 를 만들 수 있습니다. 이 중 가장 큰 숫자는 94 입니다.

문자열 형식으로 숫자 number와 제거할 수의 개수 k가 solution 함수의 매개변수로 주어집니다. number에서 k 개의 수를 제거했을 때 만들 수 있는 수 중 가장 큰 숫자를 문자열 형태로 return 하도록 solution 함수를 완성하세요.

##### 제한 조건

- number는 1자리 이상, 1,000,000자리 이하인 숫자입니다.
- k는 1 이상 `number의 자릿수` 미만인 자연수입니다.

##### 입출력 예

| number     | k    | return |
| ---------- | ---- | ------ |
| 1924       | 2    | 94     |
| 1231234    | 3    | 3234   |
| 4177252841 | 4    | 775841 |

--------

해당 문제는 탐욕법을 이용해서 해결해야되는 문제인데 너무 어렵게 풀었다.

이 문제의 주요 풀이는 다음과 같다.

예를들어 (1231237 , 3) 이라고 가정했을 경우, 뒤에서부터 3번째 자리의 숫자(237)을 제외하고 찾아야한다.

이유는, 앞에서부터 찾는 숫자들 중 제일 큰것을 골라야 하기 때문이다. 

그러니까 제일 마지막에 큰 숫자를 찾을 경우 7 - 3 인 4자리의 숫자를 만들어야하는데 그러지 못할 수도 있으니 나머지를 정해두고 찾는 방식이다.  

따라서, 1231을 중 제일 큰것을 찾는다. 

여기서는 3이 제일 크므로 3을 특정 변수에 추가 시켜준다. 

여기서 3의 위치를 계산을 하고 3을 찾기 까지의 카운트나 위치주소 등을 계산해서 몇개를 제거했는지를 계산하다.

그 다음부터 1을 찾는데 현재 4자리중 3을 찾았으니 앞으로 3자리를 채워야하고 서브로 2자리는 남겨놓아야만 한다. 따라서 뒤부터 2번째 자리의 숫자(37)을 제외하고 찾는다.

그러면 12 중 큰 것을 찾으면 되므로 2를 변수에 추가한다. (현재 : 32)

제거 카운트가 입력한 카운트와 같거나 클 경우 나머지를 전부 답 변수에 추가핸준다. (정답 : 3237)

이러한 방식으로 문제를 해결해보도록 한다.

<br/>

#### 1회차  

처음 풀이 방법은 상당히 요란하다. 

나는 주로 `indexOf` , `slice`, `Math.max` 를 이용한 방법을 했는데 해당 문제는 주어진 숫자 , 자리수를 계산해야되므로 큰 수를 찾을 때 앞에서 부터 찾는다.

제일 큰 숫자를 찾을 경우 제일 큰 숫자의 인덱스 + 1를 특정 변수에 저장을 하고 해당 변수부터 찾은 위치까지의 인덱스 을 k와 비교하면서 k보다 클 경우에 나머지 숫자들을 전부 추가하고 for문을 빠져나와 리턴한다.

```javascript
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
    
    if (subNum.indexOf(`${Math.max(...subNum)}`) === -1) {
      subNum = num.slice(-stCount);
      answer += Math.max(...subNum);
      break;
    }
    answer += Math.max(...subNum);
    stCount += subNum.indexOf(`${Math.max(...subNum)}`) + 1;
    aCount += subNum.indexOf(`${Math.max(...subNum)}`);

    if (aCount >= k) {
      subNum = `${num.slice(-count + 1 + i).join('')}`;
      answer += subNum;
      break;
    }
  }

  return answer;
}

console.log(solution("1924", 2))
```

해당 문제의 결과 : 10번, 12번 에러 

- 테스트 케이스 전부 통과
- 10번 , 12번 실패

<br/>

#### 2회차

1회차를 너무 요란하게 푼 것 같아서 조금 수정해보았다. 전반적인 풀이 방식은 같으나

뒤에서부터 slice를 계산하는게 아니라 앞에서 부터 더해주면서 계산을 하였고 나머지 카운트를 제거하면서 계산하여 나머지 카운트가 결국 0일 때 전부더 정답에 추가하는 방식을 하였다.

```javascript
function solution(number, k) {
  if (number.charAt(0) == '0') return '0';
  const num = number.split('');
  let answer = '';
  let max = 0;
  let index = 0;
  let j = k + 1;
  let remainK = k;

  for (let i = 0; i < number.length - k; i++) {
    max = num.slice(index, j);
    console.log(max.sort());
    answer += (max.sort())[max.length - 1];
    index += max.join('').indexOf(Math.max(...max)) + 1;
    remainK -= max.join('').indexOf(Math.max(...max));
    if (remainK <= 0) {
      answer += num.slice(index).join('');
      break;
    }
    j += 1;
  }
  return answer;
}

console.log(solution("1924", 2))
```

해당 문제의 결과 :  12번은 해결되었으나 10번이 게속 실패가 뜸.

- 테스트 케이스 전부 통과
- 10번 실패

<br/>

#### 3회차

빌트인 메소드들에 의존성이 심한 것 같아서 이번에는 그냥 이중 `for문` 을 이용하였다.

풀이 방식은 전반적으로 같으나 Math.max 대신에 for문을 이용하여 가장 큰 크기의 숫자를 찾는 방식을 이용하였다.

```javascript
function solution(number, k) {
  let answer = '';
  let max = 0;
  let index = -1;

  for (let i = 0; i < number.length - k; i++) {
    max = 0;
    for (let j = index + 1; j <= k + i; j++) {
      if (max < number[j]) {
        index = j;
        max = number[j];
      }
    }
    answer += max;
  }

  return answer;
}

console.log(solution('1924', 2));
// console.log(solution("1231234",3))
// console.log(solution("4177252841",4))
// console.log(solution("4177252841",1))
// console.log(solution("321",1))
```

해당 문제의 결과 : 

- 테스트 케이스 전부 통과
- 10번 시간초과

<br/>

#### 4회차 - 정답

연속되는 실패로 지쳐서 다른 사람의 코드나 해결 방법들을 찾아보았는데 타 언어들은 스트링빌더를 이용해서 해결했지만,

자바스크립트는 스트링빌더가 따로 존재하지 않기 때문에 구현을 해주어야 했다. 

스트링빌더는 제쳐두고 내부 for문을 굳이 다돌아야 할까? 라는 생각이 문뜩 들었는데 생각해보니 내부 for문에서 가장 큰수(9)를 찾을 경우 더 반복을 돌아봤자 의미가 없겠다는 생각이 들어 추가해보았는데 무사히 통과되었다.

```javascript
function solution(number, k) {
  let answer = '';
  let max = 0;
  let index = -1;

  for (let i = 0; i < number.length - k; i++) {
    max = 0;
    for (let j = index + 1; j <= k + i; j++) {
      if (max < number[j]) {
        index = j;
        max = number[j];
        if (max === '9') break;  // 추가
      }
    }
    answer += max;
  }

  return answer;
}

console.log(solution('1924', 2));
// console.log(solution("1231234",3))
// console.log(solution("4177252841",4))
// console.log(solution("4177252841",1))
// console.log(solution("321",1))
```