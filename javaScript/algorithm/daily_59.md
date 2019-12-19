![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

### 짝수와 홀수

###### 문제 설명

정수 num이 짝수일 경우 Even을 반환하고 홀수인 경우 Odd를 반환하는 함수, solution을 완성해주세요.

##### 제한 조건

- num은 int 범위의 정수입니다.
- 0은 짝수입니다.

##### 입출력 예

| num  | return |
| ---- | :----: |
| 3    |  Odd   |
| 4    |  Even  |

---------

~~~javascript
function solution(num) {
    return num % 2 ? 'Odd' : 'Even';
}
~~~

<br/>

<br/>

<br/>

-------------

### 평균 구하기

###### 문제 설명

정수를 담고 있는 배열 arr의 평균값을 return하는 함수, solution을 완성해보세요.

#### 제한사항

- arr은 길이 1 이상, 100 이하인 배열입니다.
- arr의 원소는 -10,000 이상 10,000 이하인 정수입니다.

#### 입출력 예

| arr       | return |
| --------- | :----: |
| [1,2,3,4] |  2.5   |
| [5,5]     |   5    |

------

~~~javascript
function solution(arr) {
    return (arr.reduce((sum,cur) => {
        return sum + cur
    })/arr.length);
}
~~~

<br/>

