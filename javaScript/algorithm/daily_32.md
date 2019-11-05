![quiz-2174368_1280](https://user-images.githubusercontent.com/31315644/68214647-3026ee80-0021-11ea-8e28-41a3aa5de18a.png)

------

문제 출처 : poiema

### Toggle side nav

![img](https://poiemaweb.com/assets/fs-images/exercise/toggle-side-nav.gif)

- 요구 사항

  자바스크립트를 사용하여 버튼이 클릭되었을 때 사이드 내비게이션이 토글되도록 구현한다.

~~~html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Toggle side nav</title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css">
  <style>
    html, body {
      height: 100%;
      margin: 0;
    }

    .container {
      position: relative;
      overflow-x: hidden; /* 가로 scroll bar 방지 */
      width: 100%;
      height: 100%;
    }

    .main, .side-nav {
      position: absolute;
      top: 0;
      height: 100%;
      transition: transform 0.8s;
    }

    .main {
      left: 0;
      width: 100%;
      background: antiquewhite;
    }

    .side-nav {
      left: -300px;
      width: 300px;
      background: rebeccapurple;
    }

    .active > .main,
    .active > .side-nav {
      transform: translate3d(300px, 0, 0);
    }

    .toggle {
      font-size: 2em;
      color: maroon;
      margin: 10px;
      cursor: pointer;
      transition: transform 0.5s;
    }

    .active .toggle {
      transform: rotate(180deg);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="side-nav"></div>
    <div class="main">
      <i class="toggle fas fa-arrow-circle-right"></i>
    </div>
  </div>
  <script>
    const $toggle = document.querySelector('.toggle');
    const $container = document.querySelector('.container');

    $toggle.onclick = () => {
      $container.classList.toggle('active');
    };
  </script>
</body>
</html>
~~~

<br/>

### Scrolling goto top

![popup-ui](https://poiemaweb.com/assets/fs-images/exercise/scrolling-goto-top.gif)



- [Window.pageYOffset](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageYOffset)
- [Window.scrollTo()](https://developer.mozilla.org/ko/docs/Web/API/Window/scrollTo)
- [Window.scroll()](https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll)

~~~html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>scrolling-goto-top</title>
  <style>
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400);
    @import url(https://use.fontawesome.com/releases/v5.5.0/css/all.css);

    body {
      font-family: 'Open Sans';
      font-weight: 300;
      background-color: #D6E1E5;
    }

    h1 {
      color: #DB5B33;
      font-weight: 300;
      text-align: center;
    }

    .scoll-icon {
      position: fixed;
      left: 50%;
      bottom: 20px;
      font-size: 36px;
      cursor: pointer;
      animation: glow 4s infinite;
      display: none;
    }

    @keyframes glow {
      0% {
        opacity: 1;
      }

      50% {
        opacity: 0.3;
        transform: translateY(10px);
      }
    }
  </style>
</head>
<body>
  <h1>JavaScript Scrolling goto top</h1>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repudiandae quia. Veniam amet fuga, eveniet velit ipsa repudiandae nemo? Sit dolorem itaque laudantium dignissimos, rerum maiores nihil ad voluptates nostrum.
  </p>

  <div class="scoll-icon fa fa-angle-double-up"></div>

  <script>
    const $scollIcon = document.querySelector('.scoll-icon');

    window.onscroll = () => {
      $scollIcon.style.display = window.pageYOffset > 200 ? 'inline' : 'none';
    };

    $scollIcon.onclick = () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };
  </script>
</body>
</html>
~~~

<br/>