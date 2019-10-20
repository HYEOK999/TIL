![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

문제 출처 : 프로그래머스

### 수박수박수박수박수박수?

###### 문제 설명

길이가 n이고, 수박수박수박수....와 같은 패턴을 유지하는 문자열을 리턴하는 함수, solution을 완성하세요. 예를들어 n이 4이면 수박수박을 리턴하고 3이라면 수박수를 리턴하면 됩니다.

##### 제한 조건

- n은 길이 10,000이하인 자연수입니다.

##### 입출력 예

| n    | return   |
| ---- | -------- |
| 3    | 수박수   |
| 4    | 수박수박 |

~~~javascript
function solution(n) {
    var answer = '';
    var su = "수";
    var bak = "박";
    var i = 0;

    for(i=1;i<=n;i++){
      if(i%2==0){
         answer = answer + bak;
      }
      else if(i%2!=0){
         answer = answer + su;
      }
    }

    return answer;
}
~~~