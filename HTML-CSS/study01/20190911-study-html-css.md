![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)

## HTML Study 06

- MarkUp 짤 때 고민해야하는 점.
- fieldset 태그의 버그
- button태그의 버그 (왜? button 대신 <a role="button"> 을 이용하는가?)
- vertical-align / text-align
- time 태그
- block 태그 안에서 여백을 주는 여러가지 방법들.
- 글자 수 숨기기 (... 처리하기)
- fontello
- aria-labelledby

------

### MarkUp 짤 때 고민해야하는 점.

​	MarkUp시 너무 많은 버튼에 대한 고민을 해야만 한다. 예를들어보자,

![공지사항-자료실](https://user-images.githubusercontent.com/31315644/64782626-96067500-d5a0-11e9-9658-4c2f55330329.jpeg)

위와 같은 공지사항과 자료실에 대한 게시물 리스트를 모아놓은 영역을 마크업 해야할 때, 보통의 경우라면, 다음과 같이 생각할것 같다.

> 1. 공지사항 , 자료실은 서로 다른 영역이다.
>
> 2. 게시물 목록을 나열한다.
>
> 3. 더보기 버튼을 나눈다.
>
>     결론적으로, 
>
>    공지사항 - 목록 - 더보기 | 자료실 - 목록 - 더보기 구성이 되겠다.

문제는 이와같은 구성시 너무 많은 탭을 요구하게 된다. 비장애의 영역에서는 시각을 통해 여러가지 정보를 한번에 확인을 할 수 있지만, 장애 또는 봇의 영역에서는 눈대신 청각에 의존해야한다. 스크린 리더기가 모든 게시물 제목을 하나하나 전부 읽는다는 것은 너무 힘들고 듣는다는것도 힘들것이다.

### ! 해결법은 무엇인가?

​	해결법이야 여러가지 방법이 존재하겠지만, 그 중 대표적인 예를 들어보면 - 공지사항,자료실 같은 수많은 포커스가 되는 영역에서는 방향키 화살표를 통해 읽고 싶은 요소만 선택하게 하는것이다. 

> 1. 공지사항
> 2. 자료실
> 3. 세션 1
>    1. 목록
>    2. 더보기
> 4. 세션2
>    1. 목록
>    2. 더보기

[이를 적용한 대한항공 사이트] https://www.koreanair.com/content/koreanair/global/en.html/





### fieldset 태그의 버그

​	fieldset 태그는 보통 form 태그 내부에서 쓰인다.

form - fieldset + legend + label + input 형식으로 많이 사용하는데, 여기서 fieldset 태그에 flex를 주게 될 경우, 크롬에서는 버그를 일으키게된다. ( 보통, form태그에 display:flex를 주면 크롬은 flex가 적용이 안되는 버그를 일으킨다. )

해결법으로는 form - fieldset + legend + label + input 과 같은 형식에서

form - fieldset - div + legend + label + input 과 같이 <div> 태그로 1번더 그룹핑한다. 

그리고 div에 flex관련 css 스타일을 주면 해결할 수 있다.

[flex 관련 이슈] https://naradesign.github.io/article/flex-browser-compatibility.html





### button 태그의 버그 (왜? button 대신 <a role="button"> 을 이용하는가?)

​	button 태그는 브라우저마다 padding , margin 영역이 다른 특성을 가지고 있다. 

따라서 <a> 태그와 WAI-ARIA를 이용하고 role="button" 을 주어 이 부분을 해결할 수 있다.





### vertical-align / text-align

	- vertical-align 은 inline 요소를 수직으로 정렬해주는 기능을 담고 있다.
	- text-align 은 block 요소를 정렬해주는 기능으로 block 요소 안에있는 inline 요소들(텍스트나 이미지)등도 같이 정렬해준다. inline 관련 태그에 직접 text-align 속성을 지정해줘도 작동하지 않는다.





### time 태그	

​	이 태그의 용도는 문서 내용 안에 어떤 날짜나 시간을 나타내는 표현이 있을 때 그 부분에 사용하여 알맞은 날짜나 시간을 컴퓨터가 인식할 수 있게 의미적으로 나타내는 데 사용한다.

~~~~~html
<time datetime="2018-05-31T13:53:45">2018.05.31</time>
~~~~~





### block 태그 안에서 여백을 주는 여러가지 방법들.

​	여백을 주는 각 방법들마다 차이가 있으니 확인하고 써야 할 것.

특히 %, auto , 정적px에 대한 차이를 이해하는것이 중요하다.

1. padding ?%; ?px;

2. margin  ?%; ?px;

3. width : ?px;

4. width : ?%;

5. margin : auto; 

6. calc -> 반응형

   



### 글자 수 숨기기 (... 처리하기)

​	block 박스에서 글자수가 일정 이상 넘어가서 ...을 처리하고 싶다먼 아래 style을 모두 구성해주어야한다.

~~~css
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
~~~





### fontello

​	이전에 설명한 fontello를 html문서에서 class 형태로 주어 icon이미지를 생성하면 그 태그 앞에 가상클래스를 자동으로 만들어주고 이미지를 넣게된다.

~~~~~html
<li class="icon-dot-circled">
  <!-- li클래스 앞에 가상클래스를 만들고 이미지를 넣는것을 자동으로 해줌. -->
~~~~~

​	fontello.css 에 있는 내용 중...

~~~~~css
.icon-dot-circled:before { content: '\f192'; } 
~~~~~





### aria-labelledby

~~~~~html
 <a href="#" class="icon-plus notice-more more" title="공지사항" aria-labelledby="notice">더보기</a>
~~~~~

 위 a링크는 aria-labelledby="notice" 로 인해  id가 "notice"인것을 연결해준다.

~~~html
<a href="#" class="tab" role="button" id="notice">공지사항</a>
~~~