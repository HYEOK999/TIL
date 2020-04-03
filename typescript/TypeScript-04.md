![React with TypeScript](https://user-images.githubusercontent.com/31315644/77824045-edd28b00-7142-11ea-83d8-b88e7cb6c97d.png)

------------

# 타입스크립트 기초 연습하기 (타입 별명, 제네릭)

## 목차

- [Type Alias 사용하기](#a1)
- [Generics](#a2)
  - [함수에서 Generics 사용하기](#a3)
  - [interface 에서 Generics 사용하기](#a4)
  - [Type Alias 에서 Generics 사용하기](#a5)
  - [클래스에서 Generics 사용하기](#a6)

<br/>

----------

### Type Alias 사용하기 <a id="a1"></a>

> `type`은 특정 타입에 별칭을 붙이는 용도로 사용한다. 
>
> 객체를, 배열, 또는 그 어떤 타입이던 별칭을 지어줄 수 있다.

```typescript
type Person = {
  name: string;
  age?: number; // 물음표가 들어갔다는 것은, 설정을 해도 되고 안해도 되는 값이라는 것을 의미한다.
};

// & 는 Intersection 으로서 두개 이상의 타입들을 합쳐준다.
// 참고: https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types
type Developer = Person & {
  skills: string[];
};

const person: Person = {
  name: '김사람'
};

const expert: Developer = {
  name: '김개발',
  skills: ['javascript', 'react']
};

type People = Person[]; // Person[] 를 이제 앞으로 People 이라는 타입으로 사용 할 수 있습니다.
const people: People = [person, expert];

type Color = 'red' | 'orange' | 'yellow';
const color: Color = 'red';
const colors: Color[] = ['red', 'orange'];
```

**Q . 위 코드를 보았을 때 interface와 많이 유사하다. 그렇다면 어떤 무엇을 쓰는게 정답일까?**

**A . 정답은 어떤 것을 이용하던 상관없다. 단, 일관성 있게 사용하는 것이 중요하다.**

구버전의 타입스크립트에서는 `type` 과 `interface` 의 차이가 많이 존재했었는데 이제는 큰 차이는 없다. 

다만 라이브러리를 작성하거나 다른 라이브러리를 위한 타입 지원 파일을 작성하게 될 때는 `interface`를 사용하는것이 권장 되고 있다.

<br/>

### Generics  <a id="a2"></a>

>  제네릭(Generics)은 타입스크립트에서 `함수`,` 클래스`, `interface`, `type`을 사용하게 될 때 여러 종류의 타입에 대하여 호환을 맞춰야 하는 상황에서 사용하는 문법이다.

#### 함수에서 Generics 사용하기  <a id="a3"></a>

객체 A 와 객체 B를 합쳐주는 `merge` 라는 함수를 만든다고 가정하자.

이럴 경우, 객체 A와 객체 B가 어떤 타입이 올 지 알 수 없기 때문에 `any` 라는 타입을 사용한다.

```jsx
function merge(a: any, b: any): any {
  return {
    ...a,
    ...b
  };
}

const merged = merge({ foo: 1 }, { bar: 1 });
```

**문제는 위와 같은 코드를 작성할 경우, 타입추론이 모두 깨진 것이나 다름 없다.**

결과가 `any` 라는 것은 즉 `merged` 안에 무엇이 있는지 알 수 없다는 뜻이기 때문이다.

<br/>

**위와 같은 상황에서 제네릭을 사용한다.**

제네릭을 사용 할 때는 이렇게 `<T>` 처럼 꺽쇠 안에 타입의 이름을 넣어서 사용하며, 이렇게 설정을 해주면 제네릭에 해당하는 타입에는 뭐든지 들어올 수 있게 되면서도, 사용 할 때 타입이 깨지지 않게 된다.

이런식으로 제네릭을 사용하게 된다면 함수의 파라미터로 넣은 실제 값의 타입을 활용하게 된다.

```typescript
function merge<A, B>(a: A, b: B): A & B {
  return {
    ...a,
    ...b
  };
}

const merged = merge({ foo: 1 }, { bar: 1 });

// 다른 예시
function wrap<T>(param: T) {
  return {
    param // param: number;
  }
}

const wrapped = wrap(10);
```

<br/>

#### interface 에서 Generics 사용하기  <a id="a4"></a>

만약 `Items` 라는 타입을 사용하게 된다면, `Items` 타입을 지니고 있는 객체의 `list` 배열은 `string[]` 타입을 지니고 있게 된다. 

이렇게 함으로써, `list`가 숫자배열인 경우, 문자열배열인경우, 객체배열, 또는 그 어떤 배열인 경우에도 하나의 `interface` 만을 사용하여 타입을 설정 할 수 있다.

```typescript
interface Items<T> {
  list: T[];
}

const items: Items<string> = {
  list: ['a', 'b', 'c']
};
```

<br/>

#### Type Alias 에서 Generics 사용하기  <a id="a5"></a>

```typescript
type Items<T> = {
  list: T[];
};

const items: Items<string> = {
  list: ['a', 'b', 'c']
};
```

<br/>

#### 클래스에서 Generics 사용하기  <a id="a6"></a>

제네릭을 이용하여 Queue 만들어보기.

Queue는 선입선출(FIFO) 의 성질을 가지고 있는 자료구조이다.

등록(`enqueue`) 한 항목을 먼저 출력(`dequeue`) 할 수 있다.

제네릭을 이용한 Queue 에서는 다양한 원소 타입으로 이루어진 Queue의 타입을 설정할 수 있다.

예를 들어서 `Queue` 이라고 하면 문자열로 이루어진 Queue의 타입이 된다.

```typescript
class Queue<T> {
  list: T[] = [];
  get length() {
    return this.list.length;
  }
  enqueue(item: T) {
    this.list.push(item);
  }
  dequeue() {
    return this.list.shift();
  }
}

const queue = new Queue<number>();
queue.enqueue(0);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
console.log('큐의 길이: ', queue.length);
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());

/*
큐의 길이: 5
0
1
2
3
4
*/
```

-----------

### Reference

- [velopert.log : 타입스크립트 기초 연습](https://velog.io/@velopert/typescript-basics)