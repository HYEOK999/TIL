![JavaScriptBanner](https://user-images.githubusercontent.com/31315644/65933403-536fe400-e44c-11e9-981d-c4e8c1f86998.png)

------

## JavaScript Study 18

- 용어

- String 생성자 함수

  - 


<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 

  <br/>


---------

## String 생성자 함수

- 표준 빌트인 객체인 String 객체는 생성자 함수 객체이다. 
- 따라서 new 연산자와 함께 호출하여 String 인스턴스를 생성할 수 있다.
- String 생성자 함수에 인수를 전달하지 않고 new 연산자와 함께 호출하면 [[StringData]] 내부 슬롯에 빈 문자열을 할당한 String 래퍼 객체를 생성한다.

```javascript
const strObj = new String('Lee');
console.log(strObj);
// String {0: "L", 1: "e", 2: "e", length: 3, [[PrimitiveValue]]: "Lee"}
strObj.valueOf(); //'Lee'
```

