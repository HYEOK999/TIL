![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

문제 출저 : 프로그래머스

### 2016년

#### 정답을 맞추었으나 너무 코드 가독성이 떨어짐 추후 다시 풀 것.

###### 문제 설명

2016년 1월 1일은 금요일입니다. 2016년 a월 b일은 무슨 요일일까요? 두 수 a ,b를 입력받아 2016년 a월 b일이 무슨 요일인지 리턴하는 함수, solution을 완성하세요. 요일의 이름은 일요일부터 토요일까지 각각 `SUN,MON,TUE,WED,THU,FRI,SAT`

입니다. 예를 들어 a=5, b=24라면 5월 24일은 화요일이므로 문자열 TUE를 반환하세요.

##### 제한 조건

- 2016년은 윤년입니다.
- 2016년 a월 b일은 실제로 있는 날입니다. (13월 26일이나 2월 45일같은 날짜는 주어지지 않습니다)

#### 입출력 예



| a    | b    | result |
| ---- | ---- | ------ |
| 5    | 24   |        |

~~~~javascript
function solution(a, b) {
    var answer = '';
    var dayOfTheWeek = [ 'FRI','SAT','SUN', 'MON', 'TUE', 'WED', 'THU'];
    var j = 0;

    for(var month=1;month<=a;month++){
    switch(month){
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:   
            for(var x=1;x <= 31; x++){
                if(month == a && x == b){
                    answer =  dayOfTheWeek[j];
                    break;
                }
                else{
                    j++;
                    if( j == 7){
                        j = 0;
                    }
                }       
            }
            break;
        case 4: case 6: case 9: case 11:
              for(var x=1;x <= 30; x++){
                if(month == a && x == b){
                    answer =  dayOfTheWeek[j];
                    break;
                }else {
                    j++;
                    if( j == 7){
                        j = 0;
                    }
                }       
            }
            break;
            
        default :
              for(var x=1; x <= 29; x++){
                if(month == a && x == b){
                    answer =  dayOfTheWeek[j];
                    break;
                }
                else{
                    j++;
                    if( j == 7){
                        j = 0;
                    } 
                }       
            }
            break;
        }
    }

    return answer;
}
~~~~

