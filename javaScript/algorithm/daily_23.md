![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

문제 출처 : 프로그래머스

### 문자열 내 마음대로 정렬하기

###### 문제 설명

문자열로 구성된 리스트 strings와, 정수 n이 주어졌을 때, 각 문자열의 인덱스 n번째 글자를 기준으로 오름차순 정렬하려 합니다. 예를 들어 strings가 [sun, bed, car]이고 n이 1이면 각 단어의 인덱스 1의 문자 u, e, a로 strings를 정렬합니다.

##### 제한 조건

- strings는 길이 1 이상, 50이하인 배열입니다.
- strings의 원소는 소문자 알파벳으로 이루어져 있습니다.
- strings의 원소는 길이 1 이상, 100이하인 문자열입니다.
- 모든 strings의 원소의 길이는 n보다 큽니다.
- 인덱스 1의 문자가 같은 문자열이 여럿 일 경우, 사전순으로 앞선 문자열이 앞쪽에 위치합니다.

##### 입출력 예

| strings           | n    | return            |
| ----------------- | ---- | ----------------- |
| [sun, bed, car]   | 1    | [car, bed, sun]   |
| [abce, abcd, cdx] | 2    | [abcd, abce, cdx] |

##### 입출력 예 설명

**입출력 예 1**
sun, bed, car의 1번째 인덱스 값은 각각 u, e, a 입니다. 이를 기준으로 strings를 정렬하면 [car, bed, sun] 입니다.

**입출력 예 2**
abce와 abcd, cdx의 2번째 인덱스 값은 c, c, x입니다. 따라서 정렬 후에는 cdx가 가장 뒤에 위치합니다. abce와 abcd는 사전순으로 정렬하면 abcd가 우선하므로, 답은 [abcd, abce, cdx] 입니다.

~~~javascript
function solution(strings, n) {
    var answer = [];
  return strings.sort((a, b) => (a[n] > b[n] ? 1 : (a[n] < b[n] ? -1 : (a > b ? 1 : -1))));
}
~~~

<br/>