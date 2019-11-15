![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)

------

## JavaScript Study 26

- 모듈
  - ES6 모듈
  - export 키워드
  - import 키워드
- Babel과 Webpack을 이용한 ES6 환경 구축
  - npm 패키지 설치시 --save-dev 옵션
  - babel-polyfill
  - .babelrc 설정 파일 
  - Webpack
  - webpack.config.js 설정 파일

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 모듈

- Babel

- Webpack

  <br/>

---------

## 모듈

 JS의 가장 큰 단점은 모듈이 존재하지 않는다는 것.

예를들어, script태그를 여러개 이용해서 서로 다른 .js 을 불러들인 다면 js간의 충돌을 야기할 수 있다.

이유는 모든 스크립트의 JS파일은 전역스코프를 공유하기 때문이다.

> 모듈은 파일 단위로 분리 되어있다.
>
> 이러한 모듈들은 독자적인 스코프를 나눠진다.
>
> 스코프들간에 서로 통신하기 위해서는 export , import를 이용한다.
>
> API들은 모듈패턴으로 구성된 코드들이다.

함수 : 전역 스코프 내에서 재사용과 가독성을 높이는 코드의 조합, 입력을 받고 출력을 내보내는 일련의 과정

모듈 : 파일 스코프 내에서 재사용과 가독성을 높이는 코드의 조합 (export. import)

ES6 모듈 : ESM => script 태그의 일부로 사용 (현업에 안쓰임)

JS의 모듈 : CommonJs(동기식) , AMD(Asynchronous Module Definition)(비동기식)

모듈을 한파일로 번들링하는 Babel + Webpack을 이용하여 사용한다.

번들링(여러개의 파일을 하나로 모음) 하는 이유

1. script파일이 여러군데 흩어져있을 경우 문제가 생기므로 하나로 합쳐서 문제를 방지한다.
2. 크로스 브라우징을 하기 위해서 ( Babel ) :  폴리필하여 구현함. 폴리필은 웹 개발에서 기능을 지원하지 않는 웹 브라우저 상의 기능을 구현하는 코드를 뜻한다.
3. 모든 리소스를 전부 번들링이 가능하다.( 분리해서 번들링 하는 것도 가능함. )

<br/>

### ES6 모듈

script 태그에 `type="module"` 어트리뷰트를 추가하면 로드된 자바스크립트 파일은 모듈로서 동작한다.

```html
<script type="module" src="lib.mjs"></script>
<script type="module" src="app.mjs"></script>
```

ES6 모듈의 파일 확장자는 모듈임을 명확히 하기 위해 mjs를 사용하도록 권장한다.

.mjs를 사용하게 되면 script는 자동으로 defer로 동작하게 되며 module 엄격모드(Strict Mode)로 한다.

그냥 .js 확장자를 이용해도 사용은 가능하다.

<br/>

### export 키워드

- 모듈은 독자적인 모듈 스코프를 갖기 때문에 모듈 안에 선언한 모든 식별자는 기본적으로 해당 모듈 내부에서만 참조할 수 있다. 
- 만약 모듈 안에 선언한 식별자를 외부에 공개하여 다른 모듈들이 참조할 수 있게 하고 싶다면 export 키워드를 사용한다. 
- 선언된 변수, 함수, 클래스 모두 export할 수 있다.
- 모듈을 공개하려면 선언문 앞에 export 키워드를 사용한다. 
- 여러 개를 export할 수 있는데 이때 각각의 export는 이름으로 구별할 수 있다.

```javascript
// lib.mjs
// 변수의 공개
export const pi = Math.PI;

// 함수의 공개
export function square(x) {
  return x * x;
}

// 클래스의 공개
export class Person {
  constructor(name) {
    this.name = name;
  }
}
```

선언문 앞에 매번 export 키워드를 붙이는 것이 싫다면 export 대상을 모아 하나의 객체로 구성하여 한번에 export할 수도 있다.

```javascript
// lib.mjs
const pi = Math.PI;

function square(x) {
  return x * x;
}

class Person {
  constructor(name) {
    this.name = name;
  }
}

// 변수, 함수 클래스를 하나의 객체로 구성하여 공개
export { pi, square, Person };
```

모듈에서 하나만을 export할 때는 default 키워드를 사용할 수 있다.

```javascript
// lib.mjs
export default function (x) {
  return x * x;
}
```

**다만, default를 사용하는 경우, var, let, const는 사용할 수 없다.**

defualt를 import 할 때는 식별자만 적어주면 되기 떄문에 간편한다.

~~~javascript
import sqaure from './lib.mjs';

console.log(sqaure(10)); // 100
~~~

<br/>

### import 키워드

모듈에서 공개(export)한 대상을 로드하려면 import 키워드를 사용한다.

모듈이 export한 식별자로 import하며 ES6 모듈의 파일 확장자를 생략할 수 없다.

```javascript
// app.mjs
// 같은 폴더 내의 lib.mjs 모듈을 로드.
// lib.mjs 모듈이 export한 식별자로 import한다.
// ES6 모듈의 파일 확장자를 생략할 수 없다.
import { pi, square, Person } from './lib.mjs';

console.log(pi);         // 3.141592653589793
console.log(square(10)); // 100
console.log(new Person('Lee')); // Person { name: 'Lee' }
```

<br/>

## Babel과 Webpack을 이용한 ES6 환경 구축

참고 : https://poiemaweb.com/es6-babel-webpack-1 , https://poiemaweb.com/es6-babel-webpack-2

