![](https://user-images.githubusercontent.com/31315644/66104821-b9976b00-e5f4-11e9-84e9-20c797dd2c51.jpeg)

------

## JavaScript 10강 예습

- 10강 : 원시 값과 객체의 비교
  1. 원시값
     - 변경 불가능한 값
     - 문자열과 불변성
     - 유사 배열 객체
     - 값에 의한 전달
  2. 객체 (참조값)
     - 변경 가능한 값
     - 참조에 의한 전달
     - 복사 : 얕은 복사( shallow copy ) / 깊은 복사 ( deep copy )
       1. shallow copy
       2. deep copy

<br/>

------

# 10강

​	데이터 타입의 구분

	- 원시타입 : 변경 불가능한 값. 원시값 - 숫자, 문자열, 불리언, null, undefined, symbol
	- 객체타입 : 변경 가능한 값. 참조값 - Object

|              | 원시 타입                                     | 객체 타입                                        |
| ------------ | --------------------------------------------- | ------------------------------------------------ |
| 변경 유무    | 변경 불가능한 값                              | 변경 가능한 값                                   |
| 값           | 원시값                                        | 참조값                                           |
| 종류         | 숫자,문자열,불리언,null,undefined,symbo       | 객체타입( Object)                                |
| 저장 방법    | 실제값 저장                                   | 참조값이 저장                                    |
| 타 변수 할당 | 원본의 원식 값이 복사되어 전달(Pass by value) | 원본의 참조값이 복사되어 전달(Pass by reference) |

<br/>

## 원시값

<br/>

### 변경 불가능한 값

> 원시값은 오직 읽을 수 만 있는(Read Only)한 값이므로 변경할 수 없다.

​	변경 불가능 하다는 것은 변수를 변경이 불가능하다는 것이 아니라 값을 변경 불가능하다는 이야기이다.

( 참고로, 상수는 재할당이 금지된 변수라는 뜻이므로 상수 내부에 있는 객체 프로퍼티의 값은 변경이 가능하다. )

 변수의 값을 변경하기 위해 원시 값을 재할당하면 새로운 메모리 공간을 확보하고 재할당한 값을 저장한 후, 변수가 참조하던 메모리 공간의 주소를 변경한다. 원시 값의 이러한 특성을 **불변성(immutability)**이라 한다.

![원시값](https://user-images.githubusercontent.com/31315644/66475027-77c36480-eacd-11e9-9f53-1428b02490b7.jpeg)



<br/>

### 문자열과 불변성

> 문자열은 0개 이상인 문자들의 집합을 말하며 1개의 문자는 2Byte의 메모리 공간에 저장된다.
>
> 따라서, 문자열 타입의 값은 몇개의 문자로 이루어졌는지에 따라 필요한 메모리 공간의 크기가 다르다.

<br/>

숫자는 1도 , 100000000000도 동일한 8byte가 필요하지만
문자열 타입은 1개의 문자로 이루어진 문자열은 2byte , 10개의 문자로 이루어진 문자열은 20byte가 필요하다.

문자열또한 `원시값` 인것을 명시해야만 한다.

~~~javascript
var str = 'Hello';
str = 'World';
~~~

![문자열할당](https://user-images.githubusercontent.com/31315644/66474759-e9e77980-eacc-11e9-8db0-562b7cf2f394.png)

<br/>

### 유사 배열 객체

> 유사 배열 객체는 마치 **배열처럼** 인덱스 프로퍼티 값에 접근할 수 있고 length프로퍼티를 갖는 객체를 의미한다.
>
> 따라서, 문자열은 원시값이면서 유사 배열 객체이다.

~~~~javascript
var str = 'string';

// 문자열은 유사 배열이므로 배열과 유사하게 인덱스를 사용하여 각 문자에 접근할 수 있다.
// 하지만 문자열은 원시 타입인 값이므로 변경할 수 없다. 이때 에러가 발생하지 않는다.
str[0] = 'S';

console.log(str); // string
~~~~

<br/>

### 값에 의한 전달

> 변수에 변수를 할당하는 경우, 할당되는 변수(score)가 원시값을 갖는 변수라면 할당받는 변수(copy)에는 할당되는 변수(score)의 원시값이 복사되어 전달된다. 이를 **값에 의한 전달(Pass by value)**라 한다.

~~~javascript
var score = 80;

// 변수 copy에는 변수 score의 원시값 80이 복사되어 할당된다.
var copy = score;
~~~

![값에 의한 전달](https://user-images.githubusercontent.com/31315644/66475024-76923780-eacd-11e9-92ff-0ba267df2d44.jpeg)

<br/>

## 객체

> 객체는 프로퍼티의 개수가 정해져 있지 않으며 동적으로 추가되고 삭제할 수 있다.
>
>  또한 프로퍼티의 값에도 제약이 없다.
>
> 따라서 객체는 원시 값과 같이 확보해야 할 메모리 공간의 크기를 사전에 정해 둘 수 없다.

자바는 클래스를 통해 미리 프로퍼티의 내용과 값을 지정해두는 방식을 기반하여 객체를 생성한다.

하지만, 자바스크립트의 대부분은 객체의 프로퍼티 값의 위치를 메모리에 저장하기 위해 해시 함수 기반의 유사딕셔너리구조(dictionary-like structure)를 사용한다.

**유사 딕셔너리 구조(dictionary-like structure)는 클래스없이 객체를 생성할 수 있으며 객체가 생성된 이후라도 동적으로 프로퍼티와 메소드를 추가할 수 있다.**

<img src="https://poiemaweb.com/assets/fs-images/10-5.png" alt="딕셔너리와 리스트" style="zoom:50%;" />

이는 비효율적이라서 자바스크립트에서는 자바와 같은 객체 관리 방식처럼 비용을 줄이기 위해 히든 클래스라는 방식을 이용한다.

<br/>

### 변경 가능한 값

~~~javascript
var person = {
  name: 'Lee'
};
~~~

아래 그림에서 person의 주소 0x000000F2에 저장된 값이 `참조값`이다. `참조값`을 평가하면 참조값에 적힌 메모리주소에 있는 객체를 반환한다.

<img src="https://poiemaweb.com/assets/fs-images/10-6.png" alt="객체의 할당" style="zoom:50%;" />

**객체를 할당한 변수를 평가하면 메모리에 저장되어 있는 참조 값을 반환하는 것이 아니라 참조 값을 통해 실제 객체에 접근해 그 객체를 반환한다.**

<br/>

원시 값을 할당한 변수의 경우, “변수는 ◯값을 갖는다.” 또는 “변수의 값은 ◯이다.”라고 표현한다.

객체를 할당한 변수의 경우, “변수는 객체를 참조하고 있다” 또는 “변수는 객체를 가리키고(point) 있다”라고 표현한다.

<br/>

원시 값을 할당한 변수는 재할당을 통해서만 변경이 가능하다.

반면에, 변수가 참조하고 있는 객체의 경우, 동적으로 프로퍼티 추가나 변경,삭제 등등 변경할 수 있는 값이다.

~~~javascript
var person = {
  name: 'Lee'
};

// 프로퍼티 키 name 의 프로퍼티 값 갱신
person.name = 'Kim';

// 프로퍼티 동적 추가
person.gender = 'male';

console.log(person); // {name: "Kim", gender: "male"}
~~~

<img src="https://poiemaweb.com/assets/fs-images/10-7.png" alt="변경가능한 객체" style="zoom:50%;" />

객체를 변경할 때 마다 원시 값처럼 이전 값을 복사하여 새롭게 생성한다면 명확하고 깔끔하겠지만 객체는 크기가 매우 클 수도 있고 프로퍼티 값이 객체일 수도 있어서 복사(Deep copy)하고 생성하는 비용이 많이 든다. 다시 말해, 메모리의 효율적 소비가 어렵고 퍼포먼스가 나빠진다.

따라서, 객체는 이러한 구조적 단점에 따른 부작용(Side effect)이 있다. 그것은 원시 값과는 다르게 **여러 개의 식별자가 하나의 객체를 공유할 수 있다**는 것이다.

<br/>

### 참조에 의한 전달

​	객체를 가리키는 변수(원본, person)를 다른 변수(사본, copy)에 할당하면 원본의 참조 값이 복사되어 전달된다. 이를 **참조에 의한 전달(Pass by reference)**라 한다.

~~~javascript
var person = {
  name: 'Lee'
};

// 참조 값을 복사
var copy = person;
~~~

<br/>

![참조에 의한 전달](https://poiemaweb.com/assets/fs-images/10-8.png)

<br/>

원본 person와 사본 copy 모두 동일한 객체를 가리키고 있다.

이것은 두개의 식별자가 하나의 객체를 공유한다는 것을 의미한다.

따라서 원본 또는 사본 어떤 한쪽에서 객체를 변경(객체의 프로퍼티 값 변경 또는 추가, 삭제)이 하면 **서로 영향을 주고 받는다.**

```javascript
var person = {
  name: 'Lee'
};

// 참조 값을 복사. copy와 person은 동일한 객체를 참조한다.
var copy = person;

// copy와 person은 같은 참조 값을 갖는다.
console.log(copy === person); // true

// copy를 통해 객체를 변경한다.
copy.name = 'Kim';

// person을 통해 객체를 변경한다.
person.address = 'Seoul';

// copy와 person은 같은 동일한 가리키고 있다.
// 따라서 어느 한쪽에서 객체를 변경하면 서로 영향을 주고 받는다.
console.log(person); // {name: "Kim", address: "Seoul"}
console.log(copy);   // {name: "Kim", address: "Seoul"}
```

<br/>

### 복사 : 얕은 복사( shallow copy ) / 깊은 복사 ( deep copy )

copy에는 두 가지가 있다.

**shallow copy**(얕은 복사)와 **deep copy**(깊은 복사)이다.

**shallow copy**는 가장 상위 객체만 메모리에 새로 생성되고 내부 객체들은 참조 관계인 경우를 의미한다.

**deep copy**는 내부 객체까지 모두 새로 생성된 것을 의미한다.



#### +++객체를 복사하는 방법들

<br/>

#### shallow copy

**1. slice 메서드 이용 **- Array.prototype.slice.call(변수명)

`변수명.slice[0]`  혹은 `Array.prototype.slice.call(변수명)` 을 이용한다

`Array.prototype.slice.call(변수명)` 대신 `변수명.slice(0)`을 해도 되지만, arguments 같은 것(**유사배열**)을 복사할 때를 생각하면 `Array.prototype.slice.call`로 통일하는 게 좋다.

~~~javascript
var array = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
var shallow = Array.prototype.slice.call(array);
shallow[0].name = 'd';
shallow[1] = 'e';
console.log(array); // [{ name: 'd' }, { name: 'b' }, { name: 'c' }]
console.log(shallow); // [{ name: 'd' }, 'e' , { name: 'c' }]
~~~

위 예제를 보면 `array` 변수를 얕은 복사를 한 `shallow`라는 변수는 array 변수가 가리키는 객체(배열) 안에 있는 각 객체들 중 첫번째 객체의 name값을 공유하고 있기 때문에 'd'라고 변경시 `array`의 프로퍼티 값은 공유가 되어 변경이 되었다.

하지만 `shallow`의 두번째 배열 인덱스의  e값을 직접 변경할 경우 메모리에 직접 생성되었기에 `array`변수와 공유가 되어있지 않다.

<br/>

#### deep copy

**1. 자바스크립트 재귀 사용**

```js
function cloneObject(obj) {
    var clone = {};
    for(var i in obj) {
        if(typeof(obj[i])=="object" && obj[i] != null)
            clone[i] = cloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
}
```

오브젝트의 프로퍼티들을 순회하여 빈 오브젝트에 더한다. 그 과정에서 원본 오브젝트의 프로퍼티가 오브젝트일 경우 재귀적으로 함수를 실행한다.
이 방법은 객체를 `깊은 복사(Deep Copy)`한다.

<br/>

**2. JSON 객체의 메소드를 이용**

```js
function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}
```

**JSON.stringify**는 자바스크립트 오브젝트를 스트링 포멧으로 변환하는 메소드이다.
**JSON.parse**는 스트링 포멧을 자바스크립트 오브젝트로 변환하는 메소드이다.

스트링으로 변환하였다가 다시 오브젝트로 변환하기 때문에 이전 객체에 대한 참조가 없어지지만 JSON 메소드 자체가 성능면에서 다른 방법에 비해 굉장히 느리기 때문에 주의해야한다.
이 방법은 객체를 `깊은 복사(Deep Copy)`한다.

<br/>