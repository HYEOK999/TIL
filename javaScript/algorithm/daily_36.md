![quiz-2174368_1280](https://user-images.githubusercontent.com/31315644/68214647-3026ee80-0021-11ea-8e28-41a3aa5de18a.png)

------

문제 출처 : poiema

### Stop Watch

![img](https://poiemaweb.com/assets/fs-images/exercise/analog-clock.gif)

- 요구 사항 : 현재 시간을 표시하여야 한다.

<br/>

~~~html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Analog Clock</title>
  <style>
    @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro');

    .analog-clock {
      position: relative;
      margin: 100px auto 0;
      width: 200px;
      height: 200px;
      background-color: aliceblue;
      border-radius: 50%;
    }

    .hand {
      position: absolute;
      left: 50%;
      width: 1px;
      height: 100px;
      /* 자바스크립트에 의해 덮어써진다. */
      /* transform: translate3d(-50%, 0, 0); */
      transform-origin: 100% 100%;
    }

    .hour {
      background-color: #f44336;
    }

    .minute {
      background-color: #3f51b5;
    }

    .second {
      background-color: #9e9e9e;
      /* transform: rotate(100deg); */
    }

    .center-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 12px;
      height: 12px;
      background-color: black;
      border-radius: 50%;
    }

    .digital-clock {
      position: absolute;
      top: 350px;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      font-size: 2em;
      font-family: 'Source Code Pro', monospace;
    }
  </style>
</head>
<body>
  <div class="clock">
    <div class="analog-clock">
      <div class="hour hand"></div>
      <div class="minute hand"></div>
      <div class="second hand"></div>
      <div class="center-circle"></div>
    </div>
    <div class="digital-clock"></div>
  </div>

  <script>
    // transform: rotate(100deg);
    const $second = document.querySelector('.second');
    const $minute = document.querySelector('.minute');
    const $hour = document.querySelector('.hour');
    const $digitalClock = document.querySelector('.digital-clock');

    let sTime = new Date().getSeconds();
    let mTime = new Date().getMinutes();
    let hTime = new Date().getHours();

    // const format = (num) => {
    //   num += '';
    //   if (num.length == 1) {
    //     num = `0${num}`;
    //   }
    //   return num;
    // };

    const format2 = (num) => (String(num).length == 1 ? `0${num}` : `${num}`);

    const timer = () => {
      $second.style.transform = `rotate(${sTime * 6}deg)`;
      $minute.style.transform = `rotate(${mTime * 6 + sTime * 0.1}deg)`;
      $hour.style.transform = `rotate(${(hTime % 12) * 30 + mTime * 0.5}deg)`;

      $digitalClock.innerHTML = 				`${format2(hTime)}:${format2(mTime)}:${format2(sTime)}`;
      sTime++;
      if (sTime >= 60) {
        mTime++;
        sTime = 0;
      }

      if (mTime >= 60) {
        hTime++;
        mTime = 0;
      }

      if (hTime > 23) {
        hTime = 0;
      }
    };

    window.setInterval(timer, 1000);
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

    const format2 = (num) => ((num + '').length === 1 ? `0${num}` : `${num}`);
~~~~

<br/>

2. 시간 알고리즘

~~~javascript
 const timer = () => {
      $second.style.transform = `rotate(${sTime * 6}deg)`;
      $minute.style.transform = `rotate(${mTime * 6 + sTime * 0.1}deg)`;
      $hour.style.transform = `rotate(${(hTime % 12) * 30 + mTime * 0.5}deg)`;

      $digitalClock.innerHTML = 				`${format2(hTime)}:${format2(mTime)}:${format2(sTime)}`;
      sTime++;
      if (sTime >= 60) {
        mTime++;
        sTime = 0;
      }

      if (mTime >= 60) {
        hTime++;
        mTime = 0;
      }

      if (hTime > 23) {
        hTime = 0;
      }
    };
~~~

360도 기준 1초는 6도이므로 x6을 한다. : `rotate(${sTime * 6}deg)`

360도 기준 1분은 6도이므로 x6을 하고 1초가 60번을 움직여야만 1분이 움직이게 되므로 자연스러운 움직임을 위해 1초당 0.1도씩(60초 후 6도)움직이게 설정한다. : `rotate(${mTime * 6 + sTime * 0.1}deg)`

360도 기준 1시간은 30도인데 시간은 24시간이므로 12를 나눠서 나온 나머지를 가지고 처리한다. 
그리고 1분이 60번을 움직여야 1시간이 움직이게 되므로 자연스러운 움직임을 위해 1분당 0.5도씩(60분 후 30도) 움직이게 설정한다. : `rotate(${(hTime % 12) * 30 + mTime * 0.5}deg)`

<br/>

**디지털 시계**

디지털 시계는 초부터 1씩 숫자를 증가시켜 초가 60을 넘기게 될 경우 0으로 만들고 분에 1을 더해준다.

분 역시 60을 넘기게 될 경우 0으로 만들고 시간에 1을 더 해준다.

시간은 23시( 정수이므로 24가 딱 되는 순간 )를 넘어가게 될 경우 0으로 초기화 해준다.