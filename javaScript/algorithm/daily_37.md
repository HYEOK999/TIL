![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

문제 출처 : 프로그래머스

### 올바른 괄호

###### 문제 설명

괄호가 바르게 짝지어졌다는 것은 '(' 문자로 열렸으면 반드시 짝지어서 ')' 문자로 닫혀야 한다는 뜻입니다. 예를 들어

- ()() 또는 (())() 는 올바른 괄호입니다.
- )()( 또는 (()( 는 올바르지 않은 괄호입니다.

'(' 또는 ')' 로만 이루어진 문자열 s가 주어졌을 때, 문자열 s가 올바른 괄호이면 true를 return 하고, 올바르지 않은 괄호이면 false를 return 하는 solution 함수를 완성해 주세요.

##### 제한사항

- 문자열 s의 길이 : 100,000 이하의 자연수
- 문자열 s는 '(' 또는 ')' 로만 이루어져 있습니다.

------

##### 입출력 예

| s      | answer |
| ------ | ------ |
| ()()   | true   |
| (())() | true   |
| )()(   | false  |
| (()(   | false  |

##### 입출력 예 설명

입출력 예 #1,2,3,4
문제의 예시와 같습니다.

<br/>

#### 1차 풀이

~~~javascript
function solution(s) {
  var answer = true;

  if (s.length % 2) return false;
  while (s.indexOf('()') !== -1) {
    s = s.replace('()', '');
  }

  answer = s.length == 0 ? true : false;
  return answer;
}
~~~

TestCase는 모두 통과했지만 효율성 테스트에서 모두 떨어졌다.

아무래도 반복문을 최대한 적게돌면서 중간중간에 체크하는 과정을 추가해야만 할 것 같다.

<br/>

#### 2차 풀이

~~~javascript
function solution(s) {
  let arr = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] == '(') arr.push('(');
    else {
      if (arr.length == 0) return false;
      arr.pop();
    }
  }
  return arr.length == 0 ? true : false;
}
~~~

올바른 괄호라면 '(' 로 시작해 ')'로 끝나야 한다. 

따라서 배열을 추가하고 배열에 '(' 일경우 배열에 스택으로 추가한다.

만약 '('이 아니라면 ')'인것이다.  따라서 스택에 추가할 필요없이 스택을 제거한다.

만약 스택이 비워져있는 상태에서 ')' 을 만난다면 배열길이는 0이므로 false를 반환한다.

수가 잘 맞게 '('과 ')'을 비교했다면 반복문을 다 돌고나서 배열의 길이는 0이기 때문에 true를 반환한다.

하지만 '('이 중복으로 겹쳐서 나왔다면 분명 길이는 0이상이기 때문에 false를 반환한다.

<br/>