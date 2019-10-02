![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)



------

## JavaScript Study 02

- 웹 브라우저는 어떻게 동작하는가?
- ESLint 

<br/>

-----------

`<head>` 안에는 기본적으로 `<meta ~ >`가 들어간다

시멘틱 문법상 `<head>`는 눈에 보이지 않는 데이터들을 모아놓은 집합이다.

따라서  `script`파일은 `<haed>`안에 들어가야 맞다. 

하지만 인터프리터는 위에서 한줄 할줄 읽는다. 만약 `script` 가 `head`에 들어갈 경우 `script`에 정의된 변수나 객체들이 html에 랜더링  되어야 값들을 참조 못할 수 있다. 

따라서 body 태그 최하단에 넣어주는 것이다.

</br> 

### 웹 브라우저는 어떻게 동작하는가?

- 클라이언트 : 서비스를 받는 입장 ( 요청하는 입장 )
- 서버 : 서비스를 하는 입장 ( 응답하는 입장)  

도메인 : ip를 식별하는 이름.

암묵적인 룰 : 웹서버는 root로 요청이 오면 index.html를 주도록 되어있다. ex) www.naver.com

<br/>

브라우저의 핵심적인 역할 : 

- 서버에 HTML, CSS , Javascript를 요청.

- 그리고 그리는 역할

<br/>

서버의 역할

- 무한 대기 ( 리퀘스트를 받기 위해서 )



응답받은 파일(html, css)을 메모리상에 올린다. 이를  Read 라 한다.

그 후 Rendering Engine이 실행할 수 있는 형식으로 만들어 준다. 이를 Parsing  이라 한다.

Parsing이 완료되면 Tree가 만들어지는데 이를 DOM tree ( CSS라면 CSSOM tree)가 만들어진다.

tree : 자료구조의 하나로 거슬로 올라가고 / 따라서 내려가기 편하다.



만약 Rendering Engine이 파싱중`<style>` 를 만난다면 DOM작성을 중지하고 서버에게 css파일을 요청하고 응답받는다.

다시 받은 css파일을 



HTTP : 단방향 통신 

-----------------

검사창을 통해 테스트 하는 방법

1. console.log

2. 디버깅이란?  논리적인 오류를 검출하여 제거하는 과정.

   디버깅하는법 : 검사창을 통해 에러 확인 . Sources 탭에서 에러부분에 밑줄이 쳐있다.  

   break 거는법 의심가는 줄을 선택한다. 그 부분에서 소스부분을 넘어가지 않고 멈춘다.

play ground 안에 eslint를 설치할 것이기에 밖에서는 안먹힘.





### ESLint

> **코드 Linting 이란?** 특정 스타일 규칙을 준수하지 않는 문제가 있는 소스코드를 찾는데 사용되는 방식
>
> Linter는 이러한 Linting을 수행하는 도구를 의미.
>
> ESLint는 특정 스타일 규칙을 제한하거나 새롭게 개정까지 가능하다.

 대부분의 프로그래밍 언어에는 컴파일하는 과정이 있어서 컴파일시 수행되는 Linter가 내장되어있다. 

 하지만, Javascript는 컴파일하는 언어가 아니기 때문에 이러한 오류를 잡기 위해 **ESLint** 와 같은 프로그램을 적극적으로 이용하여 실행하지 않고 기본적인 코드 오류, 구문 오류, 잘못된 규칙등을 발견할 수 있다.

<br/>

#### ESLint 사용 2가지 방식

1. JavaScript 개발시 사용되는 에디터에 플러그인을 추가하는 방식
2. Webpack에 번들링 하여 사용하는 방식.

<br/>

#### ESLint 설치 및 설정

1. 폴더 생성 후  npm 초기화 및 npm으로 eslint 관련파일 설치
   - eslint
   - eslint-config-airbnb-base : arirbnb 에서 제정된 코드 스타일 규칙은 좋기로 유명하다.
   - eslint-plugin-import
   - eslint-plugin-html
   
   
   
   - 아래 명령 실행 
   
   `$ cd <project-folder>`
   `$ npm init -y`
   
   `$ npm install eslint eslint-config-airbnb-base eslint-plugin-import eslint-plugin-html --save-dev`

**- 주의 : ESLint는 가급적이면 해당 폴더에서만 사용할 수 있도록 설치 하는것이 좋다. 전역설치는 매번 추가 설정이 필요로 한다.**

![설치 완료 후 폴더 상태](https://user-images.githubusercontent.com/31315644/66038841-33c0e480-e54e-11e9-9fc8-4277d185b003.jpeg)

1. node_modules 폴더
2. package-lock.json (없을 수도 있다.)
3. package.json

<br/>

2. VSCode에 extention 설치

![install-extention](https://user-images.githubusercontent.com/31315644/66038837-30c5f400-e54e-11e9-9e9b-767e6e52d3c1.jpeg)

<br/>

3. 사용중인 폴더에 **.eslintrc.js 파일 생성** 후 아래 코드 넣기

   ~~~javascript
   module.exports = {
     "parserOptions": {
    "ecmaVersion": 9
     },
     "env": {
       "browser": true,
       "commonjs": true,
       "node": true,
       "jquery": true
     },
     "extends": "airbnb-base",
     "plugins": [ "import", "html" ],
     "rules": {
       // "off" or 0 - turn the rule off
       // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
       // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
       "no-console": "warn",
       "quotes": [ "error", "single" ],
       "no-underscore-dangle": "warn",
       "no-plusplus": [ "error", { "allowForLoopAfterthoughts": true }],
       "comma-dangle": [ "error", "never"]
     }
   };
   ~~~
   
   <br/>
   
4. ESLint 사용처 명시하기

![eslint설정](https://user-images.githubusercontent.com/31315644/66038839-328fb780-e54e-11e9-9c45-8e29642ddd46.png)

(맥OS 기준) - 설정 탭 접근 - 오른쪽 상단 아이콘 클릭 - 아래 코드 추가

~~~javascript
    "eslint.validate" : [
        "javascript",
        "javascriptreact",
        "html"
    ]
~~~

<br/>

#### ESLint 사용하기

![eslint적용후_화면](https://user-images.githubusercontent.com/31315644/66040112-9ebfea80-e551-11e9-90e0-56c772a946fa.jpeg)

ESLint 가 정상적으로 적용이 완료되었다면 위와 같이 전혀 **문제 없어보이는 코드에도 에러, 경고등을 표시한다.**

마우스를 살포시 올려보면 무엇이 에러인지 적혀있다.

위 예제에서는 " var를 쓰지말고 let 이나 const를 써라 "라고 경고하고 있다.

<br/>

**ESLint 규칙 설정하기** (**.eslintrc.js**)

![eslintrc설정](https://user-images.githubusercontent.com/31315644/66040781-51447d00-e553-11e9-9332-055fa22c9a9a.jpeg)

위와 같이 마우스를 올릴 경우 나오는 에러 혹은 경고등을 **.eslintrc.js 파일**에서 설정이 가능하다.

- off : 0
- warn : 1
- error : 2