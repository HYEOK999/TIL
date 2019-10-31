![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)

------

## JavaScript Study 18

-  이벤트
  - 이벤트 란?
  - 이벤트 루프
  - 이벤트 루프(Event Loop)와 동시성(Concurrency)
  - addEventListener 메소드 방식
  - [이벤트의 종류 ( 참고 : Event reference )](#a1)
    - [UI Event](#a2)
    - [Keyboard Event](#a3)
    - [Mouse Event](#a4)
    - [Focus Event](#a5)
    - [Form Event](#a6)
    - [Clipboard Event](#a7)
  - 이벤트 핸들러 등록 (3가지)
    - [인라인 이벤트 핸들러 방식](#b1)
    - [이벤트 핸들러 프로퍼티 방식](#b2)
    - [addEventListener 메소드 방식](#b3)
      - 예1
      - 예2
  - 이벤트 핸들러 함수 내부의 this
    - [인라인 이벤트 핸들러 방식](#c1)
    - [이벤트 핸들러 프로퍼티 방식](#c2)
    - [addEventListener 메소드 방식](#c3)
  - 이벤트의 흐름
    - 캡처링 표현 예제
    - 캡처링 예제
    - 버블링 예제
    - 캡처링 과 버블링 혼용
  - Event 객체
    - Event Property
      - [Event.target](#d1)
      - [Event.currentTarget](#d2)
      - [Event.type](#d2)
      - [Event.cancelabel](#d4)
      - [Event.eventPhase](#d5)
    - [Event.Delegation 이벤트 위임](#d6)
  - 기본 동작의 변경
    - [Event.preventDefault](#d8)
    - [Event.stopPropagation](#d9)
    - [preventDefault & stopPropagation](#d10)

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 이벤트란?

- 이벤트 핸들러 등록 3가지

- 이벤트 핸들러 함수 내부의 this

- 버블링

- 캡처링

- Event.tartget

  <br/>

-------

## 이벤트

<br/>

### 이벤트 란?

> 어떤 사건을 의미.

- 브라우저에서의 이벤트 - 예 : 사용자가 버튼을 클릭했을 때, 웹페이지가 로드되었을 때 등등 
- 이벤트는 발생하는 시점이나 순서를 사전에 인지할 수 없다.
- 일반적인 제어 흐름과는 다른 접근 방식이 필요하다.

위와 같은 조건 떄문에 **이벤트가 발생하면 누군가 이를 감지할 수 있어야 하며 그에 대응하는 처리를 호출해 주어야 한다.**

**브라우저는 이벤트를 감지**할 수 있으며 **이벤트 발생 시에는 통지**해 준다. 
이 과정을 통해 **사용자와 웹페이지는 상호작용(Interaction)**이 가능하게 된다.

```html
<!DOCTYPE html>
<html>
<body>
  <button class="myButton">Click me!</button>
  <script>
    document.querySelector('.myButton').addEventListener('click', function () {
      alert('Clicked!');
    });
  </script>
</body>
</html>
```

버튼을 클릭 했을 때, 브라우저는 이벤트를 버튼 클릭이라는 이벤트를 감지하고서 그에 대응하는 처리`alert`를 호출해준다.

이벤트는 일반적으로 함수에 연결되며 그 함수는 이벤트가 발생하기 전에는 실행되지 않다가 이벤트가 발생되면 실행된다. 
이 함수를 **이벤트 핸들러**라 하며 이벤트에 대응하는 처리를 기술한다. ( 위 예제에서는 `'addEventListenter'안에 있는 함수` 가 이벤트 핸들러)

<br/>

###이벤트 루프(Event Loop)와 동시성(Concurrency)

브라우저는 단일 쓰레드 에서 이벤트 드리븐 방식으로 동작한다.

단일쓰레드인데도 마치 멀티 쓰레드 마냥 동시에 처리되는 것처럼 느껴지는데 그것은 **JS의 동시성을 지원하는 이벤트루프** 때문이다. 브라우저의 환경은 다음과 같다. 

<img src="https://poiemaweb.com/img/event-loop.png" alt="event-loop" style="zoom: 50%;" />

<br/>

구글의 V8을 비롯한 대부분의 JS엔진은 크게 2가지 영역으로 나눌 수 있다.

1. **Call Stack (호출 스택)**
   - 함수가 호출 되면(= 작업이 요청되면) 호출된 함수는 순차적으로 Cal Stack에 쌓이게 되고 순차적으로 실행
   - JS는 단 하나의 Call Stack을 이용하기 때문에 해당 task가 종료하기 전까지는 다른 어떤 task도 실행 할 수 없다.

2. **Heap**
   - 동적으로 생성된 객체 인스턴스가 할당된느 영역

<br/>

**비동기(이벤트 포함) 처리는 JS엔진을 구동하는 환경인 브라우저(Node.js)가 담당한다.**

1. **Event Queue(Task Queue)**
   - 비동기 처리 함수의 콜백함수, 비동기식 이벤트 헨들러, Timer 함수(setTimeout(), setInterval())의 콜백 함수가 보관되는 영역. 
   - 이벤트 루프에 의해 특정 시점(Call Stack이 비어졌을 떄)에 순차적으로 Call Stack으로 이동되어 실행.

2. **Event Loop**(이벤트 루프)
   - Call Stack 내에서 현재 실행 중인 task가 있는지 Event Queue에 task가 있는지 반복하여 확인.
   - 만약 Call Stack이 비어있다면 Event Queue 내의 Task가 Call Stack으로 이동하고 실행.

<br/>

예제1

~~~javascript
function func1() {
  console.log('func1');
  func2();
}

function func2() {
  setTimeout(function () {
    console.log('func2');
  }, 0);

  func3();
}

function func3() {
  console.log('func3');
}

func1();
~~~

1. 함수 func1이 호출되면 함수 func1은 Call Stack에 쌓인다. 
2. 함수 func1은 함수 func2을 호출한다.
3. 함수 func2가 Call Stack에 쌓이고 setTimeout가 호출된다. 
4. **setTimeout의 콜백함수는 즉시 실행되지 않고 지정 대기 시간만큼 기다린다.**
5. **“tick” 이벤트가 발생하면 태스크(이벤트) 큐로 이동한다.**
6. **Call Stack이 비어졌을 때 Call Stack으로 이동되어 실행된다.**

<br/>

예제2 - DOM 이벤트 핸들러

~~~javascript
function func1() {
  console.log('func1');
  func2();
}

function func2() {
  // <button class="foo">foo</button>
  const elem = document.querySelector('.foo');

  elem.addEventListener('click', function () {
    this.style.backgroundColor = 'indigo';
    console.log('func2');
  });

  func3();
}

function func3() {
  console.log('func3');
}

func1();
~~~

1. 함수 func1이 호출되면 함수 func1은 Call Stack에 쌓인다. 
2. 함수 func1은 함수 func2을 호출한다.
3. 함수 func2가 Call Stack에 쌓이고 addEventListener가 호출된다. 
4. **addEventListener의 콜백함수는 즉시 실행되지 않고 이벤트를 기다린다.**
5. **foo버튼의 “click” 이벤트가 발생하면 태스크(이벤트) 큐로 이동한다.**
6. **Call Stack이 비어졌을 때 Call Stack으로 이동되어 실행된다.**

<br/>

### 이벤트의 종류 ( 참고 : [Event reference](https://developer.mozilla.org/en-US/docs/Web/Events) ) <a id="a1"></a>

<br/>

#### UI Event  <a id="a2"></a>

| Event    | Description                                                  |
| :------- | :----------------------------------------------------------- |
| **load** | 웹페이지의 로드가 완료되었을 때                              |
| unload   | 웹페이지가 언로드될 때(주로 새로운 페이지를 요청한 경우)     |
| error    | 브라우저가 자바스크립트 오류를 만났거나 요청한 자원이 존재하지 않는 경우 |
| resize   | 브라우저 창의 크기를 조절했을 때                             |
| scroll   | 사용자가 페이지를 위아래로 스크롤할 때                       |
| select   | 텍스트를 선택했을 때                                         |

<br/>

#### Keyboard Event <a id="a3"></a>

| Event     | Description            |
| :-------- | :--------------------- |
| keydown   | 키를 누르고 있을 때    |
| **keyup** | 누르고 있던 키를 뗄 때 |
| keypress  | 키를 누르고 뗏을 때    |

<br/>

#### Mouse Event <a id="a4"></a>

| Event     | Description                                                  |
| :-------- | :----------------------------------------------------------- |
| **click** | 마우스 버튼을 클릭했을 때                                    |
| dbclick   | 마우스 버튼을 더블 클릭했을 때                               |
| mousedown | 마우스 버튼을 누르고 있을 때                                 |
| mouseup   | 누르고 있던 마우스 버튼을 뗄 때                              |
| mousemove | 마우스를 움직일 때 (터치스크린에서 동작하지 않는다)          |
| mouseover | 마우스를 요소 위로 움직였을 때 (터치스크린에서 동작하지 않는다) |
| mouseout  | 마우스를 요소 밖으로 움직였을 때 (터치스크린에서 동작하지 않는다) |

<br/>

#### Focus Event <a id="a5"></a>

| Event              | Description               |
| :----------------- | :------------------------ |
| **focus**/focusin  | 요소가 포커스를 얻었을 때 |
| **blur**/foucusout | 요소가 포커스를 잃었을 때 |

<br/>

#### Form Event <a id="a6"></a>

| Event      | Description                                                 |
| :--------- | :---------------------------------------------------------- |
| **input**  | input 또는 textarea 요소의 값이 변경되었을 때               |
|            | contenteditable 어트리뷰트를 가진 요소의 값이 변경되었을 때 |
| **change** | select box, checkbox, radio button의 상태가 변경되었을 때   |
| submit     | form을 submit할 때 (버튼 또는 키)                           |
| reset      | reset 버튼을 클릭할 때 (최근에는 사용 안함)                 |

<br/>

#### Clipboard Event    <a id="a7"></a>

| Event | Description            |
| :---- | :--------------------- |
| cut   | 콘텐츠를 잘라내기할 때 |
| copy  | 콘텐츠를 복사할 때     |
| paste | 콘텐츠를 붙여넣기할 때 |

<br/>

### 이벤트 핸들러 등록 (3가지)

#### 인라인 이벤트 핸들러 방식 <a id="b1"></a>

- 더 이상 사용되고 있지 않은 방식.
- on으로 시작하는 이벤트 어트리뷰트의 값으로 함수 호출을 전달한다는 것.
- 이벤트 어트리뷰트의 값으로 전달한 함수 호출이 즉시 호출되는 것은 아니다. 
- 사실은 이벤트 어트리뷰트 키를 이름으로 갖는 함수를 암묵적으로 정의하고 그 함수의 몸체에 이벤트 어트리뷰트의 값으로 전달한 함수 호출을 문으로 갖는다. 
- 아래 예제 기준 = `function onclick(event) { foo(); }`

~~~html
<!DOCTYPE html>
<html>
<body>
  <button onclick="myHandler()">Click me</button>
  <script>
    function myHandler() {
      alert('Button clicked!');
    }
  </script>
</body>
</html>
~~~

<br/>

#### 이벤트 핸들러 프로퍼티 방식  <a id="b2"></a>

- HTML과 Javascript가 뒤섞이는 문제는 해결할 수 있는 방식. 
- 하지만 **이벤트 핸들러 프로퍼티에 하나의 이벤트 핸들러만을 바인딩할 수 있다는 단점**이 있다.

~~~html
<!DOCTYPE html>
<html>
<body>
  <button class="btn">Click me</button>
  <script>
    const btn = document.querySelector('.btn');

    // 이벤트 핸들러 프로퍼티 방식은 이벤트에 하나의 이벤트 핸들러만을 바인딩할 수 있다
    // 첫번째 바인딩된 이벤트 핸들러 => 실행되지 않는다.
    btn.onclick = function () {
      alert('① Button clicked 1');
    };

    // 두번째 바인딩된 이벤트 핸들러
    btn.onclick = function () {
      alert('① Button clicked 2');
    };

    // addEventListener 메소드 방식
    // 첫번째 바인딩된 이벤트 핸들러
    btn.addEventListener('click', function () {
      alert('② Button clicked 1');
    });

    // 두번째 바인딩된 이벤트 핸들러
    btn.addEventListener('click', function () {
      alert('② Button clicked 2');
    });
  </script>
</body>
</html>
~~~

<br/>

#### addEventListener 메소드 방식  <a id="b3"></a>

![Event Listener](https://poiemaweb.com/img/event_listener.png)

- 대상 DOM 요소에 이벤트를 바인딩.
- 해당 이벤트가 발생했을 때 실행될 콜백 함수(이벤트 핸들러)를 지정.
- IE 9 이상에서 동작. IE 8 이하는 `attachEvent` 메소드를 사용. ( 참고 :  [attachEvent](https://developer.mozilla.org/ko/docs/Web/API/EventTarget/attachEvent) )

`addEventListener` 함수 방식은 이전 방식에 비해 아래와 같이 보다 나은 장점을 갖는다.

- 하나의 이벤트에 대해 하나 이상의 이벤트 핸들러를 추가할 수 있다.
- 캡처링과 버블링을 지원한다.
- HTML 요소뿐만아니라 모든 DOM 요소(HTML, XML, SVG)에 대해 동작한다. 브라우저는 웹 문서(HTML, XML, SVG)를 로드한 후, 파싱하여 DOM을 생성한다.

<br/>

##### 예1

~~~html
<!DOCTYPE html>
<html>
<body>
  <script>
    addEventListener('click', function () {
      alert('Clicked!');
    });
  </script>
</body>
</html>
~~~

- DOM 요소를 지정 안해주면 전역객체 window(브라우저의 윈도우)에서 발생되는 click 이벤트에 이벤트 핸들러를 바인딩한다.

<br/>

##### 예2

~~~html
<!DOCTYPE html>
<html>
<body>
  <label>User name <input type='text'></label>
  <em class="message"></em>

  <script>
    const input = document.querySelector('input[type=text]');
    const msg = document.querySelector('.message');

    input.addEventListener('blur', function () {
      if (input.value.length < 2) {
        msg.innerHTML = '이름은 2자 이상 입력해 주세요';
      } else {
        msg.innerHTML = '';
      }
    });
  </script>
</body>
</html>

~~~

- `blur 이벤트`는 포커스를 잃을 경우 생기는 이벤트다.
- 키보드로 input 내부에 내용을 입력 후 글자수가 모자르다면 다른 곳을 클릭, tab 하였을 때 이벤트가 호출된다. 

위와 같은 코드는 좋지 못한 코드다 이유는 '2'라는 원시값을 통해서 어떤 이벤트가 실행될 지를 판별하는데 코드가 길어질수록 저런 식으로 원시값을 하나하나 변경하는 것은 시간낭비 와 실수를 유발한다.

해결 방법으로는 '2' 라는 원시값을 상수화 하고 상수를 함수의 인수로 받는 함수를 작성한다.
문제는 이럴경우 이벤트 핸들러 프로퍼티 처럼 1개의 함수만 전달할 수 있게된다.
이를 해결 하기 위해 addEventListener에서 익명 함수를 작성한다면 내부에서 여러개의 함수를 받을 수 있다.

~~~~html
<!DOCTYPE html>
<html>
<body>
  <label>User name <input type='text'></label>
  <em class="message"></em>

  <script>
    const MIN_USER_NAME_LENGTH = 2; // 이름 최소 길이

    const input = document.querySelector('input[type=text]');
    const msg = document.querySelector('.message');

    function checkUserNameLength(n) {
      if (input.value.length < n) {
        msg.innerHTML = '이름은 ' + n + '자 이상이어야 합니다';
      } else {
        msg.innerHTML = '';
      }
    }

    input.addEventListener('blur', function () {
      // 이벤트 핸들러 내부에서 함수를 호출하면서 인수를 전달한다.
      checkUserNameLength(MIN_USER_NAME_LENGTH);
    });

    // 이벤트 핸들러 프로퍼티 방식도 동일한 방식으로 인수를 전달할 수 있다.
    // input.onblur = function () {
    //   // 이벤트 핸들러 내부에서 함수를 호출하면서 인수를 전달한다.
    //   checkUserNameLength(MIN_USER_NAME_LENGTH);
    // };
  </script>
</body>
</html>

~~~~

<br/>

### 이벤트 핸들러 함수 내부의 this

#### 인라인 이벤트 핸들러 방식 <a id="c1"></a>

- **이벤트 핸들러**는 **일반 함수로서 호출**되므로 이벤트 핸들러 내부의 **this는 전역 객체 window**를 가리킨다.

```html
<!DOCTYPE html>
<html>
<body>
  <button onclick="foo()">Button</button>
  <script>
    function foo () {
      console.log(this); // window
    }
  </script>
</body>
</html>

```

<br/>

#### 이벤트 핸들러 프로퍼티 방식  <a id="c2"></a>

-  **이벤트 핸들러**는 **메소드**이므로 이벤트 핸들러 내부의 **this는 이벤트에 바인딩된 요소**를 가리킨다. 

~~~html
<!DOCTYPE html>
<html>
<body>
  <button class="btn">Button</button>
  <script>
    const btn = document.querySelector('.btn');

    btn.onclick = function (e) {
      console.log(this); // <button id="btn">Button</button>
      console.log(e.currentTarget); // <button id="btn">Button</button>
      console.log(this === e.currentTarget); // true
    };
  </script>
</body>
</html>

~~~

<br/>

#### addEventListener 메소드 방식  <a id="c3"></a>

- **이벤트 핸들러**는 **콜백 함수**이지만 이벤트 핸들러 내부의 **this는 이벤트 리스너에 바인딩된 요소(currentTarget)**를 가리킨다. 

~~~html
<!DOCTYPE html>
<html>
<body>
  <button class="btn">Button</button>
  <script>
    const btn = document.querySelector('.btn');

    btn.addEventListener('click', function (e) {
      console.log(this); // <button id="btn">Button</button>
      console.log(e.currentTarget); // <button id="btn">Button</button>
      console.log(this === e.currentTarget); // true
    });
  </script>
</body>
</html>

~~~

<br/>

### 이벤트의 흐름

HTML 요소는 계층적 구조에 포함되어 있다.
이 요소에 이벤트가 발생되면 연쇄적 반응이 얼어난다.
이것을 **이벤트전파**라 하고 전파 방향에 따라 **버블링(Event Bubbling)**과 **캡처링(Event Capturing)**으로 구분할 수 있다.

> 버블링 : 자식요소에서 발생한 이벤트가 부모요소로 전파
>
> 캡처링 : 부모요소부터 시작하여 이벤트를 발생시킨 자식 요소까지 도달
>
> 캡처링 과 버블링은 둘 중 하나만 발생되는 개념이 아니라 캠처링부터 시작해 버블링으로 종료한다.

<img src="https://poiemaweb.com/img/eventflow.svg" alt="event flow" style="zoom: 25%;" />

**addEventListener 메소드의 세번째 매개변수에 true를 설정하면 캡처링으로 전파되는 이벤트를 캐치하고 false 또는 미설정하면 버블링으로 전파되는 이벤트를 캐치한다.**

<br/>

#### 캡처링 표현 예제

~~~html
<!DOCTYPE html>
<html>
<head>
  <style>
    html { border:1px solid red; padding:30px; text-align: center; }
    body { border:1px solid green; padding:30px; }
    .top {
      width: 300px; height: 300px;
      background-color: red;
      margin: auto;
    }
    .middle {
      width: 200px; height: 200px;
      background-color: blue;
      position: relative; top: 34px; left: 50px;
    }
    .bottom {
      width: 100px; height: 100px;
      background-color: yellow;
      position: relative; top: 34px; left: 50px;
      line-height: 100px;
    }
  </style>
</head>
<body>
  body
  <div class="top">top
    <div class="middle">middle
      <div class="bottom">bottom</div>
    </div>
  </div>
  <script>
  // true: capturing / false: bubbling
  const useCature = true;

  const handler = function (e) {
    const phases = ['capturing', 'target', 'bubbling'];
    const node = this.nodeName + (this.className ? '.' + this.className : '');
    // eventPhase: 이벤트 흐름 상에서 어느 phase에 있는지를 반환한다.
    // 0 : 이벤트 없음 / 1 : 캡처링 단계 / 2 : 타깃 / 3 : 버블링 단계
    console.log(node, phases[e.eventPhase - 1]);
    alert(node + ' : ' + phases[e.eventPhase - 1]);
  };

  document.querySelector('html').addEventListener('click', handler, useCature);
  document.querySelector('body').addEventListener('click', handler, useCature);

  document.querySelector('div.top').addEventListener('click', handler, useCature);
  document.querySelector('div.middle').addEventListener('click', handler, useCature);
  document.querySelector('div.bottom').addEventListener('click', handler, useCature);
  </script>
</body>
</html>

~~~

<br/>

#### 버블링 예제

~~~html
<!DOCTYPE html>
<html>
<head>
  <style>
    html, body { height: 100%; }
  </style>
<body>
  <p>버블링 이벤트 <button>버튼</button></p>
  <script>
    const body = document.querySelector('body');
    const para = document.querySelector('p');
    const button = document.querySelector('button');

    // 버블링
    body.addEventListener('click', function () {
      console.log('Handler for body.');
    });

    // 버블링
    para.addEventListener('click', function () {
      console.log('Handler for paragraph.');
    });

    // 버블링
    button.addEventListener('click', function () {
      console.log('Handler for button.');
    });
  </script>
</body>
</html>

~~~

결과는 다음과 같다. 캡쳐링 이벤트 흐름에 대해서는 동작하지 않는다. 

```
Handler for button.
Handler for paragraph.
Handler for body.

```

<br/>

#### 캡처링 예제

~~~html
<!DOCTYPE html>
<html>
<head>
  <style>
    html, body { height: 100%; }
  </style>
<body>
  <p>캡처링 이벤트 <button>버튼</button></p>
  <script>
    const body = document.querySelector('body');
    const para = document.querySelector('p');
    const button = document.querySelector('button');

    // 캡처링
    body.addEventListener('click', function () {
      console.log('Handler for body.');
    }, true);

    // 캡처링
    para.addEventListener('click', function () {
      console.log('Handler for paragraph.');
    }, true);

    // 캡처링
    button.addEventListener('click', function () {
      console.log('Handler for button.');
    }, true);
  </script>
</body>
</html>

~~~

결과는 다음과 같다. 버블링 이벤트 흐름에 동작하지 않는다.

```
Handler for body.
Handler for paragraph.
Handler for button.

```

<br/>

#### 캡처링 과 버블링 혼용

~~~~html
<!DOCTYPE html>
<html>
<head>
  <style>
    html, body { height: 100%; }
  </style>
<body>
  <p>버블링과 캡처링 이벤트 <button>버튼</button></p>
  <script>
    const body = document.querySelector('body');
    const para = document.querySelector('p');
    const button = document.querySelector('button');

    // 버블링
    body.addEventListener('click', function () {
      console.log('Handler for body.');
    });

    // 캡처링
    para.addEventListener('click', function () {
      console.log('Handler for paragraph.');
    }, true);

    // 버블링
    button.addEventListener('click', function () {
      console.log('Handler for button.');
    });
  </script>
</body>
</html>

~~~~

위 코드는 body, button 요소는 버블링 이벤트 흐름을 캐치하고 p 요소는 캡처링 이벤트 흐름만을 캐치한다.

따라서 결과는 다음과 같다.

~~~
Handler for paragraph.
Handler for button.
Handler for body.

~~~

<br/>

### Event 객체

- event 객체는 이벤트를 발생시킨 요소와 발생한 이벤트에 대한 유용한 정보를 제공한다. 
- 이벤트가 발생하면 event 객체는 동적으로 생성되며 이벤트를 처리할 수 있는 이벤트 핸들러에 인자로 전달된다.

~~~html
<!DOCTYPE html>
<html>
<body>
  <p>클릭하세요. 클릭한 곳의 좌표가 표시됩니다.</p>
  <em class="message"></em>
  <script>
  function showCoords(e) { // e: event object
    const msg = document.querySelector('.message');
    msg.innerHTML =
      'clientX value: ' + e.clientX + '<br>' +
      'clientY value: ' + e.clientY;
  }
  addEventListener('click', showCoords);
  </script>
</body>
</html>

~~~

<br/>

위와 같이 event 객체는 이벤트 핸들러에 암묵적으로 전달된다.

이벤트 핸들러를 선언할 때, event 객체를 전달받을 첫번째 매개변수를 명시적으로 선언하는 것이 좋다.

따라서 함수로 1번더 감싸고 `addEventListener`를 호출 할 때 익명함수로 event객체를 넘겨준다.

~~~html
<!DOCTYPE html>
<html>
<body>
  <em class="message"></em>
  <script>
  function showCoords(e, msg) {
    msg.innerHTML =
      'clientX value: ' + e.clientX + '<br>' +
      'clientY value: ' + e.clientY;
  }

  const msg = document.querySelector('.message');

  addEventListener('click', function (e) {
    showCoords(e, msg);
  });
  </script>
</body>
</html>

~~~

<br/>

#### Event Property

##### Event.target  <a id="d1"></a>

> 실제로 이벤트를 발생시킨 요소를 가리킴

~~~html
<!DOCTYPE html>
<html>
<body>
  <div class="container">
    <button id="btn1">Hide me 1</button>
    <button id="btn2">Hide me 2</button>
  </div>

  <script>
    function hide(e) {
      e.target.style.visibility = 'hidden';
      // 동일하게 동작한다.
      // this.style.visibility = 'hidden';
    }

    document.getElementById('btn1').addEventListener('click', hide);
    document.getElementById('btn2').addEventListener('click', hide);
  </script>
</body>
</html>

~~~

여기서 event객체는 btn1 과 btn2를 각각 가리키고 있기 때문에 this와 별반 차이가 없다.

하지만 아래 예제를 보자.

~~~html
<!DOCTYPE html>
<html>
<body>
  <div class="container">
    <button id="btn1">Hide me 1</button>
    <button id="btn2">Hide me 2</button>
  </div>

  <script>
    const container = document.querySelector('.container');

    function hide(e) {
      // e.target은 실제로 이벤트를 발생시킨 DOM 요소를 가리킨다.
      e.target.style.visibility = 'hidden';
      // this는 이벤트에 바인딩된 DOM 요소(.container)를 가리킨다. 따라서 .container 요소를 감춘다.
      // this.style.visibility = 'hidden';
    }

    container.addEventListener('click', hide);
  </script>
</body>
</html>

~~~

이 예제처럼 this는 자신이 불러들인 객체를 바인딩하기 때문에 DOM 요소(.container)를 가리킨다. 따라서 버튼 1개 클릭시 전부 가리게 되는데 반면에 event객체의 e.target은 실제로 인벤트를 발생시킨 DOM요소를 의미한다. 

따라서 **Event.target은 this와 반드시 일치하지는 않는다.**

<br/>

##### Event.currentTarget  <a id="d2"></a>

> 이벤트에 바인딩된 DOM 요소를 가리킴.
>
> addEventListener 앞에 기술된 객체를 가리킨다.

**Event.target 과 this 는 반드시 일치하지 않는다.**

**그러나, Event.currentTarget과 this는 언제나 일치한다.**

~~~html
<!DOCTYPE html>
<html>
<head>
  <style>
    html, body { height: 100%; }
    div { height: 100%; }
  </style>
</head>
<body>
  <div>
    <button>배경색 변경</button>
  </div>
  <script>
    function bluify(e) {
      // this: 이벤트에 바인딩된 DOM 요소(div 요소)
      console.log('this: ', this);
      // target: 실제로 이벤트를 발생시킨 요소(button 요소 또는 div 요소)
      console.log('e.target:', e.target);
      // currentTarget: 이벤트에 바인딩된 DOM 요소(div 요소)
      console.log('e.currentTarget: ', e.currentTarget);

      // 언제나 true
      console.log(this === e.currentTarget);
      // currentTarget과 target이 같은 객체일 때 true
      console.log(this === e.target);

      // click 이벤트가 발생하면 이벤트를 발생시킨 요소(target)과는 상관없이 this(이벤트에 바인딩된 div 요소)의 배경색이 변경된다.
      this.style.backgroundColor = '#A5D9F3';
    }

    // div 요소에 이벤트 핸들러가 바인딩되어 있다.
    // 자식 요소인 button이 발생시킨 이벤트가 버블링되어 div 요소에도 전파된다.
    // 따라서 div 요소에 이벤트 핸들러가 바인딩되어 있으면 자식 요소인 button이 발생시킨 이벤트를 div 요소에서도 핸들링할 수 있다.
    document.querySelector('div').addEventListener('click', bluify);
  </script>
</body>
</html>
~~~

<br/>

##### Event.type  <a id="d3"></a>

> 발생한 이벤트의 종류를 나타내는 문자열을 반환한다.

```html
<!DOCTYPE html>
<html>
<body>
  <p>키를 입력하세요</p>
  <em class="message"></em>
  <script>
  const body = document.querySelector('body');

  function getEventType(e) {
    console.log(e);
    document.querySelector('.message').innerHTML = `${e.type} : ${e.keyCode}`;
  }

  body.addEventListener('keydown', getEventType);
  body.addEventListener('keyup', getEventType);
  </script>
</body>
</html>

```

<br/>

##### Event.cancelable  <a id="d4"></a>

> 요소의 기본 동작을 취소시킬 수 있는지 여부(true/false)를 나타낸다.

```html
<!DOCTYPE html>
<html>
<body>
  <a href="poiemaweb.com">Go to poiemaweb.com</a>
  <script>
  const elem = document.querySelector('a');

  elem.addEventListener('click', function (e) {
    console.log(e.cancelable);

    // 기본 동작을 중단시킨다.
    e.preventDefault(); // 해당 링크를 눌러도 이동되지않는다.
  });
  </script>
</body>
</html>

```

<br/>

##### Event.eventPhase <a id="d5"></a>

> 이벤트 흐름(event flow) 상에서 어느 단계(event phase)에 있는지를 반환한다.

| 반환값 | 의미        |
| :----- | :---------- |
| 0      | 이벤트 없음 |
| 1      | 캡쳐링 단계 |
| 2      | 타깃        |
| 3      | 버블링 단계 |

<br/>

#### Event Delegation (이벤트 위임) <a id="d6"></a>

​	`<li>`가 6개 있다고 가정했을 경우, 해당 태그에 모두 이벤트 반응 처리하고 싶다면 아래처럼 6개의 이벤트 핸들러를 구현해서 바인딩해야하는 비효율적인 면이 있다.

~~~javascript
function printId() {
  console.log(this.id);
}

document.querySelector('#post-1').addEventListener('click', printId);
document.querySelector('#post-2').addEventListener('click', printId);
document.querySelector('#post-3').addEventListener('click', printId);
document.querySelector('#post-4').addEventListener('click', printId);
document.querySelector('#post-5').addEventListener('click', printId);
document.querySelector('#post-6').addEventListener('click', printId);

~~~

6개 말고도 100개 1000개 라고 쳤을 때, 실행속도 저하 뿐만아니라 코드 작성의 불편함까지 겸비하고 있다.

**동적으로 li 요소가 추가되는 경우, 아직 추가되지 않은 요소는 DOM에 존재하지 않으므로 이벤트 핸들러를 바인딩할 수 없다.** 이러한 경우 이벤트 위임을 사용한다.

>  다수의 자식 요소에 각각 이벤트 핸들러를 바인딩하는 대신 하나의 부모 요소에 이벤트 핸들러를 바인딩하는 방법

실제로 이벤트를 발생시킨 요소를 알아내기 위해서는 `Event.target`을 사용한다.

~~~html
<!DOCTYPE html>
<html>
<body>
  <ul class="post-list">
    <li id="post-1">Item 1</li>
    <li id="post-2">Item 2</li>
    <li id="post-3">Item 3</li>
    <li id="post-4">Item 4</li>
    <li id="post-5">Item 5</li>
    <li id="post-6">Item 6</li>
  </ul>
  <div class="msg">
  <script>
    const msg = document.querySelector('.msg');
    const list = document.querySelector('.post-list')

    list.addEventListener('click', function (e) {
      // 이벤트를 발생시킨 요소
      console.log('[target]: ' + e.target);
      // 이벤트를 발생시킨 요소의 nodeName
      console.log('[target.nodeName]: ' + e.target.nodeName);

      // li 요소 이외의 요소에서 발생한 이벤트는 대응하지 않는다.
      if (e.target && e.target.nodeName === 'LI') {
        msg.innerHTML = 'li#' + e.target.id + ' was clicked!';
      }
    });
  </script>
</body>
</html>

~~~

<br/>

### 기본 동작의 변경

#### Event.preventDefault() <a id="d8"></a>

> 기본 동작을 중단 시킨다.
>
> 예를들어 폼을 submit 하거나 a태그의 링크를 클릭하면 페이지 이동이 발생하는데 이를 중단시킨다.

~~~html
<!DOCTYPE html>
<html>
<body>
  <a href="http://www.google.com">go</a>
  <script>
  document.querySelector('a').addEventListener('click', function (e) {
    console.log(e.target, e.target.nodeName);

    // a 요소의 기본 동작을 중단한다.
    e.preventDefault();
  });
  </script>
</body>
</html>

~~~

<br/>

#### Event.stopPropagation() <a id="d9"></a>

> 어느 한 요소를 이용해 이벤트를 처리한 후 이벤트가 부모 요소로 이벤트가 전파되는 것을 중단시키기 위한 메소드.
>
> 부모 요소에 동일한 이벤트에 대한 다른 핸들러가 지정되어 있을 경우 사용된다.

~~~html
<!DOCTYPE html>
<html>
<head>
  <style>
    html, body { height: 100%;}
  </style>
</head>
<body>
  <p>버튼을 클릭하면 이벤트 전파를 중단한다. <button>버튼</button></p>
  <script>
    const body = document.querySelector('body');
    const para = document.querySelector('p');
    const button = document.querySelector('button');

    // 버블링
    body.addEventListener('click', function () {
      console.log('Handler for body.');
    });

    // 버블링
    para.addEventListener('click', function () {
      console.log('Handler for paragraph.');
    });

    // 버블링
    button.addEventListener('click', function (event) {
      console.log('Handler for button.');

      // 이벤트 전파를 중단한다.
      event.stopPropagation();
    });
  </script>
</body>
</html>

~~~

~~~~
Handler for button.

~~~~

button 요소의 이벤트의 전파(버블링)을 중단시키기 위해 Event.stopPropagation 메소드를 이용하였다.

<br/>

#### preventDefault & stopPropagation  <a id="d10"></a>

기본 동작의 중단과 버블링 또는 캡처링의 중단을 동시에 실시하는 방법은 아래와 같다.

```javascript
return false;

```

단 이 방법은 jQuery를 사용할 때와 아래와 같이 사용할 때만 적용된다.

~~~html
<!DOCTYPE html>
<html>
<body>
  <a href="http://www.google.com" onclick='return handleEvent()'>go</a>
  <script>
  function handleEvent() {
    return false;
  }
  </script>
</body>
</html>

~~~

```html
<!DOCTYPE html>
<html>
<body>
  <div>
    <a href="http://www.google.com">go</a>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.3/jquery.min.js"></script>
  <script>

  // within jQuery
  $('a').click(function (e) {
    e.preventDefault(); // OK
  });

  $('a').click(function () {
    return false; // OK --> e.preventDefault() & e.stopPropagation().
  });

  // pure js
  document.querySelector('a').addEventListener('click', function(e) {
    // e.preventDefault(); // OK
    return false;       // NG!!!!!
  });
  </script>
</body>
</html>

```

이 방법은 기본 동작의 중단과 이벤트 흐름의 중단 모두 적용되므로 
이 두가지 중 하나만 중단하기 원하는 경우는 preventDefault() 또는 stopPropagation() 메소드를 개별적으로 사용한다.

<br/>                                                                                                                                                                                                                                                