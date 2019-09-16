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

------

<br/>

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

     ```css
     .menu::after{ 
         content:"";
         clear: both; 
          /* clear는 display:block 에서만 사용 가능. right, left 등도 있다. */
         display: block;
      }
     ```

6. display 숨김처리

7. ```css
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
   ```

------

<br/>

### HTML5 콘텐츠 모델

![ContentsCategory](https://user-images.githubusercontent.com/31315644/64547639-ef379400-d367-11e9-96f8-b200c9981342.jpeg)

### CSS 셀렉터

​	대표적으로 id 셀렉터인 # , 클래스 셀렉터인 점(.) , 전체 선택자인 * 외에도 수많음 셀렉터가 있다.

자세한 내용은 아래 블로그가 정리를 정말 잘 해놓았기에 링크로 남겨둔다.

https://code.tutsplus.com/ko/tutorials/the-30-css-selectors-you-must-memorize--net-16048

<br/>

### html 5 표준확인

- google에 html w3c 검색
- [html5 mulder21c : 블로그] https://mulder21c.github.io/html/
- [html5 한글명세서] https://mulder21c.github.io/html/

<br/>

### CSS 구체성 점수

​	css 셀렉터에 id, class, tag 이름이 갖는 점수를 계산하여 점수가 높은 selector가 우선순위를 갖는 가상 개념.

대표적으로 id > class > tag 순이며, 제일 높은 html 태그 내부에 적용하는 css가 제일 높은 우선순위를 지닌다.

착각하면 안되는 것!! -> class가 10개 쓰인다고 해서 id보다 높을 수 없다. 체급차이가 다르다고 생각하면됨.

```html
<div style="padding : 20px">
  이것은 div 태그에 style이 적용된 예입니다.
</div>
```

### 추가 important

> ```css
> .menu-act .btn-menu{
>     color:yellow important;
> }
> ```
>
> important는 *우선순위를 무력화시킬 수 있다.* 즉, important 는 
>
> 1. 지정한 스타일이 안먹는다고 생각햇을떄. 추적할때. 파악용도
> 2. 클래스가 동적으로 추가될 가능성이 있을떄; 다른 사람이 수정해서 내 소스의 상속이 깨질 우려가 있을 경우.

<br/>

### Shadow

  그림자를 나타내는 태그는 크게 박스와 텍스트가 있다.

```css
box-shadow: none | x-position y-position blur spread color | inset | initial | inherit;
```

> - none : 그림자 효과를 없앤다..
> - x-position : 가로 위치입니다. 양수면 오른쪽에, 음수면 왼쪽에 그림자가 만들어진다. (필수)
> - y-position : 세로 위치입니다. 양수면 아래쪽에, 음수면 위쪽에 그림자가 만들어진다. (필수)
> - blur : 그림자를 흐릿하게 만듭니다. 값이 클 수록 더욱 흐려짐.
> - spread : 양수면 그림자를 확장하고, 음수면 축소.
> - color : 그림자 색을 정한다,
> - inset : 그림자를 요소의 안쪽에 만든다.
> - initial : 기본값으로 설정한다.
> - inherit : 부모 요소의 속성값을 상속받는다.

<br/>

```css
text-shadow: offset-x offset-y blur-radius color | none | initial | inherit
```

> - offset-x : 그림자의 수평 거리를 정한다. (필수)
> - offset-y : 그림자의 수직 거리를 정한다. (필수)
> - blur-radius : 흐림 정도를 정한다. (선택 : 값을 정하지 않으면 0)
> - color : 색을 정한다. (선택 : 값을 정하지 않으면 브라우저 기본값)
> - none : 글림자 효과를 없앤다.
> - initial : 기본값으로 설정한다.
> - inherit : 부모 요소의 속성값을 상속받는다.

<br/>

### Entity list

​	CSS에서 사용할 수 있는 특수문자 리스트. html에서 &&를 그냥 입력하면 안되기 때문에 아래의 리스트를 이용한다.

[사용가능한 특수문자 코드 리스트] https://www.w3schools.com/cssref/css_entities.asp



### <br/>

### Opacity

```css
opacity: number | initial | inherit
```

- number : 0.0부터 1.0까지의 수를 넣는다. (투명도 0 -> 불투명 / 1-> 투명)

- initial : 기본값으로 설정한다.

- inherit : 부모 요소의 속성값을 상속받는다.

  

### <br/>

### 시나리오 작성

 CSS의 style을 작성할 때, 시나리오를 작성하며 차근차근 하는것을 익숙해지도록 한다.

예) 

