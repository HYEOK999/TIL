![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)



## HTML Study 02

- display
- flex layout
- a 태그
- position
- font
- css 개발 방법론
- 외부 css 적용 방법 ( reset CSS 와 normalize CSS )

> ## 오늘의 중요점!
>
> css 문제가 생길시 홈페이지를 열어서 검사를 하고 항상 작은 단위부터 큰단위로 확인하다.( 특히 상속,겹침,우선순위 )
>
> box-sizing 방식은 통일하는게 나중의 유지보수에 좋다. 
>
> ~~~css
> *, *::before, *::after{
> 
> box-sizing: border-box;
> 
> } /*import 바로 아래*/
> ~~~
>
> 부모가 css box 레이아웃을 결정하면 자식도 그것을 따라감.(상속 - 무조건은 아니다. margin , padding 등등)
>



## display

> 요소(즉 태그)는 inline과 block 요소로 나뉜다.
>
> inline : 줄 속에 넣는 요소. 줄바꿈이 되지 않고 글자수에 따라 크기 자체가 줄고 늘어난다. <b> <span> <a>
>
> block : 좀 더 넓은 범위를 지정할 때 사용하는 요소. 가로화면을 100% 다차지. 줄바꿈이 됨.                          <p> <h1> <div> <ul> <ol> 



1. display : inline - block과 다르게 줄바꿈이 안되고, width와 height가 적용되지 않는다. 오로지 적용된 글자 수에 따라서 크기가 결정된다.

2. display : block - 가로 화면을 다 차지함. 줄바꿈 O

3. display : none - 박스 생성x, 공간 차지x

4. display : flex - 새로 생긴 display. 따라서 특정 버전이 낮은 브라우저에서는 실행X

   

## Flex layout

> flex 모델은 크기 수치를 잘못입력하여도 레이아웃이 크게 깨지지 않는다. 
>
>이유는 전체길이에 대해서 비율로 따져서 스스로 값을 정해주기 떄문.

- ### display: flex

  IE 10 or 그 이상 버전에서 사용 가능.

  flex 설정된 노드의 자식도 flex item을 가지고 모두 flex display가 된다.

  

- ### flex-direction (부모노드)

  flex-direction은 flex설정시 어떤 방향으로 제기 될것인가를 나열한다. 기본 flex-direction=row 이다.

  x축 , y축 으로 기준을 나눈다. 

  row = x축 

  column = y축

- ### flex-basis (자식 노드)

  flex-item의 크기를 결정합니다. 각 축에 해당하는 (width / height) 의 값을 설정.

- ### JUSTIFY-CONTENT: 메인 축을 중심으로 정렬

  - flex-start(default) ,기본
  - flex-end ,끝방향 정렬
  - center ,중앙 정렬
  - space-between , flex-item들의 사이를 동일하게 비워줌. 
  - space-around, flex-item들의 사이를 비워줌. 
  - space-evenly : 익스플로러 지원x

- ### ALIGN-ITEMS: 교차축을 중심으로 정렬

  - flex-start(default) ,기본
  - flex-end ,끝방향 정렬
  - center ,중앙 정렬

- ### order : item 간에 순서를 지정합니다.

- ### flex-grow : item들 끼리 크기에 대한 비율을 결정합니다. ex) a-1 b-2 c-1

- ### flex-shrink : flex-item의 크기가 flex-container보다 클때 다른 items의 크기들을 축소시키고 그만큼 해당 item크기를 확대 시킨다.

![justify-content](https://user-images.githubusercontent.com/31315644/64356762-5e4a7b00-d03e-11e9-8ac2-c410e17608a5.jpeg)



![align-items](https://user-images.githubusercontent.com/31315644/64356779-630f2f00-d03e-11e9-81ed-773c238ef5fd.jpeg)

![grow](https://user-images.githubusercontent.com/31315644/64356785-660a1f80-d03e-11e9-88ab-61617e98d327.jpeg)

![order](https://user-images.githubusercontent.com/31315644/64356786-67d3e300-d03e-11e9-8959-9f29415ef0fd.jpeg)

## a 태그

	> 하이퍼링크 태그인 <a> 는 상황에 따른 css 스타일을 지정할 수 있다.

~~~css
a:link{			}  /* 선택 안했을 때의 css */
a:visited{ 		} /*  선택해서 들어갔을때  */
a:hover{ 		} /* 마우스 올라갔을때 글자색 변경 */
a:active{			} /* 마우스로 클릭한 순간의 상태 */
~~~



## position

- static : MarkUp 순서대로 배치, top-bottom-left-right 의 속성값이 적용되지 않는다.
- absolute : 상위 요소(상위는 반드시 static이 아닌 다른 값)를 기준으로 위치를 설정.
- relative : 상위 요소(상위는 반드시 static)를 기준으로 위치를 설정.
- fixed : 요소의 위치를 사용자의 브라우저 기준으로 설정. ( 광고, 상단바, 하단바 등등) 



## font

- em : 상위요소의 크기에 대해서 비율로 계산한다.

- rem : 최상위 요소(root)의 크기에 대해서 비율로 계산한다.

- line-height : 1.15 추천

- SpoqaHanSans-kr 본고딕 ( 어도비 배포 )

- ~~~css
  @import url('https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css');
  ~~~

- Noto Sans KR 본고딕( 구글 배포 )

  ~~~css
  <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap" rel="stylesheet">
  
  <style>
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');
  </style>
  ~~~



## CSS 개발 방법론

> 1. 쉬운 유지보수
> 2. 코드의 재사용
> 3. 확장 가능
> 4. 직관적인 네이밍

- BEM

- OOCSS

- SMACSS

  [ CSS 개발 방법론 ] https://gomdoreepooh.github.io/notes/smacss-bem-oocss



## 외부 CSS 적용 방법

> 대표적 외부 CSS
>
> normalize CSS : 개발 초기 필요한 정도만 초기화 후 사용.
>
> Reset CSS : 개발 초기 불필요한 margin, padding 같은 크기들을 모두 초기화.

​	[nomalize css] https://github.com/necolas/normalize.css/

​	[Reset css] https://meyerweb.com/eric/tools/css/reset/

 - 적용방법 ( 예 - nomalize )

   ~~~html
   <link rel="stylesheet"
   href="https://necolas.github.io/normalize.css/latest/normalize.css"> 
   
   <style>
   @import url('https://necolas.github.io/normalize.css/latest/normalize.css');
   </style>
   ~~~



