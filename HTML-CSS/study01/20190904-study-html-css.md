![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)



## HTML Study 01

- DTD 소개 및 사용 방법
- html 영역의 언어 선택
- head 영역 안 인코딩 선언
- 타이틀 요소를 이용한 좋은 제목을 만드는 방법
- HTML의 구조 설계 
- CSS 레이아웃
- 박스 모델



## WEB은 디자인관점이 아닌 콘텐츠 관점으로 보아야 한다.

## SEO 관점으로 페이지를 작성해야만 한다.

## 문서와 구조와 표현을 분리 해놓는 것이 중요하다.



### DTD 소개 및 사용 방법

> 문서타입을 정의 한다. 브라우져에게 해당 HTML이 어떤 표준에 따른 것인지를 알려주는 것을 DTD(Document Type Definition)이라고 한다.
> DTD는 문서의 제일 위에 위치한다. <! DOCTYPE html>



### html 영역의 언어 선택

1. 속성 lang="언어" 식으로 한다. (영어 en, 한국 ko-KR)

2. 언어를 지정해주는 이유는 SEO관점으로서 브라우저에서 검색엔진에 따른 효율성을 높이기 위함이다.

   

### head 영역 안 인코딩 선언

1. meta 태그는 빈요소이다.

2. meta의 속성 charset은 인코딩 형식을 지원한다. 반드시 타이틀보다 먼저 등장해야만 한다.

   ~~~html
   <meta charset="UTF-8">
   ~~~

3. meta의 속성 http-equiv="X-UA-Compatible" content="ie=edge" 는 브라우저 사용자 호환성 모드를 의미한다.

   ( 예, 지원하는 렌더링 모드가 11인데 깔려있는 브라우저 렌더링 버전이 8일경우 11의 렌더링을 8로 호환하여 열어준다.)

   content는 기본 호환성 브라우저 렌더링 모드를 지정할수있다.

   사용자의 브라우저가 edge브라우저를 지원한다면 해당 모드로 연다.

   ~~~html
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   ~~~

   

   

### 타이틀 요소를 이용한 좋은 제목을 만드는 방법

​	SEO 관점에 따라 타이틀 요소를 제대로 적는 것이 중요하다. 

>  검색 엔진 최적화 (영어: **search engine optimization**, **SEO**)는 웹 페이지 검색엔진이 자료를 수집하고 순위를 매기는 방식에 맞게 웹 페이지를 구성해서 검색 결과의 상위에 나올 수 있도록 하는 작업을 말한다.

```html
<title>웹카페-HTML5,CSS3,웹표준,웹접근성</title>
```

### 



### HTML의 구조 설계 

​	

## 웹페이지 분석 -> Mark Up -> Naming

#### 분석 : 웹페이지는 주로 삼단 구조를 가진다.

> 머리말(헤더)
>
> 본문(콘텐츠)
>
> 꼬리말(푸터)



#### Web. Cafe. 페이지 분석(삼단 ++)

	>머리말(헤더)
	>
	>+비주얼(광고등으로 활용가능성)
	>
	>본문(콘텐츠)
	>
	>+슬로건 (커피잔 , 명언)
	>
	>꼬리말(푸터)



#### Mark Up 단계

> body 태그 안
>
> ​	header - 머리말
>
> ​	div - 비주얼
>
> ​	main - 본문
>
> ​	article - RSS, 슬로건
>
> ​	footer - 꼬리말 



#### Naming 단계 ( Naming : 컴퓨터가 이해할 수 있도록 이름을 지어준다. )

> ### { top , bottom 같은 위치 기반 이름은 정말로 안좋음!!! }
>
> 이름 주는 방법 
>
> class : 여러번 사용가능. 
>
> id : 고유하게 정할 때 사용.



### CSS 레이아웃

> 정통방식 : float , position, display:inline, display:inline-block
>
> 모던방식 : display:inline, display:inline-block, flex, glid

### 박스 모델

~~~ 
box-sizing: content-box | border-box | initial | inherit
~~~

- content-box : 콘텐트 영역을 기준으로 크기를 정합니다.
- border-box : 테두리를 기준으로 크기를 정합니다.