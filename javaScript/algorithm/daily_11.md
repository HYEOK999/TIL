![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

문제 출저 : 프로그래머스

### 가운데 글자 가져오기

###### 문제 설명

단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.

###### 재한사항

- s는 길이가 1 이상, 100이하인 스트링입니다.

##### 입출력 예

| s     | return |
| ----- | ------ |
| abcde | c      |
| qwer  |        |


~~~~javascript
function solution(s) {
    var answer = '';
    
    if(s.length%2 == 1) {
        answer = s.slice(s.length/2, s.length/2+1);
    } else{
        answer = s.slice(s.length/2-1, s.length/2+1);
    }
	console.log(answer);
    return answer;
}
~~~~

