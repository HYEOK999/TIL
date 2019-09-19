![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)

## HTML Study 09

- q , blockqueto 태그 + cite 속성
- small 태그
- address 태그
- flex 속기법 + order, grow , shrink
- flex-basis
- aside 태그
- CSS animation : transition
- background 속기법
- 태그들이 공통으로 사용가능한 속성

------

### 오늘의 학습 깨달음

1. 의미없는 구분자들은 마크업 하지 않는다.
2. 만약 의미없는 img 태그들을 사용해야할 경우 alt값은 비워둔다 ( alt = "" )
3. img 태그를 사용할 것인지, 일반적인 태그를 이용하고 SEO적인 내용을 붙인 후 CSS 배경처리를 할 지 고민이 필요함.
4.   **사이트를 마무리하는 영역인 footer에서는 heading 태그를 사용하지 않는다**.
5. header 태그의 대신 역할 role="banner" 와 footer 태그의 대신 역할 role="content-info"등은 article 태그나 section태그 내에서 사용하면 안된다!!!! 반드시, body 태그의 직계 자식 요소로 사용되는 태그들의 역할 모델이 되어야만 한다.
6. button 태그 사이의 띄어쓰기는 요소검사로 잡기 힘드니 button 태그가 나란히 사용되었을 때, 간격이 있다면 확인할 것. 
7. 레이아웃 작업 시, 가능한 노말플로우를 유지하라. 
8. 레이아웃 작업 시, 더 간단하고 쉽게 적용가능한 방법들을 모색하라.

-------------------



### q , blockqueto 태그

 인용임을 나타내는 태그에는 q와 blockquote가 있다. 

q는 문단 안에서 인용할 때 사용하는 **인라인 요소**이고, blockquote는 새로운 문단에서 인용하는 **블록 요소** 이다.

 ~~~css
q{
	quotes: "[[" "]]"; 
} /* 사용한 태그의 앞과 뒤에 [[ 과 ]] 이 생긴다.*/

/*혹은 한쪽만 선택하고 싶을경우 다음처럼도 이용함.*/
q::after{
    content: "";
}
 ~~~

인용문 출처는 **cite 속성** 을 이용한다.

~~~~html
<q cite="https://www.codingfactory.net/">consectetur adipiscing</q>
~~~~

<br/>

<br/>

### small 태그

1. small  태그는 저작권, 면책조항, 주의사항, 법적 제한 사항, 주석표시에 사용한다.

2. small  태그는 부가 정보를 나타내는 주석표시이므로, 여러 단락이나 광범위한 텍스트가 포함된 섹션에서는 사용하지 않는다.

   ~~~html
   <small class="copyright"> Copyright since &copy; 2010 by Web Cafe </small>
   ~~~

<br/>

<br/>

### address 태그

1. address는 소유자 또는 작성자의 연락처를 나타내는 태그.

2. body 태그 안에 있으면 문서의 소유자 또는 작성자의 연락처를 나타냄.

3. article 태그 안에 있으면 기사의 소유자 또는 작성자의 연락처를 나타냄.

4. 기본 모양은 기울임꼴.

   ~~~html
   <address class="address">
                  <span>서울시 강남구 성수동 </span>
                  <span>전화 : 02-1234-5678 </span>
                  <span>email : iasg2004@gmail.com</span>
   </address>   <!-- span을 준 이유 : 간격을 관리가 편해서 -->
   ~~~

   <br>

   <br>

### flex 속기법 + order, grow , shrink

> **flex : flex-grow flex-shrink flex-basis**

