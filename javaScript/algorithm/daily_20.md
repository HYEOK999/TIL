![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

문제 출처 : 프로그래머스

### 기능 개발

###### 문제 설명

프로그래머스 팀에서는 기능 개선 작업을 수행 중입니다. 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다.

또, 각 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고, 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.

먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 각 작업의 개발 속도가 적힌 정수 배열 speeds가 주어질 때 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.

##### 제한 사항

- 작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
- 작업 진도는 100 미만의 자연수입니다.
- 작업 속도는 100 이하의 자연수입니다.
- 배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다. 예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤에 이루어집니다.

##### 입출력 예

| progresses | speeds   | return |
| ---------- | -------- | ------ |
| [93,30,55] | [1,30,5] | [2,1]  |

##### 입출력 예 설명

첫 번째 기능은 93% 완료되어 있고 하루에 1%씩 작업이 가능하므로 7일간 작업 후 배포가 가능합니다.
두 번째 기능은 30%가 완료되어 있고 하루에 30%씩 작업이 가능하므로 3일간 작업 후 배포가 가능합니다. 하지만 이전 첫 번째 기능이 아직 완성된 상태가 아니기 때문에 첫 번째 기능이 배포되는 7일째 배포됩니다.
세 번째 기능은 55%가 완료되어 있고 하루에 5%씩 작업이 가능하므로 9일간 작업 후 배포가 가능합니다.

따라서 7일째에 2개의 기능, 9일째에 1개의 기능이 배포됩니다.

~~~javascript
function solution(progresses, speeds) {
  var answer = [];
  let booleanValue;
  let count;

  while (progresses.length) {
    booleanValue = false;
    count = 0;
    for (let i = 0; i < progresses.length; i++) {
      progresses[i] += speeds[i];
    }

    while (progresses.length != 0 && progresses[0] >= 100) {
      booleanValue = true;
      count++;
      progresses.shift();
      speeds.shift();
    }
    if (booleanValue == true) {
      answer.push(count);
    }
  }

  return answer;
}
~~~

### 도저히 알고리즘이 떠 오르질 않아서 타 블로그의 내용을 보고 이해했다. 다음에 다시 도전 할 것.

해당 문제는 배열을 맨 앞부터 잘라내는 방식 큐 ( FIFO )으로 해결한다.

변수

- 기능치가 100이 될 경우 올라갈 배포 count

- count값이 들어갔는지 체크할 booleanValue

1. 현재 기능 정도와 스피드를 각각 더한다.
2. 동시에 기능 배열의 길이가 0이 아니고 0번쨰 기능이 100이 되어야만 다음 기능들도 배포가 가능하므로 0번째 기능이 100이상 인지 체크한다.
3. 100이상이라면 count수를 올리고  count값이 올라갔으므로 booleanValue를 바꿔준다.
4. 기능과 스피드 정도의 배열을 각각 앞부터 잘라낸다.
5. 만약 booleanValue가 참일경우 answer에 해당 카운드값을 넣는다.

<br/>