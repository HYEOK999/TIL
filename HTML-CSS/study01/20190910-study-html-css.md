![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)

## HTML Study 04

- MarkUp 짜기
- 로그인창 HTML ~CSS 구성해보기
- form 태그
- dt dl dd 태그
- a태그의 속성
- 들여쓰기 방법들
- text-indent 는 첫줄 들여쓰기를 넣어주는 속성이며, 박스에 영향을 주지않는다. 단, 개행시 유효하지 않은 속성이 된다.

****

### 마크업시 생각나는 고민들!

div -> 의미없는 정보

section -> 1장 1절 같은 정보 , header 태그가 없으면 경고를 띄운다.

article ->  독립된 완결된 정보, RSS , header 태그가 없으면 경고를 띄운다.

margin은 겹침현상이 발생한다. box-shadow 도 인접 태그의 margin에 영향을 주지 않는다.(즉, 겹친다.)

title은 id, class, style같은 대표속성이며 <a> 태그에 사용시 마우스를 올렸을 경우 글박스를 띄운다. 

****

### MarkUp 짜기

​	간단해보이지만 HTML중 가장 어려운 구간이다. 어떠한 태그를 좋게 사용하느냐, 논리적인 순서를 지켰느냐의 위주로 짜야하며 반드시 **디자인적 관점으로 구성하면 안된다!**

1. 논리적 순서를 가려낸다.
2. 시멘틱하게 이름 정하기
3. 코드 짜기

![sss](https://user-images.githubusercontent.com/31315644/64631362-e9a68080-d431-11e9-9084-4539244c8978.jpeg)

> 대표적인 네이버의 로그인창 예제.
>
> 보통 마크업 순서라면 아이디 -> 비밀번호 -> 로그인 -> 로그인 상태 유지 일것이다.
>
> **하지만! 논리적으로 계산해보면 로그인 하기전에 로그인상태유지 버튼을 체크하거나 해제하는것이 맞지 않을까?**

### 로그인창 HTML ~CSS 구성해보기

![login-window](https://user-images.githubusercontent.com/31315644/64631344-de535500-d431-11e9-9cd5-14b06e421d02.jpeg)

<img width="685" alt="login 창" src="https://user-images.githubusercontent.com/31315644/64631311-ca0f5800-d431-11e9-9026-98c9d2409c65.png">



### form 태그

form 관련 요소 -> 정보를 보내고 받는 값들의 입력 서식을 모아놓은 모음들.

https://formspree.io/  :  form 정보를 내 이메일로 보내게끔 서비스하는 사이트 . 무료,유료 나뉜다.

form , fieldset, legend ==> XHTML 관점에서 다 있어야만 한다.

HTML4에서는 form만 있어도 되고 HTML5에서는 둘다 허용이된다. 

따라서 **form, fieldset , legend, label, input 모두 사용하는 것이 좋다.**

fieldset은 폼서식을 그룹화하는 것. legend는 그룹화한 폼서식에 대한 제목이다.

하나의 form안에 fieldset은 여러개 들어가도 상관없다.

required -> 논리적 검사 예 ) input 태그 안에 required를 적게 되면 이메일 값을 안적을 경우 경고창을 띄운다.

form 안 에서 값을 그냥 입력하면 안되고 반드시 1:1로 값을 대입해줘여한다.

<label for="">아이디</label>

<input type="text" placeholder="아이디">

<label> 은 입력서식에 대한 이름 이고 <input>는 정보를 입력받는 창이다.

placeholder 속성은 입력서식에 대한 예시다.





### dl dt dd 태그

**dl dt dd는 정의형 목록을 의미하며 각 태그당 한개씩만 사용하는것이 좋다.**

~~~~html
<dl>
  <div>
    <dt></dt>
    <dd></dd>
  </div>
</dl>   
<!--가능한 구문. 단, div가 dt나 dd쪽에 들어가서는 안된다.-->
~~~~





### a태그 

a태그 target="_blank". -> 새창을 열음

반응형 이미지들은 반드시 <div> <span> 등으로 랩핑하는것이 좋다.

section / article 은 문법검사시 header태그가 없으면 경고가 뜬다

div는 안뜸.



### 들여쓰기 방법들

1. padding
2. margin
3. text-indent



### line-height

~~~~~~~css
line-height: normal | length | number | percentage | initial | inherit | 숫자값
~~~~~~~

- normal : 웹브라우저에서 정한 기본값. 보통 1.2
- length : 길이로 줄 높이를 정한다.
- number : 글자 크기의 몇 배인지로 줄 높이를 정한다.
- percentage : 글자 크기의 몇 %로 줄 높이로 정한다.
- initial : 기본값으로 설정한다.
- inherit : 부모 요소의 속성값을 상속받는다.

 예를 들어 글자크기가 40px일 때 line-height의 값을 1.5로 하면, 줄 높이는 40의 1.5배인 60px가 된다. 줄 높이는 60px인데 글자 크기는 40px이므로, 글자 위와 아래에 각각 10px의 여백이 생긴다. 줄 높이가 글자 크기보다 작으면 세로 방향으로 글자가 겹치게 된다.







