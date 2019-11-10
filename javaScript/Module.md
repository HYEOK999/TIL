<img src="https://user-images.githubusercontent.com/31315644/68540279-a2f1ea00-03d2-11ea-9374-e4036dfa83ff.jpg" alt="legoBlocks" style="zoom:50%;" />

----------

## JavaScript Module

-  ECMAScript 모듈
  - JS는 모듈기능이 없었다. (ES6 - 19년 5월부터 모듈기능 추가)
  - [파일 스코프](#a1)
  - [export 키워드](#a2)
    - [기본 export](#a3)
    - [모아서 export](#a4)
    - [default export](#a5)
  - [import 키워드](#a6)
    - [기본 import](#a7)
    - [이름 변경 import](#a8)
    - [default export모듈을 import](#a9)
  - [import ~ export 동작 확인](#a10)

<br/>

------

## ECMAScript 모듈

> 모듈이란 애플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각을 일컫는다. 
> 세부 사항을 캡슐화하고 공개가 필요한 API만을 외부에 노출한다.

<img src="https://poiemaweb.com/img/module-pattern.png" alt="module-pattern" style="zoom:50%;" />

- 모듈은 파일 단위(기능 별로 분리되어 작성)로 분리되어 개별적으로 존재함.
- 애플리케이션은 필요에 따라 명시적으로 모듈을 로드하여 재사용.
- 기능별로 분리 구성되어 코드의 단위를 명확히 분리하여 구성했기에 재사용성, 효율성, 유지보수성을 높인다.

<br/>

### JS는 모듈기능이 없었다. (ES6 - 19년 5월부터 모듈기능 추가)

| C언어 / Java                                        | JavaScript                                      |
| --------------------------------------------------- | ----------------------------------------------- |
| #include / import                                   | script                                          |
| 외부 파일을 가지고 올 수 있다.                      | 외부 파일을 가지고 올 수 있다.                  |
| 외부 파일들은 각 파일마다 독립적인 스코프를 지닌다. | 외부 파일들은 모두 하나의 전역 스코프를 지닌다. |
| 모듈화가 가능하다.                                  | 전역 스코프로 모듈화가 불가능하다.              |

<br/>

2019년 5월부터 모던 브라우저(Chrome 61, FF 60, SF 10.1, Edge 16 이상)에서 ES6 모듈을 사용할 수 있다.
script 태그에 `type="module"` 어트리뷰트를 추가하면 로드된 자바스크립트 파일은 모듈로서 동작한다. 
모듈의 파일 확장자는 mjs를 권장한다.

~~~javascript
<script type="module" src="lib.mjs"></script>
<script type="module" src="app.mjs"></script>
~~~

<br/>

하지만 아직까지는 ES6 모듈 기능보다는 [Webpack](https://webpack.js.org/) 등의 모듈 번들러를 사용하는 것이 일반적이다.

- IE를 포함한 구형 브라우저는 ES6 모듈을 지원하지 않는다.
- 브라우저의 ES6 모듈 기능을 사용하더라도 트랜스파일링이나 번들링이 필요하다.
- 아직 지원하지 않는 기능(Bare import 등)이 있다. ([ECMAScript modules in browsers](https://jakearchibald.com/2017/es-modules-in-browsers/) 참고)
- 점차 해결되고는 있지만 아직 몇가지 이슈가 있다. ([ECMAScript modules in browsers](https://jakearchibald.com/2017/es-modules-in-browsers/) 참고)

따라서 ES6 를 아울러 ES5 하위 버전까지 모듈을 사용하기 위해서는  Babel과  Webpack을 이용한 ES6 개발환경 구축이 필요하다.

<br/>

### 파일 스코프 <a id="a1"></a>

> 모듈은 **파일 스코프**를 갖는다. 
> 즉, **모듈 내에서 var 키워드로 선언한 변수는 더 이상 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.**

<br/>

~~~javascript
// foo.js
var x = 'foo';

console.log(x);
~~~

~~~javascript
// bar.js
// 중복 선언이 아니다. 스코프가 다른 변수이다.
var x = 'bar';

console.log(x);
~~~

```javascript
<!DOCTYPE html>
<html>
<body>
  <script type="module" src="foo.js"></script>
  <script type="module" src="bar.js"></script>
</body>
</html>
```

결과는 순서대로  다음과 같이 출력된다.

~~~
'foo'
'bar'
~~~

만약 bar.js 에서 아무것도 선언안하고 x를 출력할 경우, 

`Uncaught ReferenceError: x is not defined` 를 출력한다.

이유 : 모듈화된 foo를 외부에서 참조할 수 없고, bar자체에서는 암묵적 선언이 없다. bar에서 var키워드로 생성된 변수는 window객체의 프로퍼티가 아니기 때문에 undefined도 안뜨기 때문이다.

<br/>

###export 키워드 <a id="a2"></a>

모듈은 독립적인 파일 스코프를 갖기 때문에 모듈 안에서 선언한 모든 것들은 기본적으로 해당 모듈 내부에서만 참조가 가능하다.

> 모듈 안에 선언한 항복을 외부에 공개하여 다른 모듈이 사용할 수 있게 하고 싶다면 export 해야 한다.
>
> 선언한 변수, 함수, 클래스 모두 export가 가능하다.

#### 기본 export <a id="a3"></a>

```javascript
// lib.js
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

<br/>

#### 모아서 export <a id="a4"></a>

- 선언문 앞에 매번 export 키워드를 붙이는 것이 싫다면 export 대상을 모아 하나의 객체로 구성하여 한번에 export할 수도 있다.

```javascript
// lib.js
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

<br/>

#### default export <a id="a5"></a>

- 모듈에서 하나만을 export할 때는 default 키워드를 사용할 수 있다. 
- 다만, default를 사용하는 경우, var, let, const는 사용할 수 없다.

```javascript
// lib.js
function (x) {
  return x * x;
}

export default;
```

위 코드를 아래와 같이 축약 표현할 수 있다.

```javascript
// lib.js
export default function (x) {
  return x * x;
}
```

<br/>

### import 키워드 <a id="a6"></a>

> export한 모듈을 import하기 위해서 사용한다.

#### 기본 import <a id="a7"></a>

- export한 모듈을 로드 시 export한 이름으로 import한다.

```javascript
// app.js
// 같은 폴더 내의 lib.js 모듈을 로드. 확장자 js는 생략 가능.
// 단, 브라우저 환경에서는 모듈의 파일 확장자를 생략할 수 없다.
import { pi, square, Person } from './lib';

console.log(pi);         // 3.141592653589793
console.log(square(10)); // 100
console.log(new Person('Lee')); // Person { name: 'Lee' }
```

- 각각의 이름을 지정하지 않고 하나의 이름으로 한꺼번에 import할 수도 있다. 
- 이때 import되는 항목은 as 뒤에 지정한 이름의 변수에 할당된다.

```javascript
// app.js
import * as lib from './lib';

console.log(lib.pi);         // 3.141592653589793
console.log(lib.square(10)); // 100
console.log(new lib.Person('Lee')); // Person { name: 'Lee' }
```

<br/>

#### 이름 변경 import <a id="a8"></a>

- 이름을 변경하여 import할 수도 있다.

```javascript
// app.js
import { pi as PI, square as sq, Person as P } from './lib';

console.log(PI);    // 3.141592653589793
console.log(sq(2)); // 4
console.log(new P('Kim')); // Person { name: 'Kim' }
```

<br/>

#### default export모듈을 import <a id="a9"></a>

- default 키워드와 함께 export한 모듈은 {} 없이 임의의 이름으로 import한다.

```javascript
// app.js
import square from './lib';

console.log(square(3)); // 9
```

<br/>

### import ~ export 동작 확인 <a id="a10"></a>

브라우저가 지원하는 ES6 모듈 기능을 이용하여 import와 export가 동작하는지 확인해보자.

~~~~javascript
// lib.js
export default x => x * x;
~~~~

~~~javascript
// app.js
// 브라우저 환경에서는 모듈의 파일 확장자를 생략할 수 없다.
// 모듈의 파일 확장자는 .mjs를 권장한다.
import square from './lib.js';
console.log(square(10)); // 100
~~~

```javascript
<!DOCTYPE html>
<html>
<body>
  <script type="module" src="./lib.js"></script>
  <script type="module" src="./app.js"></script>
</body>
</html>
```

**결과**

~~~bash
100
~~~

<br/>