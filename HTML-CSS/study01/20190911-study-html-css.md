![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)

## HTML Study 06

- MarkUp 짤 때 고민해야하는 점.
- fieldset 태그의 버그
- button태그의 버그
- vertical-align / text-align
- time 태그
- block 태그 안에서 여백을 주는 여러가지 방법들.
- 블록 태그에 맞춰서 글꼴 줄이기.
- fontello

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

​	해결법이야 여러가지 방법이 존재하겠지만, 그 중 대표적인 예를 들어보면 - 공지사항,자료실 같은 수많은 포커스가 되는 영역에서는 방향키 화살표를 통해 읽고 싶은 요소만 선택하게 하는것이다. [이를 적용한 대한항공 사이트] https://www.koreanair.com/content/koreanair/global/en.html/



### fieldset 태그의 버그

​	fieldset 태그는 보통 form 태그 내부에서 쓰인다.

form - fieldset + legend + label + input 형식으로 많이 사용하는데, 여기서 fieldset 태그에 flex를 주게 될 경우, 크롬에서는 버그를 일으키게된다. ( 보통, form태그에 display:flex를 주면 크롬은 flex가 적용이 안되는 버그를 일으킨다. )

해결법으로는 form - fieldset + legend + label + input 과 같은 형식에서

form - fieldset - div + legend + label + input 과 같이 <div> 태그로 1번더 그룹핑한다. 

그리고 div에 flex관련 css 스타일을 주면 해결할 수 있다.



 