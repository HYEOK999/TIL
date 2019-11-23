<img width="800" alt="ITERATION" src="https://user-images.githubusercontent.com/31315644/69250378-e5959c80-0bf2-11ea-97bb-40c5c51490cc.png">

## JavaScript 이터레이션 프로토콜

- 이터레이션 프로토콜
  
  - 이터러블
  
  - 이터레이터
  
  - 빌트인 이터러블
- 이터레이션 프로토콜의 필요성

  - for…of 문
- 커스텀 이터러블
  - 커스텀 이터러블 구현
  - 이터러블을 생성하는 함수
  - 무한 이터러블과 Lazy evaluation(지연 평가)

<br/>

------

## 이터레이션 프로토콜

<br/>

ES6부터 도입된 이터레이션 프로토콜은 데이터 컬렉션을 순회하기 위한 프로토콜.

> 이터레이션 프로토콜을 준수한 객체는 for...of로 순회가 가능하며 spread문법의 피연산자가 될 수 있다.

이터레이션 프로토콜에는 2가지가 있다.

1. 이터러블 프로토콜
2. 이터레이터 프로토콜

![iteration-protocol](https://poiemaweb.com/img/iteration-protocol.png)



<br/>

#### 이터러블

이터러블 프로토콜을 준수한 객체를 이터러블이라 칭한다.

> 이터러블은 Symbol.iterator 메소드를 구현하거나 프로토 타입 체인에 의해 상속한 객체를 일컫는다.

Symbol.iterator 메소드는 **이터레이터를 반환**한다.

**배열은 Symbol.iterator 메소드를 소유한다. 따라서 배열은 이터러블 프로토콜을 준수한 이터러블이다.**

반대로 일반 객체는 Symbol.iterator 메소드를 소유하고 있지 않다. 따라서 일반 객체는 이터러블이 아니다.

~~~javascript
const array = [1, 2, 3];

// 배열은 Symbol.iterator 메소드를 소유한다.
// 따라서 배열은 이터러블 프로토콜을 준수한 이터러블이다.
console.log(Symbol.iterator in array); // true

const obj = { a: 1, b: 2 };

// 일반 객체는 Symbol.iterator 메소드를 소유하지 않는다.
// 따라서 일반 객체는 이터러블 프로토콜을 준수한 이터러블이 아니다.
console.log(Symbol.iterator in obj); // false
~~~

일반 객체는 이터러블이 아니기 때문에 for…of 문에서 순회할 수 없으며 Spread 문법의 대상으로 사용할 수도 없다.

 하지만 이터러블이 아닌 일반 객체를 이터러블처럼 동작하도록 구현하고 싶다면 이터레이션 프로토콜을 따르면 된다. Symbol.iterator를 키로 갖는 메소드를 객체에 추가하고 이터레이터(iterator)를 반환하도록 구현하면 그 객체는 이터러블이 된다. ( = 커스텀 이터러블 )

```javascript
// 1 ~ 5 사이의 정수로 이루어진 이터러블
const iterable = {
  // Symbol.iterator 메소드를 구현하여 이터러블 프로토콜을 준수
  [Symbol.iterator]() {
    let cur = 1;
    const max = 5;
    // Symbol.iterator 메소드는 next 메소드를 소유한 이터레이터를 반환
    return {
      next() {
        return {
          value: cur++,
          done: cur > max + 1
        };
      }
    };
  }
};

for (const num of iterable) {
  console.log(num); // 1 2 3 4 5
}
```

<br/>

#### 이터레이터

이터레이터 프로토콜은

- `next 메소드를 소유` ➤ 호출 시 이터러블을 순회함
- `next 메소드의 호출 후 반환` ➤ `value`, `done` **프로퍼티** 를 갖는 이터레이터 리절트 객체

이 규약을 준수한 것이 이터레이터.

즉슨,

이터러블(Symbol.iterator 소유) ➤ Symbol.iterator 메소드 호출 ➤ 이터레이터 반환 ➤ 이터레이터(next 메소드 소유)

next메소드 호출 ➤ 이터레이터 리절트 객체 반환(value, done 프로퍼티 소유)

~~~javascript
// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메소드는 이터레이터를 반환한다.
const iterator = array[Symbol.iterator]();

// 이터레이터 프로토콜을 준수한 이터레이터는 next 메소드를 갖는다.
console.log('next' in iterator); // true

// 이터레이터의 next 메소드를 호출하면 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다.
// next 메소드를 호출할 때 마다 이터러블을 순회하며 이터레이터 리절트 객체를 반환한다.
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
~~~

이터레이터의 next 메소드가 반환하는 이터레이터 리절트 객체의 **value 프로퍼티는 현재 순회 중인 이터러블의 값을 반환**하고 **done 프로퍼티는 이터러블의 순회 완료 여부를 반환**한다.

<br/>

#### 빌트인 이터러블

ES6에서 제공하는 빌트인 이터러블들

**Array**, **String**, Map, Set, TypedArray(Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array), DOM data structure(NodeList, HTMLCollection), **Arguments**

<br/>

### 이터레이션 프로토콜의 필요성

이터러블은 데이터 공급자(Data provider)의 역할을 한다.

만약 다양한 데이터들(Array, String, Map, Set 등등 빌트인 이터러블들)의 순회방식이 각자만의 방식을 가지고 있다면 사용자는 해당 데이터를 사용할 때마다 그 방식을 일일히 지켜가야만 한다. 이러한 방법은 매우 비효율적이다. 

하지만, 다양한 데이터가 이터레이션 프로토콜을 준수하도록 규정하면 데이터 소비자는 이터레이션 프로토콜만을 지원하도록 구현하면 된다.

> 즉, 이터레이션 프로토콜은 다양한 데이터 소스가 하나의 순회 방식을 갖도록 규정하여 데이터 소비자가 효율적으로 다양한 데이터 소스를 사용할 수 있도록 **데이터 소비자와 데이터 소스를 연결하는 인터페이스의 역할을 한다.**

<img src="https://user-images.githubusercontent.com/31315644/69258892-b7b75480-0c00-11ea-9176-f0fb0af0bb39.jpeg" alt="데이터소비공급" style="zoom:50%;" />

1. 이터러블을 지원하는 데이터 소비자는 내부에서 Symbol.iterator 메소드를 호출해 이터레이터를 생성한다.
2. 이터레이터의 next 메소드를 호출하여 이터러블을 순회한다. 
3. next 메소드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을 취득한다.

<br/>

#### for…of 문

for…of 문은 내부적으로 이터레이터의 next 메소드를 호출하여 이터러블을 순회하며 next 메소드가 반환한 이터레이터 리절트 객체의 value 프로퍼티 값을 for…of 문의 변수에 할당한다. 

그리고 이터레이터 리절트 객체의 done 프로퍼티 값이 false이면 이터러블의 순회를 계속하고 true이면 이터러블의 순회를 중단한다.

```javascript
// 배열
for (const item of ['a', 'b', 'c']) {
  console.log(item);
}

// 문자열
for (const letter of 'abc') {
  console.log(letter);
}

// Map
for (const [key, value] of new Map([['a', '1'], ['b', '2'], ['c', '3']])) {
  console.log(`key : ${key} value : ${value}`); // key : a value : 1 ...
}

// Set
for (const val of new Set([1, 2, 3])) {
  console.log(val);
}
```

for…of 문이 내부적으로 동작하는 것을 for 문으로 표현하면 아래와 같다.

```javascript
// 이터러블
const iterable = [1, 2, 3];

// 이터레이터
const iterator = iterable[Symbol.iterator]();

for (;;) {
  // 이터레이터의 next 메소드를 호출하여 이터러블을 순회한다.
  const res = iterator.next();

  // next 메소드가 반환하는 이터레이터 리절트 객체의 done 프로퍼티가 true가 될 때까지 반복한다.
  if (res.done) break;

  console.log(res);
}
```

<br/>

### 커스텀 이터러블

[Poiema 커스텀 이터러블 참고](https://poiemaweb.com/es6-iteration-for-of#3-커스텀-이터러블)

#### 커스텀 이터러블 구현

일반 객체는 Symbol.iterator 메소드를 소유하지 않는다. 
즉, 일반 객체는 이터러블 프로토콜을 준수하지 않으므로 for…of 문으로 순회할 수 없다.

하지만 일반 객체가 이터레이션 프로토콜을 준수하도록 구현하면 이터러블이 된다. 

**예 : 피보나치 수열(1, 2, 3, 5…)을 구현한 간단한 이터러블**

```javascript
const fibonacci = {
  // Symbol.iterator 메소드를 구현하여 이터러블 프로토콜을 준수
  [Symbol.iterator]() {
    let [pre, cur] = [0, 1];
    // 최대값
    const max = 10;

    // Symbol.iterator 메소드는 next 메소드를 소유한 이터레이터를 반환해야 한다.
    // next 메소드는 이터레이터 리절트 객체를 반환
    return {
      // fibonacci 객체를 순회할 때마다 next 메소드가 호출된다.
      next() {
        [pre, cur] = [cur, pre + cur];
        return {
          value: cur,
          done: cur >= max
        };
      }
    };
  }
};

// 이터러블의 최대값을 외부에서 전달할 수 없다.
for (const num of fibonacci) {
  // for...of 내부에서 break는 가능하다.
  // if (num >= 10) break;
  console.log(num); // 1 2 3 5 8
}
```

Symbol.iterator 메소드는 next 메소드를 갖는 이터레이터를 반환하여야 한다. 그리고 next 메소드는 done과 value 프로퍼티를 가지는 이터레이터 리절트 객체를 반환한다. for…of 문은 done 프로퍼티가 true가 될 때까지 반복하며 done 프로퍼티가 true가 되면 반복을 중지한다.

이터러블은 for…of 문뿐만 아니라 spread 문법, 디스트럭쳐링 할당, Map과 Set의 생성자에도 사용된다.

```javascript
// spread 문법과 디스트럭처링을 사용하면 이터러블을 손쉽게 배열로 변환할 수 있다.
// spread 문법
const arr = [...fibonacci];
console.log(arr); // [ 1, 2, 3, 5, 8 ]

// 디스트럭처링
const [first, second, ...rest] = fibonacci;
console.log(first, second, rest); // 1 2 [ 3, 5, 8 ]
```

<br/>

#### 이터러블을 생성하는 함수

위 fibonacci 이터러블에는 외부에서 값을 전달할 방법이 없다는 아쉬운 점이 있다. 

fibonacci 이터러블의 최대값을 외부에서 전달할 수 있도록 수정해 보자.

이터러블의 최대 순회수를 전달받아 이터러블을 반환하는 함수를 만들면 된다.

```javascript
// 이터러블을 반환하는 함수
const fibonacciFunc = function (max) {
  let [pre, cur] = [0, 1];

  return {
    // Symbol.iterator 메소드를 구현하여 이터러블 프로토콜을 준수
    [Symbol.iterator]() {
      // Symbol.iterator 메소드는 next 메소드를 소유한 이터레이터를 반환해야 한다.
      // next 메소드는 이터레이터 리절트 객체를 반환
      return {
        // fibonacci 객체를 순회할 때마다 next 메소드가 호출된다.
        next() {
          [pre, cur] = [cur, pre + cur];
          return {
            value: cur,
            done: cur >= max
          };
        }
      };
    }
  };
};

// 이터러블을 반환하는 함수에 이터러블의 최대값을 전달한다.
for (const num of fibonacciFunc(10)) {
  console.log(num); // 1 2 3 5 8
}
```

<br/>

#### 이터러블이면서 이터레이터인 객체를 생성하는 함수

이터레이터를 생성하려면 이터러블의 Symbol.iterator 메소드를 호출해야 한다. 이터러블이면서 이터레이터인 객체를 생성하면 Symbol.iterator 메소드를 호출하지 않아도 된다.

```javascript
// 이터러블이면서 이터레이터인 객체를 반환하는 함수
const fibonacciFunc = function (max) {
  let [pre, cur] = [0, 1];

  // Symbol.iterator 메소드와 next 메소드를 소유한
  // 이터러블이면서 이터레이터인 객체를 반환
  return {
    // Symbol.iterator 메소드
    [Symbol.iterator]() {
      return this;
    },
    // next 메소드는 이터레이터 리절트 객체를 반환
    next() {
      [pre, cur] = [cur, pre + cur];
      return {
        value: cur,
        done: cur >= max
      };
    }
  };
};

// iter는 이터러블이면서 이터레이터이다.
let iter = fibonacciFunc(10);

// iter는 이터레이터이다.
console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 2, done: false}
console.log(iter.next()); // {value: 3, done: false}
console.log(iter.next()); // {value: 5, done: false}
console.log(iter.next()); // {value: 8, done: false}
console.log(iter.next()); // {value: 13, done: true}

iter = fibonacciFunc(10);

// iter는 이터러블이다.
for (const num of iter) {
  console.log(num); // 1 2 3 5 8
}
```

아래의 객체는 Symbol.iterator 메소드와 next 메소드를 소유한 이터러블이면서 이터레이터이다. Symbol.iterator 메소드는 this를 반환하므로 next 메소드를 갖는 이터레이터를 반환한다.

```javascript
{
  [Symbol.iterator]() {
    return this;
  },
  next() { /***/ }
}
```

<br/>

#### 무한 이터러블과 Lazy evaluation(지연 평가)

무한 이터러블(infinite sequence)을 생성하는 함수를 정의해보자.
이를 통해 [무한 수열(infinite sequence)](https://www.scienceall.com/무한수열infinite-sequence/)을 간단히 표현할 수 있다.

```javascript
// 무한 이터러블을 생성하는 함수
const fibonacciFunc = function () {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [cur, pre + cur];
      // done 프로퍼티를 생략한다.
      return { value: cur };
    }
  };
};

// fibonacciFunc 함수는 무한 이터러블을 생성한다.
for (const num of fibonacciFunc()) {
  if (num > 10000) break;
  console.log(num); // 1 2 3 5 8...
}

// 무한 이터러블에서 3개만을 취득한다.
const [f1, f2, f3] = fibonacciFunc();
console.log(f1, f2, f3); // 1 2 3
```

“[이터레이션 프로토콜의 필요성](https://poiemaweb.com/es6-iteration-for-of#4-이터레이션-프로토콜의-필요성)“에서 살펴보았듯이 이터러블은 데이터 공급자(Data provider)의 역할을 한다.
배열, 문자열, Map, Set 등의 빌트인 이터러블은 데이터를 모두 메모리에 확보한 다음 동작한다.
하지만 이터러블은 **[Lazy evaluation(지연 평가)](https://ko.wikipedia.org/wiki/느긋한_계산법)**를 통해 값을 생성한다.
Lazy evaluation은 평가 결과가 필요할 때까지 평가를 늦추는 기법이다.

<br/>

위 예제의 fibonacciFunc 함수는 무한 이터러블을 생성한다.
하지만 fibonacciFunc 함수가 생성한 무한 이터러블은 데이터를 공급하는 메커니즘을 구현한 것으로 데이터 소비자인 for…of 문이나 디스트럭처링 할당이 실행되기 이전까지 데이터를 생성하지는 않는다.
for…of 문의 경우, 이터러블을 순회할 때 내부에서 이터레이터의 next 메소드를 호출하는데 바로 이때 데이터가 생성된다. next 메소드가 호출되기 이전까지는 데이터를 생성하지 않는다.
즉, 데이터가 필요할 때까지 데이터의 생성을 지연하다가 데이터가 필요한 순간 데이터를 생성한다.