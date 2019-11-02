![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

문제 출처 : 프로그래머스

### 소수 찾기

###### 문제 설명

1부터 입력받은 숫자 n 사이에 있는 소수의 개수를 반환하는 함수, solution을 만들어 보세요.

소수는 1과 자기 자신으로만 나누어지는 수를 의미합니다.
(1은 소수가 아닙니다.)

##### 제한 조건

- n은 2이상 1000000이하의 자연수입니다.

##### 입출력 예

| n    | result |
| ---- | ------ |
| 10   | 4      |
| 5    | 3      |

##### 입출력 예 설명

입출력 예 #1
1부터 10 사이의 소수는 [2,3,5,7] 4개가 존재하므로 4를 반환

입출력 예 #2
1부터 5 사이의 소수는 [2,3,5] 3개가 존재하므로 3를 반환

<br/>

#### O n제곱 형태의 기본적인 풀이

각 수마다 for문을 돌아가면서 소수를 찾는 방법 for문 내부에 또 for문이 돌기때문에 시간이 오래걸린다.

테스트 케이스가 커지면 커질수록 시간이 오래걸려서 테스트 10 ~13번까지 통과하지 못했다.


~~~javascript
function solution(n) {
  let result = 0;
  let count = 0;
  for (let i = 2; i <= n; i++) {
    count = 0;
    for (let j = 1; j <= i; j++) {
      if (i % j == 0) {
        count++;
      }
    }
    if (count == 2) {
      result++;
    }
  }

  return result;
}
~~~

![소수찾기](https://user-images.githubusercontent.com/31315644/68067317-6269ef00-fd88-11e9-8444-79a8cc6292f7.jpeg)

<br/>

#### 에라토스테네스의 체 

소수를 더 쉽게 찾는 방법이 존재하길래 구글 검색을 통해 알아낸 에라토스테네스의 체 공식이다.

여기서 주워진 문제는 2부터 n만큼까지의 소수를 찾는 문제이다.

n은 결국 어떤 수의 제곱보다 낮은 숫자들만큼만 길이를 재면 된다. 

예를들면 120은 11(121)의 제곱보다 1낮기 떄문에 11로 가정한다. 

120까지 1번이라도 같은 배수해서 나온 수가 있다면 그 수는 소수가 아니기 때문에 11까지 검사하면 된다.

풀이 방법은 다음과 같다.

1. 받아온 n을 제곱근으로 반환한다.(Math.sqrt) 그리고 소수가 나올수도 있기 때문에 올림한다.(Math.ceil)
2. n만큼의 배열을 만들어낸다. 여기서 모두 false 혹은 true로 채워버린다. (Array(n).fill(false))
3. 미리 구해둔 n의 제곱근만큼 반복을 돌린다. 시작은 2이다(1은 소수가 아니기 떄문)
4. 조건이 true라면 소수가 아니다. 따라서 해당 배열이 true일 경우 continue로 다음 반복으로 돌아가 소수인지를 찾는다.
5. 조건이 false라면 소수다. 소수의 배수만큼 배열 내부에 접근해 반복을 사용하여 배수의 인덱스 부분들을 전부 true로 바꿔준다.
6. 모든 반복이 끝나고 마지막에 2부터 시작해서 n까지 배열에 false값만을 찾는다. false의 갯수당 카운터를 1개씩 올리면 소수의 갯수를 판단할 수 있다.

![에라토스테네스의 체](https://upload.wikimedia.org/wikipedia/commons/b/b9/Sieve_of_Eratosthenes_animation.gif)

~~~javascript
function solution(n) {
let rootSqrt = Math.ceil(Math.sqrt(n));
let arr = Array(n).fill(false);
let answer = 0;
    
    for(let i=2; i <= rootSqrt; i++) {
        if (arr[i]) {
            continue;
        }
        for(let j = i + i; j <= n; j += i) {
            arr[j] = true;
        }
    }

    for(let i=2; i <= n ; i++) {
        if(!arr[i]) answer++;
    }

  return answer
}
~~~


![소수찾기2](https://user-images.githubusercontent.com/31315644/68067318-6269ef00-fd88-11e9-8878-b3db4314e1b9.jpeg)