현재 대부분의 브라우저가 ES6를 지원하고 있지만 IE 혹은 몇 브라우저는 지원을 안하고 있기도 하다. 따라서 이러한 문제를 해결하기 위해서 Babel과 Webpack을 사용한다.

추가적으로 ES6 의 모듈 기능보다는 Webpack의 모듈 번들러 기능이 더 유용해서 Webpack을 이용한다.

ES6의 모듈을 사용하지 않는 이유는 다음과 같다.

- IE를 포함한 구형 브라우저는 ES6 모듈을 지원하지 않는다.
- 브라우저의 ES6 모듈 기능을 사용하더라도 트랜스파일링이나 번들링이 필요하다.
- 아직 지원하지 않는 기능(Bare import 등)이 있다.
- 점차 해결되고는 있지만 아직 몇가지 이슈가 있다.

**트랜스파일러(Transpiler) [Babel](https://babeljs.io/)과 모듈 번들러(Module bundler) [Webpack](https://webpack.js.org/)을 이용하여 ES6+ 개발환경을 구축한다.**

다시 정리하면

`<script>` 태그를 그냥 사용할경우 해당 스크립트의 파일의 js들은 전역스코프를 가진다.
이러한 전역 스코프를 피하기 위해서 파일 스코프단위로 끊는 ES6의 모듈기능을 이용을 하는데  ES6의 모듈 기능은 우선 ES6에서만 가능하다는 점 때문에 하위 호환을 해줄 필요가 있는 **트랜스파일러 Babel**을 이용해야만 한다.
그리고 모듈화를 위해서는 `<script>` 파일이 점점 많아질 것이다. 이러한 현상은 네트웤 비용을 점차 늘리게 된다. 왜냐하면 각각의 js파일을 전부 불러들어야만 하기 때문이다. 그렇다고 js파일을 한개로 모으자니 모듈화의 의미가 없기 때문에 이것 조차 안된다. 이러한 현상을 막기 위해서 **번들러 Webpack**을 이용해야만 한다. 웹팩은 js, css를 묶어서 하나의 파일들로 만들어준다.

<br/>

### npm 패키지 설치시 --save-dev 옵션

--save-dev : 이 옵션으로 npm 설치 시 그냥 dependencies가 아니라 devDependencies가 생긴다.

두개의 차이는 실제로 서버에서 사용해야하는지 와 사용을 하지 말아햐하는지의 차이다. 

예를들어 eslint같은 것은 개발자를 위한 패키지 모듈인데 굳이 본서버에 올려서 노드모듈에 추가할 필요가 없다. 단지 개발을 쉽게하기 위한 툴이기 때문이다. 이러한 패키지들은 --save-dev로 설치하고 이러한 툴이 필요없는 패키지들은 해당 옵션을 사용하지 않는다.

<br/>

### babel-polyfill

Babel을 사용하여 ES6+코드를 하위버전으로 트랜스파일링 했다고 가정하자.

그런데도 ES6 문법 Promise, Object.assign, Array, from 등과 같은 문법은 하위버전에서 대체할만한 수단이 존재하지 않는다. 

따라서 babel로 트랜스파일링을 해도 위 문법들은 그대로 남아있다. 이런 문제들은 polyfill을 사용해서 구현해야만 한다.

polyfill이란? 기능을 지원하지 않는 웹 브라우저 상의 기능을 구현하는 코드를 의미한다.

<br/>

### .babelrc 설정 파일 

Babel을 사용하려면 `@babel/preset-env`을 설치해야 한다. [@babel/preset-env](https://babeljs.io/docs/plugins/preset-env/)은 함께 사용되어야 하는 Babel 플러그인을 모아 둔 것으로 [Babel 프리셋](https://babeljs.io/docs/en/presets)이라고 부른다. Babel이 제공하는 공식 Babel 프리셋(Official Preset)은 아래와 같다.

- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)
- [@babel/preset-flow](https://babeljs.io/docs/en/babel-preset-flow)
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)
- [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)

`@babel/preset-env`도 공식 프리셋의 하나이며 필요한 플러그인 들을 프로젝트 지원 환경에 맞춰서 동적으로 결정해 준다. 프로젝트 지원 환경은 [Browserslist](https://github.com/browserslist/browserslist) 형식으로 .browserslistrc 파일에 상세히 설정할 수 있다. 프로젝트 지원 환경 설정 작업을 생략하면 기본값으로 설정된다.

<br/>

### Webpack

Webpack은 의존관계에 있는 모듈들을 하나의 자바스크립트 파일로 번들링하는 모듈 번들러이다.

Webpack을 사용하면 의존 모듈이 하나의 파일로 번들링되므로 별도의 모듈로더가 필요없다.

**다수의 자바스크립트 파일을 하나의 파일로 번들링하므로 html 파일에서 script 태그로 다수의 자바스크립트 파일을 로드해야 하는 번거로움도 사라진다.**

<br/>

### webpack.config.js 설정 파일

webpack.config.js은 Webpack이 실행될 때 참조하는 설정 파일이다. 

프로젝트 루트에 webpack.config.js 파일을 생성하고 아래처럼 작성한다. (예)

~~~javascript
const path = require('path');

module.exports = {
  // enntry file
  entry: ['@babel/polyfill', './src/js/main.js'],
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development'
};
~~~

1.   entry: ['@babel/polyfill', './src/js/main.js'] : 이 코드는 해당 위치에 있는 파일을 번들링 하겠다는 의미다.
2.   output: {
       path: path.resolve(__dirname, 'dist/js'),
       filename: 'bundle.js'
     } : path는 위치를 의미한다. 즉, dist/js에 bundle.js라는 의미로 번들링 파일이 생성된다.

<br/>