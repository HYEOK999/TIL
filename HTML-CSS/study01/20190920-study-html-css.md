![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)

## HTML Study 10

- calc
- flex-basis
- 반응형 웹페이지
- flex 이용
- 반응형 콘텐츠 -> 이미지&비디오 , iframe
- grid 이용

------

### 오늘의 학습 깨달음

1. 레이아웃 구성 시 여라가지 flex 나 grid시스템을 사용할 수 있지만, 브라우저의 지원 유형을 잘 생각해보아야 한다.

-----------------------------

~~~~html
<body>
    <div class="container">
        <header class="header" style="background:yellow;">헤더</header>
        <nav class="navigation" style="background:pink;">네비게이션</nav>
        <main class="main-content" style="background:skyblue;">메인 콘텐츠</main>
        <aside class="ad" style="background:orange;">광고</aside>
        <footer class="footer" style="background:lime;">푸터</footer>
    </div>
</body>
~~~~

<br/>

### calc

(100vh - 100px);

### flex-basis



### 반응형 웹페이지

 반응형 웹페이지는 말 그대로 유동적으로 변화가 가능한 웹페이지를 의미한다.

 현재 시대는 모바일 ,  테블릿 , 데스크탑 과 같은 여러가지 화면을 다루고 있기 때문에 유동적으로 각 기기에 맞는 화면을 송출할 줄 알아야만 한다.

반응형 웹페이지 제작시 주로 다음과 같이 이용한다.

@media screen and (길이){

​	변할값

}

~~~~~css
@media screen and (min-width:50em){
    /* 800 헤더 */
    .header{
        width : 850px;
    }
}
~~~~~



위 웹페이지의 fontsize가 16px이라 가정을 지었을 경우. 799px에서 800px로 넘어가는 순간 header 부분의 width가 850px로 넘어간다. 

보통의 웹페이지는 flex,grid같은 시스템을 이용하여 

min-width:800px (50em) / min-width:1024px (64em) / min-width:1600px (100em)  [font-size : 16px기준]

로 설정해서 반응형을 많이 구축한다. 

<br/>

### flex 이용

calc(100vh - 100px)

~~~~css
/* 모바일 스타일 */
    /* 모바일 헤더 */
    .header{
        /* grow shrink basis */
        flex-basis: 100%;
        height: 50px;
    }
    /* 모바일 네비게이션 */
    .navigation{
        height: 50px;
        flex-basis: 100%;
    }
    /* 모바일 메인 콘텐츠 */
    .main-content{
        height: calc(100vh - 200px);
        flex-basis: 100%;
    }
    /* 모바일 광고 */
    .ad{
        flex-basis: 100%;
        height: 50px;
    }
    /* 모바일 푸터 */
    .footer{
        flex-basis:100%;
        height: 50px;
    }

/* 테블릿 스타일 */
/* 50em -> 50글자까지 , 폰트사이즈 16px일경우 800px까지 */
@media screen and (min-width:50em){
    /* 800 헤더 */
    .header{
        flex-basis: 70%;
    }
    /* 800 네비게이션 */
    .navigation{
        flex-basis:30%;
    }
    /* 800 메인 콘텐츠 */
    .main-content{
        flex-basis:100%;
        height: calc(100vh - 150px);
    }
    /* Tablet 레이아웃 순서 */
    .header, .navigation, .ad{
        order: -1;
    }
}

/* 랩탑 스타일 */
@media screen and (min-width:64em){
    /* 랩탑 순서 */
      .navigation{
        order: -2;
    }

    /* 랩탑 헤더 */
    .header{
        flex-basis: 100%;        
    }

    /* Laptop 내비게이션 */
    .navigation{
        flex-basis: 100%;
    }

    /* 랩탑 메인 콘텐츠 */
    .main-content{
        flex-basis: 70%;        
    }

    /* 랩탑 광고 */
    .ad{
        flex-basis: 30%;        
        height: calc(100vh - 150px);
    }
}

/* 와이드 랩탑 스타일 */
@media screen and (min-width:100em){
    /* 와이드 랩탑 헤더 */
    .navigation, .ad{
        order: 0;
    }
    .navigation, .main-content, .ad{
        height: calc(100vh - 100px);
    }
    /* 와이드 네비게이션  */
    .navigation{
        flex-basis: 30%;
      }

    /* wide 메인 콘텐츠 */
    .main-content{
        flex-basis: 50%;
    }

    /* wide 광고 */
    .ad{
        flex-basis: 20%;
    }
}

~~~~



### 반응형 콘텐츠 : 이미지&비디오

~~~~~css

~~~~~





### 반응형 콘텐츠 : iframe

~~~~css

~~~~





### grid 이용

~~~css

~~~

