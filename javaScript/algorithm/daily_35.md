![quiz-2174368_1280](https://user-images.githubusercontent.com/31315644/68214647-3026ee80-0021-11ea-8e28-41a3aa5de18a.png)

------

문제 출처 : poiema

### Stop Watch

![img](https://poiemaweb.com/assets/fs-images/exercise/stop-watch.gif)

- 요구 사항 : 버튼을 처음 클릭하면 스톱워치가 시작하고 버튼을 다시 클릭하면 일시 정지와 시작을 반복한다.


<br/>

~~~html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Stop watch</title>
  <style>
    @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro');

    .stop-watch {
      font-family: 'Source Code Pro', monospace;
      text-align: center;
      font-size: 3em;
      padding: 30px;
    }

    .control {
      width: 300px;
      padding: 5px;
      margin-top: 15px;
      font-size: 36px;
      font-weight: bold;
      border: 2px solid #f44336;
      border-radius: 4px;
      cursor: pointer;
      outline: none;
    }

    .control:hover {
      background: #f44336;
      color: aliceblue;
    }
  </style>
  <title>Stop watch</title>
</head>
<body>
  <div class="stop-watch">
    <div class="display">00:00:00</div>
    <button class="control">Start</button>
  </div>
  <script>
    // 버튼을 처음 클릭하면 스톱워치가 시작하고 버튼을 다시 클릭하면 일시 정지와 시작을 반복한다.
    const $control = document.querySelector('.control');
    const $display = document.querySelector('.display');
    let timer = 0;
    let btn = false;
    let hour = '00';
    let minute = '00';
    let second = '00';

    // const format = (num) => {
    //   num += '';
    //   if (num.length == 1) {
    //     num = `0${num}`;
    //   }
    //   return String(num);
    // };

    const format = (num) => ((num + '').length === 1 ? `0${num}` : `${num}`);

    $control.onclick = () => {
      if (!btn) {
        timer = setInterval(function () {
          $display.textContent = `${format(hour)}:${format(minute)}:${format(second)}`;
          second++;

          if (second >= 100) {
            minute++;
            second = 0;
          }

          if (minute >= 60) {
            hour++;
            minute = 0;
          }

          if (hour >= 60) {
            hour = 0;
          }
        }, 20);
        btn = true;
      } else {
        clearInterval(timer);
        btn = false;
      }
    };
  </script>
</body>
</html>
~~~

<br/>

#### 주요 코드

1. 숫자가 1자리 수 일 때는 앞에 0을 붙인 문자열 변환

해당 문제에서 제일 난해한 부분은 특정 수 일 때 문자열로 변환을 해줘야만 한다는 것이었다.

따라 해당 시간을 화면에 보여주기 전에 먼저 문자열로 바꿔주면서 문자열 1자리 수라면 0을 앞에 붙이는 함수를 추가하였다.

~~~~javascript
    // const format = (num) => {
    //   num += '';
    //   if (num.length == 1) {
    //     num = `0${num}`;
    //   }
    //   return String(num);
    // };

    const format = (num) => ((num + '').length === 1 ? `0${num}` : `${num}`);
~~~~

<br/>

2. 정지 시작 토글 생성

정지 한 후 다시 시작하는 토글기능을 위해 변수 btn을 만들고 클릭시 btn에 false 혹은 true값을 게속 번갈아가도록 설정 하였다.

