![quiz-2174368_1280](https://user-images.githubusercontent.com/31315644/68214647-3026ee80-0021-11ea-8e28-41a3aa5de18a.png)

------

문제 출처 : poiema

### Tabs UI

![popup-ui](https://poiemaweb.com/assets/fs-images/exercise/popup-ui.gif)

<br/>

~~~html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Popup</title>
  <style>
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400);

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

    /* CSS 작성 바랍니다. */

    .overlay{
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0,0,0,.3);
      width: 100vw;
      height: 100vh;
      display: none;
      z-index: 10;
    }

    .popup {
      background: white;
      width: 700px;
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 30px 20px;
      margin: 0 auto;
      box-shadow: 0 35px 15px 0 rgba(0,0,0,.3);
      transform: translate(-50%, -50%);
      display: none;
      z-index: 15;
    }

    .btn-close{
      position: absolute;
      top: 0;
      right: 0;;
    }
  </style>
</head>
<body>
  <h1>JavaScript Popup</h1>

  <div class="popup">
    <h1>JavaScript Popup</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
    <button class="btn-close">X</button>
    <input type="text">
    <button class="btn-ok">OK</button>
    <button class="btn-cancel">Cancel</button>
  </div>
  <div class="overlay"></div>

  <button class="toggle-popup">show popup</button>

  <p class="popup-message"></p>
  <script>
    const $popup = document.querySelector('.popup');
    const $togglePopup = document.querySelector('.toggle-popup');
    const $overlay = document.querySelector('.overlay');
    const $input = document.querySelector('.popup > input');
    const $popupMessage = document.querySelector('.popup-message');

    // 기능
    const showDisplay = () => {
      $overlay.style.display = 'inline';
      $popup.style.display = 'inline';
    };

    const nonShowDisplay = () => {
      $overlay.style.display = 'none';
      $popup.style.display = 'none';
    };

    // 이벤트
    $togglePopup.onclick = () => {
      showDisplay();
    };

    $overlay.onclick = () => {
      nonShowDisplay();
    };

    $popup.onclick = ({ target }) => {
      if (target.classList.contains('btn-cancel') || target.classList.contains('btn-close')) {
        nonShowDisplay();
      }
      if (target.classList.contains('btn-ok')) {
        $popupMessage.textContent = `form popup : ${$input.value}`;
        nonShowDisplay();
        $input.value = '';
      }
    };
  </script>
</body>
</html>
~~~

<br/>

#### 주요 코드

JS 보다 css때문에 힘들었던 문제다.

1. 팝업시 나타나는 회색 배경 처리

   ~~~css
   .overlay{
     position: absolute;
     top: 0;
     left: 0;
     background: rgba(0,0,0,.3);
     width: 100vw;
     height: 100vh;
     display: none;
     z-index: 10;
   }
   ~~~

   position을 absolute하여 화면에서 띄우고 화면의 넓이 , 높이를 전부다 다 100view로 맞춰놓았다.

   클릭시 display만 바꿔주면 되기 때문에 `none`처리 하였고 마크업상 overlay 나중에 나오기 때문에 z-index를 낮게 줌으로써 뒤에서 보이게끔 설정하였다.

   <br/>

2. 팝업시 나타는 화면 처리

   ~~~css
   .popup {
     background: white;
     width: 700px;
     position: absolute;
     top: 50%;
     left: 50%;
     padding: 30px 20px;
     margin: 0 auto;
     box-shadow: 0 35px 15px 0 rgba(0,0,0,.3);
     transform: translate(-50%, -50%);
     display: none;
     z-index: 15;
   }
   ~~~

    팝업 클릭시 나타나는 화면은 현재 보는 화면에서 정중앙에 띄워서 나타나야 되기 때문에, position : absolute 를 주었고, 현재 위치에 중앙 위치인 top 50% , left 50% 에 transform: translate(-50%,-50%)를 줘서 정확히 반에 위치하게끔 설정하였다.

   overlay보다 위에 있어야되기 때문에 z-index를 15주로 설정하였다.

   <br/>

3. 삭제 버튼

   ~~~css
   .btn-close{
     position: absolute;
     top: 0;
     right: 0;;
   }
   ~~~

   삭제 버튼의 위치가 오른쪽 상단에 걸쳐야되기 때문에 absolute로 하여 top:0 right:0을 주웠다.