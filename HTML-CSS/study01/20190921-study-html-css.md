![html-css](https://user-images.githubusercontent.com/31315644/64251759-3252cb00-cf54-11e9-88f9-922505f9789e.jpeg)

## HTML Study 11

- fontello 사용법
- letter, word spacing
- transition 사용 주의점
- 프로젝트 하면서 느낀점 9월 23일

---------------------------

### fontello 사용법

1. fontello 사용법 
2. fontello 접속 마음에 드는 fontello 아이콘들 선택(라이센스 주의)
3. 다운로드
4. 다운로드 된 압출파일을 해제
5. 해제된 폴더를 프로젝트에 붙여넣는다.(가급적이면 폴더 네임수정 - 지저분함)
6. CSS파일에 다음과 같이 넣어준다.

~~~css
@import url('./fontello/css/fontello.css'); /*import*/


/*사용 방법*/
.header::after{
    content: '\e805';
    font-family: "fontello";
}
~~~



<br/>



### letter , word spacing

- 글자 사이의 간격은 letter-spacing으로, 단어 사이의 간격은 word-spacing으로 정한다.

- 값이 커지면 간격이 커진다.

- 값에는 음수를 넣을 수 있다.

  ( 마이크로소프트 엣지나 인터넷 익스플로러에서는 단어 사이의 간격을 음수로 정해도 글자가 겹치지 않을 정도로만 간격이 줄어든다.)

- 음수를 값으로 하는 경우 글자가 겹칠 수 있다.

- 글자 사이의 간격을 변화시키면 단어 사이의 간격도 변한다.

- 단어 사이의 간격을 변화시켜도 글자 사이의 간격은 변하지 않는다.

<br/>



### transition 사용 주의점

​	transition 사용시 초(s) 단위를 붙일 경우, 0일떄 s를 생략하면 작동을 안한다.

​	꼭 유의 하고 사용할 것.

<br/>

### 프로젝트 하면서 느낀점 

- 막히면 차분히 무엇이 문제인지 돌아보고 꼭 구조적으로 해결하기 보다는 작은부분부터 수정해 나가기.
- 개발 도중 정적이니 동적이니 반응형이니 고정형이니 생각하지 말고 현재 주어진 디자인만 생각하기.
- 레이아웃 설계는 가능한 그리면서 진행하기. (나중에 레이아웃을 뒤엎는 경우가 생긴다.)
- flex , float , absolute , grid 특성에 대해서 다시 한번 공부하기

<br/>