[Flex 한국어 정리 사이트](https://heropy.blog/2018/11/24/css-flexible-box/)

**order**

- Item의 순서를 설정.
  Item에 숫자를 지정하고 숫자가 클수록 순서가 밀린다.
  음수가 허용.

<br/>

**flex-grow**

- Item의 증가 너비 비율을 설정.
  숫자가 크면 더 많은 너비를 가짐.
  Item이 가변 너비가 아니거나, 값이 `0`일 경우 효과가 없다.
  
- ![flex-grow](https://heropy.blog/images/screenshot/flex-grow.jpg)
  
  <br/>

**flex-shrink**

- Item이 감소하는 너비의 비율을 설정.
  숫자가 크면 더 많은 너비가 감소.
  Item이 가변 너비가 아니거나, 값이 `0`일 경우 효과가 없다.
- ![flex-shrink](https://heropy.blog/images/screenshot/flex-shrink.jpg)

<br/>

### flex-basis

Item의 (공간 배분 전) 기본 너비를 설정.
값이 `auto`일 경우 `width`, `height` 등의 속성으로 Item의 너비를 설정할 수 있다.
하지만 단위 값이 주어질 경우 설정할 수 없다.

| 값   | 의미                      | 기본값 |
| ---- | ------------------------- | ------ |
| auto | 가변 Item과 같은 너비     | `auto` |
| 단위 | px, em, cm 등 단위로 지정 |        |

`flex` 속성에서 설명한 것 같이 단축 속성 내에서 `flex-basis`를 생략하면 값이 `0`이 되는 것을 주의합시다.

![Flex](https://heropy.blog/images/screenshot/flex-basis.jpg)

<br/>

### aside 태그

`<aside>` 컨텐츠는 추가되어야 할 요소이지만, 메인 컨텐츠를 이해하기 위해 필수적인 것은 아니다. 

예를 들어, 각주는 추가적인 정보를 제공하지만 필수적이지 않다. 그리고 발췌문은 필수적인 컨텐츠인 반면, 메인 컨텐츠에서 인용된 카피 문구이다. 

하지만, `<aside>`는 관련성이 있어야 한다는 사실을 명심해야 한다. 

사이트의 사이드바를 `<body>`의 자식요소로` <aside>`에 넣는 것은 좋다. 

하지만 사이트 전반에 걸친 정보를 `<article>`의 자식요소로서 `<aside>` 안에 보여져서는 안되는 것. 

그리고 `<aside>` 요소가 그 부모 섹셔닝 요소에 관련만 있으면, 광고에도 적합하다.

~~~html
<aside> 
  <p> 
    <em>섹셔닝 루트</em> 요소에는 
    <blockquote>, <body>, <details>, <fieldset>, <figure>,<td>가 있다. 
  </p> 
</aside> 
<p>
	<header>와 <footer>는 현재 속해 있는 섹셔닝 요소 또는 '섹셔닝 루트' 요소에만 적용된다.
</p>

~~~

<br/>

### CSS animation : transition

​	CSS transition은 :hover , :focus 와 같은 이벤트에 CSS 장면전환을 주기 위한 옵션이다.

~~~~css
.list{
    transition : height 3s 0s, padding 3s 0s, background 2s 3s;
  /* 속성 지속시간 딜레이 */
}

.list:hover, .list:focus{
    padding : 10px;
    background: yellow;
    height : 100px;
}
~~~~

위 구문은 

list 클래스에 마우스가 올라가거나 , 키보드로 선택이 되었을 경우

3초에 동안  높이가 100픽셀 , 패딩이 10픽셀 늘어난다.

3초 기다린 후 2초동안 점점 노란색으로 배경색이 변경된다.

<br/>

### background 속기법

~~~~css
/* background-image background-position [/background-size] repeat-style attachement box background-color */ 

h1 {	
	background: url('img.jpg') 0 50% /8em no-repeat fixed border-box blue; 
}

/* background-image repeat-style background-position attachement */ 

h2{
  background: url(./images/bg_flower.png) no-repeat 50% 0 fixed,
    #eee linear-gradient(#ccc,#eee,#fff) repeat 0 0 fixed;
}  /* 배경 이중 중첩, 먼저 나온 배경이 위로.*/
~~~~

###<br/>

###  태그들이 공통으로 사용이 가능한 속성

1. title
2. id
3. style
4. class
5. lang
6. data-*



