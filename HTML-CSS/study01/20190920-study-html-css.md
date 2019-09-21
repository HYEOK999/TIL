![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)

## HTML Study 10

- viewport  VS %
- calc
- flex-basis
- 반응형 웹페이지
- flex 이용
- 반응형 콘텐츠 -> 이미지&비디오 , iframe
- grid 이용

------

### 오늘의 학습 깨달음

1. 레이아웃 구성 시 여라가지 flex 나 grid시스템을 사용할 수 있지만, 브라우저의 지원 유형을 잘 생각해보아야 한다.

2. padding의 %는 width 기준이다. 즉, 가로의 %기준 만큼 패딩이 늘어난다. 

3. iframe은 이미지처럼 max-width 옵션이 작동안한다.

4. 최대 넓이가 1600px 이상 넘어갔을 경우 화면 중앙으로 오게하는 방법

   ~~~css
           max-width: 1600px;
           margin: 0 auto;
   ~~~

   

------------------

### viewport VS %

>viewport 는 화면대비 %비율이라 생각하면 편하고, 
>
>%는 부모영역대비의 %비율이라 생각하면 편하다.
>
>한, 예로 %는 부모영역보다 크게 %를 주어도 부모영역을 벗어날수는 없지만 viewport는 자식요소에 더 큰 viewport값을 줄 경우 부모요소를 넘어갈 수 있다. 

