![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)



## HTML Study 04

- HTML5 콘텐츠 모델

- CSS 셀렉터

- html5 표준확인

- CSS 구체성점수

- Shadow

- Entity list

- opcacity 

- 시나리오 작성

- z-index

- background

- 애니메이션( @keyframes, + 곡선도 )

- position, float 다시 정리

- float 객체에 강제로 높이 를 알려주는법(overflow, 가상요소 clear:both)

  float, position:absolute -> display를  block화 시킨다.

***

### 오늘의 팁

1. position : absolute , float는 강제로 display:block 화시킨다.

2. 1에서 한 absolute의 경우 display는 block이 맞지만 마치 inline 형태의 display를 띄고 있으며, 

   **absolute 선언 시, block 레벨 요소의 width는 inline 요소와 같이 content에 맞게 변화되므로 적절한 width를 지정해야만 하며, 부조 또는 조상요소가 static일 경우, 최종으로는 document의 body태그를 기준으로 위치하게된다.**

3. <a> 태그의 링크 클릭 반경을 넓히고 싶다면 padding 을 늘려야 한다.

4. 간단하게 여백을 주는 방법으로는 대표적으로 margin, padding 등이 있다.

5. float화 된 상태에서 부모의 자식들 요소가 모두 float화 되었다면 그 부모요소는 높이를 잃어버리게 된다. 이에 잃어버린 높이를 찾는 3가지 방법이 있다.

   - height = 45px  : 높이를 직접 입력 [비추천] <부모>

   - overflow:hidden/auto : overflow 자체는 흘러넘치는 콘텐츠를 다루는 태그지만 overflow태그는 잠재적으로 잃어버린 높이를 일깨워주는 역할을 하기 때문에 사용할 수 있다.

   - clear:both : 가장 좋은 방법. float화된 요소 마지막에 가상자식요소를 생성하여 clear:both를 선언. clear:both는 float요소 중에 높이가 제일 긴 것을 찾아서 강제로 margin을 추가하여 높이가 늘어나 잃어버린 높이를 찾아낸다.

     ~~~css
     .menu::after{ 
         content:"";
         clear: both; 
          /* clear는 display:block 에서만 사용 가능. right, left 등도 있다. */
         display: block;
      }
     ~~~

6. display 숨김처리

7. ~~~css
   .a11y-hidden {
       background-color: red;
       position: absolute;
       width: 1px;
       height: 1px;
       overflow: hidden;
       margin: -1px;
       clip: rect(0,0,0,0);
       white-space: nowrap;
   }
   ~~~

***

### HTML5 콘텐츠 모델

