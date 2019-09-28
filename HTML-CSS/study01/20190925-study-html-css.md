![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)

## HTML Study 13

- css : filter ( 흑백처리 , blur 효과 등등 )
- tab-index
- margin 겹침 현상
- background size
- 중앙 정렬 처리하는 방법 (수직 정렬등)
- aria-label , aria-labelby ( vs title )
- aria-expended , aria-haspopup
- iframe 사용시 주의점
- fr 단위

-----------------------------------

1. 반응형 디자인을 할때는 px보다는 em, rem같은 단위를 써야 유연해지기에 좋다.
2. grid에서는 fr단위로 쉽게 조절이 가능하다.
3. 수직중앙정렬시 translateY : -50%를 이용한다.
4. iframe은 퍼올때부터 대부분 사이즈가 지정이 되어있으므로 유동적인 사이즈를 맞추려면 div로 한번더 감싼다.

---------------

### css : filter ( 흑백처리 , blur 효과 등등 )

 filter 기능은 이미지를 흑백처리하거나 blur, 반전, 밝기 조절등의 효과를 넣는 것을 말한다.

포토샵만큼 디테일하게 효과를 줄 수는 없으나, CSS로 간단한 효과정도는 줄 수 있다.

~~~~css
/* 사용 방법 : 선택자 {filter:효과이름(값)} */

 .blur {filter:blur(20px);-webkit-filter:blur(20px);}
 .grayscale {filter:grayscale(100%);-webkit-filter:grayscale(100%);}
 .sepia {filter:sepia(100%);-webkit-filter:sepia(100%);}
 .saturate {filter:saturate(10);-webkit-filter:saturate(10);}
 .hue-rotate {filter:hue-rotate(100deg);-webkit-filter:hue-rotate(100deg);}
 .invert {filter:invert(10);-webkit-filter:invert(10);}
 .opacity {filter:opacity(0.5);-webkit-filter:opacity(0.5);}
 .brightness {filter:brightness(5);-webkit-filter:brightness(5);}
~~~~

<br/>

<br/>

### tab-index 처리

  div, span 와 같은 focus 초점을 받지 못하는 요소나 혹은 foucs를 받는 요소에게 fouc를 빼앗는 역할을 부여 할 수 있다.

- tabindex="1" : 문서 안에서 가장 먼저 초점을 받게 할 수 있다. (주의점 : 마크업 순서를 거스르기 때문에, autofocusr가 더 적합)
- tabindex="0" : 키보드 초점을 받지 못하는 요소들( div, span 등등) 도 초점을 받도록 해준다.
- tabindex="-1" : 키보드 초점을 받는 요소에게서 초점을 받지 못하도록 만든다.

~~~~css
<div class="test" tabindex="0">
	초점을 받을 수 있게 된다.
</div
~~~~

<br/>

<br/>

### margin 겹침 현상

1. 기본적으로 형제 사이에서 일어난다. (*이 현상은 오직 세로 margin값에서 일어난다.*)

2. 부모 ~ 자식 간에서도 겹침 현상이 발생한다. (둘 중 하나 이상 inline block일때는 겹치지 않는다.)

   이를 가장 쉽게 해결하는 방법은 **부모에게 글자추가, border 혹은 padding,와 같은 시각적효과를 적용하면 해결된다.** 

3. position:absolute / float / grid 와 같은 레이아웃 작업은 margin이 발생하지 않는다.

<br/>

<br/>

### background-size

​	background에 url 형태로 이미지를 불러들였을 경우, 만약 이미지 크기가 맞지 않다면 

background-size를 상자 크기에 맞게 조절하면 된다. ( 보통 100% 로 조절. )

<br/>

<br/>

### 중앙 정렬 처리하는 **방법**

가로 정렬은 보통 text-align , vertical-align 등을 통해 쉽게 배치가 가능하다. 

하지만 가운데 정렬은 배치를 하기 위해서는 padding 값이나 margin값을 정적으로  계산해야만 한다. 

하지만 위와 같은 방법을 이용한다면 쉽게 배치가 가능하다. 보통 absolute를 이용하여 많이 배치한다.

~~~~css
.header{
					 	position: absolute;
            top: 50%;
            transform: translateY(-50%);
}
~~~~

<br/>

<br/>

### aria-label / aria-labelledby

`aria-label` 속성은 값에 '간결한' 설명(string)을 직접 제공한다. 마치 해당 태그가 무슨 역할을 하는지 설명하듯 설명문을 적어주는것과 같다. 예를들면 다음과 같다.

