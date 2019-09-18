![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)

## HTML Study 07

- article태그

- 강조 태그 ( em , strong )

- font weight 가중치 

- 데이터는 숨기고 이미지를 표기하는 IR 기법. 종류 및 장단점

- agent-style 시 확인해야할 점들.

- float 대신에 inline-block 사용시 주의점.

- 밑줄 gradient 만드는 방법들.

- 애니메이션 방법들

  

----

<br/>

### article 태그

> article 요소는 독립적이고 재배포하며 재사용 가능한 , 홀로 설 수 있는 내용들을 위주로 담는다.
>
> article 내부에는 header태그,footer등을 삽입할 수 있다.
>
> 주로 블로그 글, 포럼 글, 뉴스 기사, RSS피드 등이 article에 해당된다.

<br/><br/>

### 강조 태그

<em> 강조하는 태그 em </em>

<strong> em보다 더 큰 강조를 하는 strong </strong>

<b> 의미없이 글자크기만 굵게 하는 b태그 </b>

<i>의미없이 기울이는 i태그</i>

<cite> 주로, 작품명(그림명, 책명, 영화명 등)을 표시하거나 인용할 때 사용 </cite>

> 시멘틱점 관점으로 strong이 em보다 강조도가 높다.
>
> 디자인적 요소로는 em은 기울임, b와 strong은 굵게 표시한다.
>
> cite태그는 작품명 ,인용시 사용한다.
>
> b태그는 단순히 의미는없고 굵게만 표시한다.
>
> i태그는 단순히 의미없고 기울이게만 표시한다.

<br/><br/>

### font-weight 가중치