![viewport VS %](https://user-images.githubusercontent.com/31315644/65379689-15b1e380-dd07-11e9-87eb-28221ffb030c.jpeg)

초록색 영역이 %비율이고, 보라색 영역이 viewport 이다.

<br/>

### calc

 단순하게 생각하여, 사칙연산을 실행하고 계산값을 돌려주는 함수이다.

calc(100vh - 100px); 와 같이 사용한다.

<br/>

### flex-basis

1. flex item이 된 컨텐츠들에게 적용할 수 있는 flex속성이다.
2. flex-basis각 적용될 경우 기본 width값은 무의미하다.
3. flex item이 적용된 width , height를 사용하고 싶다면 flex:auto 를 지정해주어야한다.
4. flex-basis를 생략해면 flex-basis:auto 가 된다.
5. flex-basis:0 과 flex-basis:auto의 차이는 auto는 width 만큼 item을 관리하며, flex-basis는 진짜 item 사이즈를 0으로 만든다. 단, 텍스트같은 콘텐츠가 있을 경우 콘텐츠 크기 만큼 줄게된다.
6. flex-grow는 기본값이 0 / flex-shrink는 기본값이 1이다.

<br/>

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

![flex](https://user-images.githubusercontent.com/31315644/65379696-26faf000-dd07-11e9-9891-20a66530500f.jpeg)

<br/>

### 반응형 콘텐츠 : 이미지&비디오

이미지 소스(비디오도 동작방식은 같다.)

~~~~~css
@charset "utf-8";
/* 반응형 이미지 */

.container{
    display: flex;
    flex-wrap: wrap;
}

.rwd-container{
    flex-basis: 50%;
    border: 10px solid #aaa;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.rwd-img{
    max-width: 100%;
    height: auto;
}
~~~~~

![rwd-img01](https://user-images.githubusercontent.com/31315644/65379853-6aa32900-dd0a-11e9-9460-7483e1255d88.jpeg)

<br/>

### 반응형 콘텐츠 : iframe

iframe은 비디오와는 다르게 화면 비율에 대해 신경을 써주어야만 한다.

~~~~html
    <div class="container">
        <figure class="rwd-container">
            <!-- frameborder="0" 제거 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 제거 -->
            <div class="rwd-iframe-container">
                <iframe class="rwd-iframe" width="560" height="315" src="https://www.youtube.com/embed/rNDmpbs4JTc" allowfullscreen></iframe>
            </div>
        </figure>
        <figure class="rwd-container">
            <!-- frameborder="0" 제거 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 제거 -->
            <div class="rwd-iframe-container">
                <iframe class="rwd-iframe"width="560" height="315" src="https://www.youtube.com/embed/nSHs3241p7E" allowfullscreen></iframe>
            </div>
        </figure>
        <figure class="rwd-container">
            <!-- frameborder="0" 제거 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 제거 -->
            <div class="rwd-iframe-container">
                <iframe class="rwd-iframe" width="560" height="315" src="https://www.youtube.com/embed/Vtj-T2c6jf0" allowfullscreen></iframe>
            </div>
        </figure>  
        <figure class="rwd-container">
                <!-- frameborder="0" 제거 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 제거 -->
            <div class="rwd-iframe-container">
                <iframe class="rwd-iframe" width="560" height="315" src="https://www.youtube.com/embed/G-12mgNUwh0" allowfullscreen></iframe>
            </div>
        </figure>  
</div>
~~~~

~~~~~css
@charset "utf-8";
.container{
    display: flex;
    flex-wrap: wrap;
}

.rwd-container{
    border: 10px solid teal;
    box-sizing: border-box;
    margin: 0;
    padding : 0;
    flex-basis: 30%;
    flex-grow : 1;
}

.rwd-iframe-container{
    width: 100%;
    padding-top: 56.25%;
    height: 0 !important;
    background: yellow;
    position: relative;
}

.rwd-iframe{
    /* iframe은 이미지처럼 max-width 옵션이 작동안한다. */
    max-width: 100%;
    height: auto;
    position: absolute;
    top : 0;
    left : 0;
    width: 100%;
    height: 100%;
}
~~~~~



<br/>

### grid 이용

grid시스템 이용시 Chrome 보다는 firefox에서 확인한는게 더 편한다.

부모요소에서 display: grid; 를 쓰면서 시작할 수 있다.

repeat함수 ->  repaet(반복할횟수, 크기[1 2) 

- 크기 1개만 적을시 1개만 횟수만큼, 크기 1 2 다적을 시 배열식으로 적용한다.
fr = fraction 분수단위 

grid에서 순서를 지정해주고 싶다면 order를 쓰면 된다. 모든 기본 order값은 0이다.

grid-auto-rows : 크기 / 콘텐츠 갯수만큼 자동적으로 적은 크기의 행을 만들어준다.

grid-template-columns : 크기 / 크기 갯수만큼 적어 열을 생성한다.

grid-template-rows : 크기  / 크기 갯수만큼 적어 행을 생성한다.

grid-column-gap: 크기 / 각 콘텐츠 사이에 적은 크기의 마진을 발생시킨다.

1. 라인 넘버 지정방법.

~~~css
.container{
  			display: grid
        grid-template-columns: 1fr 3fr 1fr;  /* 3개의 열을 각각 5분의 1,3,1크기로 선언한다. */
        grid-template-rows: repeat(3, 50px); /* 3개의 행을 50px크기로 선언한다.*/
    }   
.header{
  	/*	 grid-row : 1/2;
  		   grid-column : 1/4;  */
    /* row시작점 column시작점 row끝나는점 column끝나는점*/
       grid-area: 1/1/2/4;
    }
		/* 위에 구문은 병합 span으로도 아래처럼 사용이 가능하다. */
.header{
  		grid-ared : 1/1/span 1/span 3;
	}
~~~

2. area 지정방법.

~~~css
@media screen and (min-width:50em){
    .container{
        margin : 0 auto;
        max-width: 1600px;
        grid-template-columns: 1fr 3fr 1fr;
        grid-auto-rows: minmax(50px,auto);
      /* 최소 높이 50px이고 글자(텍스트 -콘텐츠)가 늘어남에 따라 auto로 상자가 늘어남. */
      /* 아래에서 grid-area: 이름 ; 으로 지정한 것을 grid-template-areas에 각각 넣어준다. */
        grid-template-areas: "header header header"
        "navigation content ad"
        "footer footer footer";
    }
} 
.container{
    display: grid;
}

.header{
    grid-area: header;
}

.navigation{
    grid-area: navigation;
}

.content{
    grid-area: content;
}

.ad{
    grid-area: ad;
}

.footer{
    grid-area: footer;
}
~~~

gird 시스템 이용시 짧게 사용할 경우 area:이름 기법이 훨씬 간편하지만, 열과 행이 많을 경우에는 line기법이 수월하다.