~~~html
<!-- O: 참조할 설명이 없는 경우 -->
<form>
    <input type="search" aria-label="웹툰 검색">
    <button>검색</button>
</form>
~~~

<br/>

`aria-labelledby` 속성은 `ID(s)` 값을 이용하여 '간결한' 내용을 참조(연결)하는 방식으로 설명한다. 보통 `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `button` 요소를 참조하면 적절하다. `aria-label` 속성과 함께 선언하는 경우 `aria-labelledby` 속성이 우선순위가 높기 때문에 보조기기는 `aria-labelledby` 속성을 설명한다. 예를들면 다음과 같다.

~~~html
<!-- O: 설명 참조 -->
<section aria-labelledby="LZ-PATH" hidden>
    <h2 id="LZ-PATH">레진패스란?</h2>
    <p>이 작품의 유료 에피소드 열람 시 자동으로 구매합니다.</p>
</section>

<!-- O: 잘못된 참조 -->
<a id="LZ-PATH" href="#LZ-PATH-TEXT">레진패스란?</a>
<!-- 숨긴처리된 설명은 참조해서는 안된다. -->
<div id="LZ-PATH-TEXT" aria-labelledby="LZ-PATH" hidden>
    <p>이 작품의 유료 에피소드 열람 시 자동으로 구매합니다.</p>
</div>
~~~

`aria-labelledby` 속성으로 숨김 처리한 설명을 참조하면 안 됩니다. 참조가 불가능한 설명은 `aria-label` 속성을 사용한다. 자세한 설명을 참조하면 안 된다다. 자세한 설명은 `aria-descibedby` 속성을 사용.

<br/>

### aria-expanded

 애플리케이션에서 제공되는 메뉴가 하위 메뉴를 포함하고 있 을 경우 현재 하위 메뉴가 접힌 상태인지 펼쳐진 상태인지 스크린리더 사용자에게 정보를 제공 해야 할 경우가 있다. 이때 aria-expanded 속성을 사용하여 접힌 상태라면 false 값을 펼쳐진 상태라면 true 값을 지정할 수 있다.

<br/>

### aria-haspopup

[레진 블로그 설명](https://github.com/lezhin/accessibility/blob/master/aria/README.md#aria-haspopup)

`aria-haspopup` 속성은 요소에 연결되어 있는 팝업(메뉴, 대화상자 등) 정보를 제공한다. 

팝업은 다른 내용 위에 표시하는 블럭을 의미한다.

<br/>

<br/>

### iframe 사용시 주의점

 iframe 태그는 하나의 html 로 생각해야만 한다. 따라서 iframe 태그 자체를 width, height등을 이용해 유연한 배치를 할 수 없다.

만약에 iframe 의 크기를 조절하고 싶다면 div태그로 1번더 감싸야만 한다. 그리고서 해당 div에 absolute를 거는 방식을 이용한다.

~~~~~html
<style>
	.responsive-container{
    position: relative;
    width: 100%;
    height: 0 !important;
  }
  .responsive-iframe{
    position: absolute;
    top:0;
    left:0;
     width: 100%;
    height: 100%; 
    border: 0 none;
  }
  .responsive-iframe-43{
    padding-top: 75%;
  }
  .responsive-iframe-169{
    padding-top: 56.25%;
  }
</style>

<div class="responsive-container responsive-iframe-169">
   <iframe aria-labelledby="video-subject" class="responsive-iframe" src="https://www.youtube.com/embed/umfaXctbqOs"allowfullscreen></iframe>
</div>
~~~~~

<br/><br/>

### fr 단위

fr이란 유연한 크기를 갖는 단위이다.
grid 컨테이너 내의 공간 비율을 분수(fraction)로 나타낸다.

*다만, 지원 브라우저가 낮다.*

사용자가 계산해야 할 부분을 fr을 통해서 쉽고 유연하게 사용할 수 있다.

```css
.grid {
    display: grid;
    grid-template-columns: auto 100px 1fr 2fr;
}

```

- 1번 열은 auto를 사용한다. 해당 Element 내부 콘텐츠에 맞게 사이즈가 조정된다.
- 2번 열은 100px을 할당한다. 100픽셀 크기만큼의 폭을 차지한다.
- 3번 열은 1fr 크기를 할당한다. 1fr이란 남은 자유 공간의 1/3(총fr)만큼의 크기를 할당한다.
- 4번 열은 2fr 크기를 할당한다. 2fr이란 남은 자유 공간의 2/3(총fr)만큼의 크기를 할당한다.