1. 글씨가 왼쪽 -> 오른쪽으로 날라옴. : 이동효과 [padding, margin, position-relative, position-absolute]

2. 글자의 투명도를 추가 해야함 . [color: rgba 또는 opacity]
3. 글자 크기의 번화 [font-size]



### <br/>z-index

요소들의 배치가 자유로워지면서, 때떄로 서로의 위치를 겹치게 하는 경우가 생긴다. 그 때 사용하는것이 z-index.

**z-index 값을 지정하기 위해서는 해당 요소의 position 속성이 relative, absolute, fixed 중 하나여야만 한다.**

[z-index 를 잘 설명한 블로그] http://dev.epiloum.net/904

<br/>

### background

background-color : yellow 같은 기본 코드 외에도,

background는 말 그대로 배경에 대한 색 , 이미지등의 콘텐츠를 다루는 요소 css이다.

```css
/*background-image : url로 2개의 이미지를 불러낸다. */
background-image: url('./images/ani_flower_01.png'),url('./images/ani_flower_02.png');
/*해당 이미지들은 처음에는 일정 간격마다 반복 되어있기에 반복을 제거한다.*/
background-repeat : no-repeat;
/*해당 이미지들에 대한 위치값을 지정해준다.*/
background-position: 0 -10px, 670px 0; /*x축 y축을 의미*/

/*위 내용 한꺼번에 입력하기. */
background : url('./images//ani_flower_01.png') no-repeat 0 -10px, url('./images/ani_flower_02.png') no-repeat 670px 0;

```

<br/>

### 애니메이션

[애니메이션 정리 잘된 블로그] https://brunch.co.kr/@99-life/3

애니 메이션을 사용하기 위해서는 먼저 2가지 조건을 충족시켜야 한다.

1. animation-name : 키프레임 이름         *필수
2. animation-duration : 시간(s,ms 등등)  *필수
3. animation-fill-mode : forwards;

#### 먼저 keyframes를 선언한다

```css
@keyframes text-ani{
    0%{
        font-size: 12px;
        color : rgba(0,0,0,0);
        transform: translate(0,0);
        /* top: 0; left: 0; *//* margin : 0; *//* padddig : 75px 0 0 400px */
    }        /* from */
    100%{
        font-size : 24px;
        color : rgba(0,0,0,1);
        transform: translate(400px,75px)
     /* top : 75px; left:400px; *//*padding:75px 0 0 400px*//*margin:75px 0 0 400px; */
    }      /* to */
}

@keyframes bg-ani{
    0%{ opacity: 1; }
    100% { opacity: 0; }
}

```

transform 은 좌표공간을 변형함으로써 일반적인 문서 흐름을 방해하지 않고 콘텐츠의 형태와 위치를 바꾼다.

그 중, transform : translate는 요소의 위치를 이동 시키는 함수이다. 구버전의 browser는 사용이 안된다.

### <br/>

#### animation-duration 

지속성을 의미한다. 필수조건. 기본적으로 s , ms단위의 시간을 입력한다.

```css
    animation-duration: 5s;
```

<br/>

#### animation-fill-mode 속성 및 내용

```css
animation-fill-mode: none | forwards | backwards | both | inherit;
```

| none      | 애니메이션이 끝난 후 상태를 설정하지 않습니다.   |
| :-------- | ------------------------------------------------ |
| forwards  | 애니메이션이 끝난 후 그 지점에 그대로 있습니다.  |
| backwards | 애니메이션이 끝난 후 시작점으로 돌아옵니다.      |
| both      | 애니메이션이의 앞 뒤 결과를 조합하여 설정합니다. |
| inherit   | 애니메이션의 상태를 상위 요소한테 상속받습니다.  |

- 추가내용

```css
/*
animation-name: bg-ani;
animation-duration: 2000ms;
animation-iteration-count: infinite;
animation-direction: alternate;
animation-timing-function: paused; 
*/

/* 위 내용을 짧게 줄인 short 표기법 */
/* short표기법 : 이름 듀레이션 딜레이 반복 방향 반복곡선도 */

animation: bg-ani 2000ms  1000ms infinite alternate ease-in-out;
```

animation-timing-function에 관한 내용 중 cubic-bezier 에 관한 내용 https://kutar37.tistory.com/entry/CSS-cubic-bezier%EB%9E%80

cubic-bezier 설정하는 곳 https://cubic-bezier.com/#.17,.67,.83,.67