[웹 폰트 파헤치기](http://www.beautifulcss.com/archives/431)

웹 폰트는 그룹화가 가능하다.

예를 들어보면, 다음과 같다.

~~~~~css
@font-face {
    font-family: Ngothic-Regular;
    src: url('NanumGothic-Regular.woff') format('woff');
}
 
@font-face {
    font-family: Ngothic-Bold;
    src: url('NanumGothic-Bold.woff') format('woff');
}
 
@font-face {
    font-family: Ngothic-ExtraBold;
    src: url('NanumGothic-ExtraBold.woff') format('woff');
}
 
@font-face {
    font-family: Ngothic-Italic;
    src: url('NanumGothic-Italic.woff') format('woff');
}
~~~~~

나눔고딕 보통, 굵게 , 아주굵게, 이탤릭 을 사용한다고 가정시 보통 웹폰트의 이름을 모두 다르게 붙이고 필요에 따라 각 스타일을 호출한다.

<br/>

<strong>이와 같이 같은 나눔고딕들을 묶어서 사용하는 방법이 바로 font-weight 다. 다음 코드를 보자. </strong>

~~~~css
@font-face {
  font-family: "Nanum Gothic";
  font-weight: 400;
  src: url('NanumGothic-Regular.woff') format('woff');
}
 
@font-face {
  font-family: "Nanum Gothic";
  font-weight: 700;
  src: url('NanumGothic-Bold.woff') format('woff');
}
 
@font-face {
  font-family: "Nanum Gothic";
  font-weight: 800;
  src: url('NanumGothic-ExtraBold.woff') format('woff');
}
 
@font-face {
  font-family: "Nanum Gothic";
  font-weight: 400;
  font-style: italic;
  src: url('NanumGothic-Italic.woff') format('woff');
}
~~~~

위와 같이 font-family는 나눔고딕이라는 그룹으로 맺고 각 weight와 style을 통해 각 글꼴을 선택할 수 있게된다.

~~~~~html
body { font-family: "Nanum Gothic" }
 
h1 { font-weight: 400 } /* NanumGothic-Regular.woff */
h2 { font-weight: 700 } /* NanumGothic-Bold.woff */
h3 { font-weight: 800 } /* NanumGothic-ExtraBold.woff */
h4 { font-weight: 400; font-style: italic } /* NanumGothic-Italic.woff */
~~~~~

<br/><br/>

### 데이터는 숨기고 이미지를 표기하는 IR 기법. 종류 및 장단점

 글자 위에 이미지로 해당 글자를 가려야 할 경우. 사용하는 기법들. 

글자를 안사용하고 바로 이미지만 넣을 수는 있으나 SEO관점에서 불리하다.

따라서 글자는 적되 이미지를 특정기법을 이용하여 덮음으로써 SEO관점과 시각적 요소 모두 챙긴다.

<br/>

1.  padding을 활용한  IR 기법 

 기본적인 방법. 높이를 0으로 줘서 그림 아래로 텍스트를 내려버린다. 그 후 overflow:hidden 속성을 이용하여 텍스트를 가려버린다.

단점, 네트워크 오류시 시각이미지를 못불러온다. 또한 overflow: hidden 을 주었기 때문에 이미지도 안보이고 해당 텍스트 또한 안보이기 때문에 무슨 이미지인지 전혀 유추를 할 수 없다.

~~~~css
@charset "utf-8";
/* padding을 활용한  IR 기법 */
.brand1{
    background:yellow url(../images/title.png) no-repeat;
    height: 0;
    width: 290px;
    padding-top: 195px;
    overflow: hidden;
}



/* 위 2가지 트릭의 단점 -> 네트워크의 오류로 인해 이미지가 안날라올경우 문제가 있다. */

~~~~

<br/>

2. text-indent를 이용한 IR 기법

  넓이를 지정해놓고 , 들여쓰기를 넓이만큼 준다. 개행 금지 속성을 이용하여 텍스트가 다음 줄로 못내려가게 막고 화면을 넘어가버린 텍스트는 overflow:hidden 속성을 통해 가려버린다.

단점, 네트워크 오류시 시각이미지를 못불러온다. 또한 overflow: hidden 을 주었기 때문에 이미지도 안보이고 해당 텍스트 또한 안보이기 때문에 무슨 이미지인지 전혀 유추를 할 수 없다.

~~~~css
/* text-indent 트릭을 이용한 IR 기법 */
.brand2{
    background:pink url(../images/title.png) no-repeat;
    height: 195px;
    width: 290px;
    text-indent: 290px;
    white-space: nowrap;
    overflow: hidden;
}
~~~~

<br/>

3. position 트릭

   가상요소를 이용하여 텍스트는 자리 그대로 유지하고 absolute한 가상요소 이미지로 덮어씌운다.

   네트워크 에러시 이미지가 안날라와도 가려져있던 텍스트가 보이게 됨으로써 무슨 텍스트인지 유추가 가능하다.

~~~~css

/* 한줄일때만 이용 가능한 트릭. position트릭. 
네트워크 오류로 이미지가 안날라올경우 가상요소는
 안보이고 덮어쓰기 전의 내용이 보인다. */

.brand3{
    background: lime;
    height: 195px;
    line-height: 195px; 
    width: 290px;
    text-align: center;
    font-size : 16px;
    font-weight: 400;
    position : relative;
}

.brand3::after{
    content: "";
    position: absolute;
    background: orange url(../images/title.png);
    width: 100%;
    height : 100%;
    top: 0;
    left : 0;
}
~~~~

<br/><br/>

### agent-style 시 확인해야할 점들.

1. box 모델
2. 겹침 문제
3. 오타
4. 상속 이슈
5. 레이아웃 (margin, padding, position , display , float ...)

<br/><br/>

### inline-block 으로 레이아웃 작업시 문제점들

 inline-block으로 레이아웃시 다음과 같은 문제가 발생한다.

![inline-block단점](https://user-images.githubusercontent.com/31315644/64980561-0ab91680-d8f5-11e9-8b23-ea3ee108c17c.jpg)

![inline-block단점2](https://user-images.githubusercontent.com/31315644/64980563-0db40700-d8f5-11e9-8e19-e7ddf5db0664.jpeg)



주의 깊게 봐야되는 점은 묻고답하기 오른쪽에 존재하는 Border 선과의 사아아알짝 떨어진 여백이다. 

보통 li태그를 일자로 나열하는 방법으로 inline-block으로 지정하고서 구분선을 주기 위해 border를 주게되면 위와 같은 여백이 생기게 된다. 이 부분을 아래와 같이 margin값을 -로 주면서 해결을 할 수 있다.

~~~~css
    margin-left: -6px; /*극단적이게 큰 값을 줌.*/
~~~~

![해결법](https://user-images.githubusercontent.com/31315644/64980578-0f7dca80-d8f5-11e9-8cab-07a666f8ad2b.jpeg)

 웬만해서는 float형태나 다른 레이아웃을 권장한다.

<br/><br/>

### 밑줄 gradient 만드는 방법들.

1. 가상 요소 absolute 를 이용한 방법.

   밑줄을 그리고 싶은 곳에 가상요소를 하나 띄우고 absolute화 한후 높이와 넓이를 맞춰서 대치하는 방법.

   ~~~~css
   .news::before{
       content: "";
       background: red linear-gradient(to right,#aaa,#fff);
       position : absolute;
       top : 30px;
       left : 0;
       width: 80%;
       height: 1px;
   }
   ~~~~

   <br/>

2. border 선 자체에 gradient를 설정 하는 방법

   ~~~~~css
   .news-heading{
       margin : 20px 0;
       padding : 0 0 15px 0;
       width : 80%;
       font-size : 1.5rem;
       color: #bb7b13;
       border-style: solid;
       border-image: linear-gradient(to right, rgb(168, 167, 167), rgb(228, 228, 228));
       border-image-slice: 0 0 1 0;
       border-image-width: 0 0 1px 0;
       border-left: none;
   }
   ~~~~~



<br/>

<br/>

### 애니메이션 방법들

![save](https://user-images.githubusercontent.com/31315644/65040310-08a39600-d98f-11e9-8cb6-513d9c9a33ac.png)

[CSS 애니메이션 사용하기 참고](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Animations/Using_CSS_animations)

~~~css
/* 1번 Fade Slide In From Top */		
@keyframes fade-slide-in-from-top {
  0% {
    transform: translateY(-4rem);
    opacity: 0;
  }
  100% {
    transform: none;
    opacity: 1;
  }
}

.app-header {
  opacity: 0;
  animation: 
    fade-slide-in-from-top
    0.35s                 
    0.4s                  
    ease-out              
    forwards;             
}
~~~



~~~~~css
/* 2번 Fade Slide In From Left */
@keyframes fade-slide-in-from-left {
  0% {
    transform: translateX(-4rem); /*right는 transform: translatxX(4rem);*/
    opacity: 0;
  }
  100% {
    transform: none;
    opacity: 1;
  }
}

.brand {
  opacity: 0;
  animation: 
    fade-slide-in-from-left
    0.35s                  
    0.4s                   
    ease-out               
    forwards;              
}
~~~~~



~~~~css
/* 3번 Fade In & out */
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

button[title="메뉴 열기"] {
  opacity: 0;
  animation: 
    fade-in   /* name */
    0.35s     /* duration */
    0.4s      /* delay */
    ease-out  /* timing function */
    forwards; /* fill mode */
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.button[title="메뉴 열기"] {
  animation: 
    fade-out
    0.35s                  
    0.4s                   
    ease-out               
    forwards;              
}
~~~~



~~~~~css
/* 4번 Fade Slide In From Bottom */
@keyframes fade-slide-in-from-bottom {
  0% {
    transform: translateY(4rem);
    opacity: 0;
  }
  100% {
    transform: none;
    opacity: 1;
  }
}

.ediya-menu__item {
  opacity: 0;
  animation: 
    fade-slide-in-from-bottom
    0.35s                  
    0.4s                   
    ease-out               
    forwards;              
}

~~~~~

~~~css
/* 5번 Motion Sequnce Animation */
.ediya-menu__item {
  /* 0% */
  opacity: 0;
  transform: translateY(4rem);
  /* 100% */
  animation: transform-none 0.3s 0.85s cubic-bezier(0.6, 0.01, 0.16, 1) forwards;
}
 
/* 시간 차 애니메이션 */
.ediya-menu__item:nth-child(1) { animation-duration: 0.8s }
.ediya-menu__item:nth-child(2) { animation-duration: 1.2s }
.ediya-menu__item:nth-child(3) { animation-duration: 1.6s }
.ediya-menu__item:nth-child(4) { animation-duration: 2.0s }

~~~

[그외 사이트 참조](https://seulbinim.github.io/WTC/index.html#/3/18)

1. Effective Management  애니메이션 코드 수 줄이고 관리하기.
2. Text Sequencing Motion
3. Stop & Play Animation for Everyone (애니메이션 껏다 켜기 버튼기능)