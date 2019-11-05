![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

문제 출처 : 프로그래머스

### 약수의 합

###### 문제 설명

정수 n을 입력받아 n의 약수를 모두 더한 값을 리턴하는 함수, solution을 완성해주세요.

##### 제한 사항

- `n`은 0 이상 3000이하인 정수입니다.

##### 입출력 예

| n    | return |
| ---- | ------ |
| 12   | 28     |
| 5    | 6      |

###### 입출력 예 설명

입출력 예 #1
12의 약수는 1, 2, 3, 4, 6, 12입니다. 이를 모두 더하면 28입니다.

입출력 예 #2
5의 약수는 1, 5입니다. 이를 모두 더하면 6입니다.

~~~javascript
function solution(n) {
    var answer = 0;
    
    for(let i = 1; i <= n; i++) {
        answer += n % i == 0 ? i : 0;
    }
    
    return answer;
}
~~~

<br/>