![ContentsCategory](https://user-images.githubusercontent.com/31315644/64547639-ef379400-d367-11e9-96f8-b200c9981342.jpeg)

**Content Models**

 콘텐츠 모델이란 HTML의 각 요소가 어떠한 성격을 가지고 있으며, 어떤 역할을 하는지에 대한 그룹을 분류한 것을 말한다.

**Metadata**: 표시 또는 동작을 설정합니다. 이 요소들은 **head**에서 사용된다.

- 요소: <base>, <link>, <meta>, <noscript>, <script>, <style>, <title>

**Embedded**: 다른 resources를 불러오는데 사용한다.

- 요소: <audio>, <video>, <canvas>, <iframe>, <img>, <math>, <object>, <svg>

**Interactive**: 사용자와 상호작용.

- 요소: <a>, <audio>, <video>, <button>, <details>, <embed>, <iframe>, <img>, <input>, <label>, <object>, <select>, <textarea>

**Heading**: 제목을 정의합니다.

- 요소: <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, <hgroup>

**Phrasing**: 이 모델은 HTML4의 수많은 inline 요소들을 가지고 있습니다.

- 요소: <img>, <span>, <strong>, <label>, <small>, <sub> , <br>

**Flow content**: normal flow에 포함된 HTML5의 주된 요소를 포함합니다.

**Sectioning content**: scope의 headings, content, navigation, 그리고 footers를 정의합니다.

- 요소: <article>, <aside>, <nav>, <section>



### CSS 셀렉터

​	대표적으로 id 셀렉터인 # , 클래스 셀렉터인 점(.) , 전체 선택자인 * 외에도 수많음 셀렉터가 있다.

자세한 내용은 아래 블로그가 정리를 정말 잘 해놓았기에 링크로 남겨둔다.

https://code.tutsplus.com/ko/tutorials/the-30-css-selectors-you-must-memorize--net-16048



### html 5 표준확인

- google에 html w3c 검색
- [html5 mulder21c : 블로그] https://mulder21c.github.io/html/
- [html5 한글명세서] https://mulder21c.github.io/html/



### CSS 구체성 점수

​	css 셀렉터에 id, class, tag 이름이 갖는 점수를 계산하여 점수가 높은 selector가 우선순위를 갖는 가상 개념.

대표적으로 id > class > tag 순이며, 제일 높은 html 태그 내부에 적용하는 css가 제일 높은 우선순위를 지닌다.

착각하면 안되는 것!! -> class가 10개 쓰인다고 해서 id보다 높을 수 없다. 체급차이가 다르다고 생각하면됨.

~~~~~~~html
<div style="padding : 20px">
  이것은 div 태그에 style이 적용된 예입니다.
</div>
~~~~~~~

### 추가 important

> ~~~~~css
> .menu-act .btn-menu{
>     color:yellow important;
> }
> ~~~~~
>
> important는 *우선순위를 무력화시킬 수 있다.* 즉, important 는 
>
> 1. 지정한 스타일이 안먹는다고 생각햇을떄. 추적할때. 파악용도
> 2. 클래스가 동적으로 추가될 가능성이 있을떄; 다른 사람이 수정해서 내 소스의 상속이 깨질 우려가 있을 경우.



### Shadow

  그림자를 나타내는 태그는 크게 박스와 텍스트가 있다.

~~~~~~~~~~~~~~~~~~~css
box-shadow: none | x-position y-position blur spread color | inset | initial | inherit;
~~~~~~~~~~~~~~~~~~~

> - none : 그림자 효과를 없앤다..
> - x-position : 가로 위치입니다. 양수면 오른쪽에, 음수면 왼쪽에 그림자가 만들어진다. (필수)
> - y-position : 세로 위치입니다. 양수면 아래쪽에, 음수면 위쪽에 그림자가 만들어진다. (필수)
> - blur : 그림자를 흐릿하게 만듭니다. 값이 클 수록 더욱 흐려짐.
> - spread : 양수면 그림자를 확장하고, 음수면 축소.
> - color : 그림자 색을 정한다,
> - inset : 그림자를 요소의 안쪽에 만든다.
> - initial : 기본값으로 설정한다.
> - inherit : 부모 요소의 속성값을 상속받는다.



~~~~~~~~~~css
text-shadow: offset-x offset-y blur-radius color | none | initial | inherit
~~~~~~~~~~

> - offset-x : 그림자의 수평 거리를 정한다. (필수)
> - offset-y : 그림자의 수직 거리를 정한다. (필수)
> - blur-radius : 흐림 정도를 정한다. (선택 : 값을 정하지 않으면 0)
> - color : 색을 정한다. (선택 : 값을 정하지 않으면 브라우저 기본값)
> - none : 글림자 효과를 없앤다.
> - initial : 기본값으로 설정한다.
> - inherit : 부모 요소의 속성값을 상속받는다.



### Entity list

​	CSS에서 사용할 수 있는 특수문자 리스트. html에서 &&를 그냥 입력하면 안되기 때문에 아래의 리스트를 이용한다.

[사용가능한 특수문자 코드 리스트] https://www.w3schools.com/cssref/css_entities.asp



### Opacity

~~~~css
opacity: number | initial | inherit
~~~~

- number : 0.0부터 1.0까지의 수를 넣는다. (투명도 0 -> 불투명 / 1-> 투명)

- initial : 기본값으로 설정한다.

- inherit : 부모 요소의 속성값을 상속받는다.

  

### 시나리오 작성

 CSS의 style을 작성할 때, 시나리오를 작성하며 차근차근 하는것을 익숙해지도록 한다.

예) 

1. 글씨가 왼쪽 -> 오른쪽으로 날라옴. : 이동효과 [padding, margin, position-relative, position-absolute]

	2. 글자의 투명도를 추가 해야함 . [color: rgba 또는 opacity]
 	3. 글자 크기의 번화 [font-size]



### z-index

요소들의 배치가 자유로워지면서, 때떄로 서로의 위치를 겹치게 하는 경우가 생긴다. 그 때 사용하는것이 z-index.

**z-index 값을 지정하기 위해서는 해당 요소의 position 속성이 relative, absolute, fixed 중 하나여야만 한다.**

[z-index 를 잘 설명한 블로그] http://dev.epiloum.net/904



### background



- background

- 애니메이션( @keyframes, + 곡선도 )

- position, float 다시 정리

- float 객체에 강제로 높이 를 알려주는법(overflow, 가상요소 clear:both)

  float, position:absolute -> display를  block화 시킨다.



cubic-bezier

[https://kutar37.tistory.com/entry/CSS-cubic-bezier%EB%9E%80](https://kutar37.tistory.com/entry/CSS-cubic-bezier란)



