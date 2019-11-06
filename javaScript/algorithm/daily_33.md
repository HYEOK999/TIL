![quiz-2174368_1280](https://user-images.githubusercontent.com/31315644/68214647-3026ee80-0021-11ea-8e28-41a3aa5de18a.png)

------

문제 출처 : poiema

### Counter

![img](https://poiemaweb.com/assets/fs-images/exercise/counter.gif)

- 요구 사항

  1. 최소값은 0이다. 즉, 0과 양수만으로 카운트한다.

  2. 클로저로 구현한다.

<br/>

#### 1. 함수 자체를 리턴하고 함수를 받아와서 출력하는 방법

~~~html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Counter</title>
  <style>
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 130px;
      margin: 20px auto;
      font-size: 24px;
      color: #3f51b5;
    }

    button {
      padding: 5px 10px;
      font-size: 24px;
      border-radius: 5px;
      color: #3f51b5;
      border-color: #3f51b5;
      outline: none;
      cursor: pointer;
    }

    .counter {
      width: 50px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <button class="increase">+</button>
    <div class="counter">0</div>
    <button class="decrease">-</button>
  </div>

  <script>
    const $counter = document.querySelector('.counter');
    const $increase = document.querySelector('.increase');
    const $decrease = document.querySelector('.decrease');

    const Counter = (function () {
      let count = 0;

      return function (fr) {
        count = fr(count);
        $counter.textContent = count;
      };
    }());

    const increase = (n) => ++n;

    const decrease = (n) => {
      if (n == 0) return 0;
      return --n;
    };

    $increase.onclick = () => Counter(increase);
    $decrease.onclick = () => Counter(decrease);
  </script>
</body>
</html>
~~~

<br/>

#### 생성자 함수로 만들고 생성자함수 객체 프로토타입의 메소드를 호출하는 방법

~~~~javascript
const $counter = document.querySelector('.counter');
const $increase = document.querySelector('.increase');
const $decrease = document.querySelector('.decrease');

const Counter = (function () {
  let count = 0;

  function Counters() {
  }

  Counters.prototype.increase = function () {
    $counter.textContent = count++;
  };

  Counters.prototype.decrease = function () {
    if (count == 0) return;
    $counter.textContent = --count;
  };

  return Counters;
}());

const counts = new Counter();

$increase.onclick = () => {
  counts.increase();
};

$decrease.onclick = () => {
  counts.decrease();
};
~~~~

<br/>

#### 객체(증가함수, 감소함수)를 리턴하는 방법

~~~javascript
const $counter = document.querySelector('.counter');
const $increase = document.querySelector('.increase');
const $decrease = document.querySelector('.decrease');

const Counter = (function () {
  let count = 0;
  
  return {
    increase() {
      $counter.textContent = ++count;
    },
    decrease() {
      if (count == 0) return;
      $counter.textContent = --count;
    }
  };
}());


$increase.onclick = () => Counter.increase();
$decrease.onclick = () => Counter.decrease();
~~~

