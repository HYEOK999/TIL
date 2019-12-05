![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

문제 출처 : 프로그래머스

### 문자열 다루기 기본

###### 문제 설명

문자열 s의 길이가 4 혹은 6이고, 숫자로만 구성돼있는지 확인해주는 함수, solution을 완성하세요. 예를 들어 s가 a234이면 False를 리턴하고 1234라면 True를 리턴하면 됩니다.

##### 제한 사항

- `s`는 길이 1 이상, 길이 8 이하인 문자열입니다.

##### 입출력 예

| s    | return |
| ---- | ------ |
| a234 | false  |
| 1234 | true   |

--------

~~~javascript
function solution(s) {
    return (s.length == 4 || s.length == 6) ? /^\d+$/.test(s) : false;
}
~~~

