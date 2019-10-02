![eslint](https://miro.medium.com/max/888/1*adPg-Z859DytSea5oLARGg.png)

-----------

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

   ```javascript
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
   ```

   <br/>

4. ESLint 사용처 명시하기

![eslint설정](https://user-images.githubusercontent.com/31315644/66038839-328fb780-e54e-11e9-9c45-8e29642ddd46.png)

(맥OS 기준) - 설정 탭 접근 - 오른쪽 상단 아이콘 클릭 - 아래 코드 추가

```javascript
    "eslint.validate" : [
        "javascript",
        "javascriptreact",
        "html"
    ]
```

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

