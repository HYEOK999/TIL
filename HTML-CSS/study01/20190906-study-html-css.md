![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)



## HTML Study 03

- 가상 요소 
- nth:child
- WAI-ARIA 
- a11y-hidden / aria-hidden : 태그 숨김처리
-  role
- Web Font - 이미지 아이콘
- CSS 단위
- float 
- 그림자
- gradiunt

> ## 오늘의 중요점!
>
> 

## 가상 요소 

[가상요소] https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-elements

가상 요소는 존재하지 않는 요소를 존재하는 것처럼 부여하여 문서의 특정부분을 선택하게 할 수 있다.

대표적인 가상 요소

- ::before -> 해당  css의 요소박스 전에 같은 형식의 태그요소를 가상으로 만든다.
- ::after -> 해당  css의 요소박스 후에 같은 형식의 태그요소를 가상으로 만든다.

## nth-child

[nth:child] http://nthmaster.com/

nth-child는 형제 요소 중에서 특정 순서 요소를 선택하고 싶을 때 사용한다.

~~~css
.member li:nth-child(n+2)::before{
content: '\f142'; /*가상요소 before 와 after에게 필수*/
font-family:'fontello';
width: 1em;
}
/* nth-child를 이용하여 member 하위의 <li>중 2번째 요소부터 끝까지 각 요소 앞에 가상 요소를 생성하고 
내용은 '\f142'를 입력하고 font 와 width를 적용한다.*/
~~~



## WAI-ARIA 

> [설명] https://www.biew.co.kr/36
>
> WAI-ARIA는 'Web-Accessibility Initiative'의 약자로 W3C에서 웹 접근성을 담당하는 조직.
>
> ARIA는 리치 인터넷을 위한 W3C의 접근 명세.

[W3C에서 제공하는 명세서를 보기 좋게 기술로 변화시킨 레진의 ARIA] https://tech.lezhin.com/2018/04/20/wai-aria



## a11y-hidden / aria-hidden : 태그 숨김처리

    ### a11y-hidden

 화면상에서는 안보이나 스크린 리더기 혹은 보조기등에서 보이게 끔 하기 위하여 개안된 CSS스타일. 헷갈리면 안되는것이 WAI-ARIA 에서 재정된 aria-hidden은 클래스명이 아니라 하나의 속성이다! 결국 다른거임.

- 추가로 off-screen / readable-hidden 등도 있다.

### aria-hidden

 시각장애인, 검색봇, 스크린리더 사용자가 홈페이지에 더 쉽게 접근하기 위해서 읽을 필요없는 요소나 내용을 감춰준다. 

외에도 여러가지 태그 숨긴 방법이 있지만, 대표적으로 위와 같은 형태를 권장한다. 

- display:none , visibilitty , hidden 은 비권장.

      ~~~css
/* a11y-hidden */
.a11y-hidden{
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden; /* 넘치는 부분을 감쳐준다 */
    clip: rect(0,0,0,0); /* 선행조건 : position:absolute 해당 화면을 잘라내서 보여줌 */
    white-space: nowrap; /* 줄바꿈을 하지않음. */
    opacity: 0; /* 투명도  */
}

/* aria-hidden */
<span class="line" aria-hidden="true">내용</span>
      ~~~



## role

​	다른태그에 role로 규정한 태그의 역할? 혹은 기능을 넣을 수 있다.

역시 WAI-ARIA에저 정의한 기술로 https://webdir.tistory.com/89 에 정리가 되어있다.

대표적인 예로는 button이 있으며 , 시멘틱 관점에서도 중요한 역할을 지닌다. 

role = header,main,contentinfo 는 각각 <header><main><footer> 를 의미한다.

~~~css
<a href="#" class="btn-menu" role="button">CSS에 대해</a>
~~~



## Web Font - 이미지 아이콘

 로컬에 있는 폰트를 쓰는게 아닌 웹에서 폰트를 받았다가 사용함. 저작권에 주의

대표적 : 

[Font Awesome] https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use

[Fontello] http://fontello.com/

Fontello 적용 방법.

1. 다운받은 압축파일을 해제하고 들어가보면 font폴더와 css폴더가 존재한다. 

2. 다운받은 font폴더에서 모두 복사하여 하고있는 프로젝트 font폴더에 붙여넣기를 한다.(단, css내부의 font폴더가 아니다.)

3. 다운받은 css폴더에서 fontello.css를 복사하여 하고있는 프로젝트 css폴더에 붙여넣기를 한다.

4. import 시키기

   ~~~css
   /* css 파일 */
   @import url('./fontello.css');
   ~~~

5. 사용방법은 html 내부 , css 내부 가 있다.

6. ~~~html
   <!-- html 내부 -->
   <!-- class 명으로 선언하여 사용하는 방법. class 명은 다운받은 css폴더에서 확인이 가능하다. -->
   <a href="#"><span class="icon-ellipsis-vert">로그인</span>
     
   <style>
   /* 사용하고자 하는곳에서 숫자값과 font-family를 선언. 숫자값은 css폴더에서 확인이 가능하다. */  
     .member li:nth-child(n+2)::before{
       content: '\f142';
       font-family:'fontello';
       width: 1em;
   	}
   </style>
   ~~~



## CSS 단위

