![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

### 직사각형 별찍기

###### 문제 설명

이 문제에는 표준 입력으로 두 개의 정수 n과 m이 주어집니다.
별(*) 문자를 이용해 가로의 길이가 n, 세로의 길이가 m인 직사각형 형태를 출력해보세요.

------

##### 제한 조건

- n과 m은 각각 1000 이하인 자연수입니다.

------

##### 예시

입력

```
5 3
```

출력

```
*****
*****
*****
```

-----------

```javascript
process.stdin.setEncoding('utf8');
process.stdin.on('data', data => {
    const n = data.split(" ");
    const row = '*'.repeat(Number(n[0]));
    let answer = '';
    
    for(let i = 0; i < Number(n[1]); i++){
          answer += row;
          answer += '\n';
    }
    
    console.log(answer);
});
```

<br/>

<br/>

<br/>

### 자연수 뒤집어 배열로 만들기

###### 문제 설명

자연수 n을 뒤집어 각 자리 숫자를 원소로 가지는 배열 형태로 리턴해주세요. 예를들어 n이 12345이면 [5,4,3,2,1]을 리턴합니다.

##### 제한 조건

- n은 10,000,000,000이하인 자연수입니다.

##### 입출력 예

| n     | return      |
| ----- | ----------- |
| 12345 | [5,4,3,2,1] |

--------------

```javascript
function solution(n) {
    return String(n).split('').reverse().map((item) => +item);
}
```

