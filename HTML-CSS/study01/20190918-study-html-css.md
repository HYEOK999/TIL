![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)

## HTML Study 08

- position : sticky / fixed
- counter
- cursor : pointer
- calc( ) 함수
- tabindex
- 일자로 요소를 나열하는 4가지 방법( 크게 )

------

<br/>

<br/>

### position : sticky / fixed

[레진 fixed/sticky 참고](https://tech.lezhin.com/2019/03/20/css-sticky)

1. sticky

   sticky는 평소에는 기본 상태였다가 스크롤을 내리면서 임계점에 다했을 시 fixed처럼 요소가 게속 남아있는 형태를 말한다.

   필수로 top, right, bottom, left 속성이 필수이다.

2. fixed

   fixed는 스크롤 유무에 관계의 상관없이 뷰포트에 고정을 하는 것이다. 다만, sticky는 브라우저의 제한이 걸려있다.(아래참조)

   **sticky와 fixed의 차이점은 fixed는 스크롤의 상관없이 뷰포트 자리 고정!, sticky는 스크롤이 다야 적용이된다는 것이다.**

![sticky 지원 현황](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99021A505C931D0028)

<br/>

<br/>

### counter

​	css로 요소에 일일이 접근하지 않고 연속적인 리스트등에게 일렬번호등을 붙일 수 있다.

예를들어보자, 

~~~~~css
ol{
	counter-reset: chapter 0; /* counter-reset으로 초가화 : 카운터명 증가값(생략시 1씩 증가,0도 1씩증가)*/
}

ol li{
	counter-increment : chapter;
}

ol li::before{
	content : counter(chapter);
}
~~~~~



<br/>

<br/>

### cursor

[여러가지 커서 모양들](https://developer.mozilla.org/ko/docs/Web/CSS/cursor)

 cursor : pointer는 마우스가 올라갈시 a링크를 hover한것처럼 마우스 커서가 손가락 표시 모양으로 바뀌게 된다.

그외 추가적인 커서 모양들은 위 링크를 참조하라.

<br/>

<br/>

###calc( ) 함수

[calc( ) 관련 블로그](https://taegon.kim/archives/3768)

CSS3에 새롭게 추가된 기능 중 calc()라는 것이 있다. 

계산을 해주는 속성인데 기존에 자바스크립트로 하던 계산을 상당 부분 덜어준다. 

예를 들어, 모든 문단을 **"100% 너비에서 20픽셀(px)만큼 뺀 너비"**로 설정하고 싶다면 다음과 같이 작성한다.

~~~css
p {
		width : 95%; /* 구식 브라우저를 위한 대비책(fallback) */
    width : -webkit-calc(100% - 20px); /* for Chrome, Safari */
    width :    -moz-calc(100% - 20px); /* for Firefox */
    width :         calc(100% - 20px); /* for IE */
}
~~~

`calc()` 내부에 입력할 수 있는 표현식은 +, -, *, / 등의 사칙 연산이 가능하다. 

주의할 부분은 사칙 연산시 + 또는 - 는 **반드시 기호 양쪽으로 공백을 삽입해야 한다**는 것.

속성에 따라 값이 - 로 내려갈 수도 없는 경우가 있다.( width : calc(5px - 10px);  = width: 0px; )

<br/>

<br/>

### tabindex

어떤 엘리먼트에 키보드 포커스를 주는 가장 흔한 방법이다.

어떤 엘리먼트에 키보드 포커스를 주는 가장 흔한 방법으로 사용된다.

크게 3가지 속성값을 이용할 수 있다.

> 0 값 - tabindex="0"
>
> 양수 - tabindex="1~32768"
>
> 음수 - tabindex="-1"

속성 값이 0인 경우는 탭을 눌렀을 때 포커스가 가지 않는 엘리먼트에게 포커스를 줄 수 있다.

예를 들어, div영역에도 포커스를 줄 수 있다는 의미이다.

속성 값이 -1인 경우는 반대로 탭을 눌렀을 때 포커스가 가는 엘리먼트에게 포커스를 잃게 할 수 있다.

예를 들어, 링크 엘리먼트에 포커스를 잃게 한다는 의미다.

속성 값이 양수인 경우에는 우선순위를 지정해주는 것이다.

예를들어 , h3 tabindex="6" 이라는 태그가 h3 tabindex="3" 보다 먼저 나왔어도 키보드 탭 포커스는 3을 먼저 보여주고, 6을 보여줄 것이다. 



### 일자로 요소를 나열하는 4가지 방법( 크게 )

~~~~css
	<ol class="favorite-list">
 		 	<li class="no1">
 			 	<a href="#">W3C</a>
 			 	<em class="up">상승</em>
    	</li>
  </ol>
~~~~

![일자요소](https://user-images.githubusercontent.com/31315644/65169679-fbb39f00-da81-11e9-9bbc-f9b0a65bf07f.jpeg)

위 그림과 같이 일자로 구성된 요소가 있다고 가정했을 떄. 

만드는 방법은 크게 4가지가 존재한다.

<br/>

**1. flex**

flex는 가장 쉬운 방법이다. 다만, 브라우저 지원을 잘 확인해야만 한다.

~~~css

.favorite-list li{
    display : flex;
    align-items: center;  
    /*y축 중간 매치*/
 } 

.favorite-list em {
    margin-left: auto; 
    width: 9px; /*em은 inline 이지만 flexitem화되어서 가능함*/
}

~~~

<br/>

**2. float**

 float의 단점은 일자로 나열하고 하는 요소들의 높이가 모두 같다면 크게 문제가 없지만 높이의 차이가 존재한다면 억지로 높이를 맞춰주어야만 한다. 

~~~~~~css
.favorite-list li::before{
    float : left; 
}
.favorite-list a{
    float : left;
}

.favorite-list em {
    float : right;
}  /* 높이의 차이 때문에 억지로 크게를 맞춰주어야한다.*/
~~~~~~

<br/>

**3. position **

 부모요소에 relative를 주고 왼쪽부터 작성되는 html 특성을 고려하여 가장 오른쪽 상승,하락 그림만 absolute를 이용하여 오른쪽에 배치하는 기법이다.

~~~~css

.favorite-list li{
    position: relative;
} 

.favorite-list li::before{
    display: inline-block;
    vertical-align: middle;
}
.favorite-list a{
    display: inline-block;
    vertical-align: middle;
}

.favorite-list em {
    position : absolute;
    margin-top : -5px;  /*absolute를 이용함으로서 상승,수직 이미지를 오른쪽으로 붙어버린다.*/
    top : 50%; /* top과 margin은 글씨가 많아서 칸이 넘어가도 상승 좌표도 덩달아 움직이게 하기 위함이다.*/
    right : 0;
} 
~~~~

<br/>

**4. inline-block**

 inline-block에서 margin-left를 이용하여 em요소를 오른쪽으로 보내버리는 방법이다.

inline-block에서의 특징은 반드시 **정렬하고자는 요소들은 모두 width값들이 명시가 되어야만 한다.**

그래야 컴퓨터가 maring-left : auto 값을 계산하여 em요소를 오른쪽에 배치시킬수 있다.

~~~~css

.favorite-list li::before{
    display: inline-block;
    vertical-align: middle;
    width: 20px;
}
.favorite-list a{
    display: inline-block;
    width: 120px;
    vertical-align: middle;
}

.favorite-list em {
    display: inline-block;
    width: 9px; /*em은 inline 이지만 flexitem화되어서 가능함*/
    margin-left: auto;
    vertical-align: middle;
}

~~~~

