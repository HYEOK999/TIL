![React11](https://user-images.githubusercontent.com/31315644/71559820-ec42e980-2aa5-11ea-99ea-34ce771dec15.png)

--------------

## React Official Document 

### 주요개념 : React로 사고하기

- 목업으로 시작하기

  - [1단계 : UI를 컴포넌트 계층 구조로 분할하기](#a1)

  - [2단계 : React로 정적인 버전 만들기](#a2)

  - [3단계 :  UI state에 대한 최소한의 (하지만 완전한) 표현 찾아내기](#a3)

  - [4단계: State가 어디에 있어야 할 지 찾기](#a4)

  - [5단계: 역방향 데이터 흐름 추가하기](#a5)

- [마치며,](#a6)

<br/>

------

# [React Official Document](https://ko.reactjs.org/)

## 주요개념

## #11. React로 사고하기

## 목업으로 시작하기

JSON API와 목업을 디자이너로부터 받았다고 가정하자.

![목업](https://ko.reactjs.org/static/thinking-in-react-mock-1071fbcc9eed01fddc115b41e193ec11-4dd91.png)

JSON API는 아래와 같은 데이터를 반환한다.

```
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```

<br/>

### 1단계 : UI를 컴포넌트 계층 구조로 분할하기 <a id = "a1"></a>

모든 컴포넌트의 주변에 박스를 쳐서 구역을 나누고 그 각각에 이름을 붙이도록 한다.

디자이너가 미리 정해두었을 수도 있으니 디자이너와 상의를 할수도 있다. 디자이너가 사용한 Photoshop 레이어 이름이 React 컴포넌트의 이름이 될 수도 있다.

<br/>

여기서 다음과 같은 생각이 들 수도 있다.

Q : 어떤 것이 컴포넌트가 되어야 할까?

A : 함수, 객체를 만들 때처럼 만들면 된다. (단,  [단일 책임 원칙](https://ko.wikipedia.org/wiki/단일_책임_원칙)을 지키도록한다.)

**단일 책임 원칙은 하나의 컴포넌트는 한 가지 일만을 하는 것이 이상적이라는 원칙이다.**

하나의 컴포넌트가 커지게 된다면 이는 보다 작은 하위 컴포넌트로 쪼개서 관리해야만 한다.

<br/>

주로 JSON 데이터를 유저에게 보여주기 때문에, 데이터 모델이 적절하게 만들어졌다면, UI(컴포넌트 구조)가 잘 연결된 것이다. 

이는 UI와 데이터 모델이 같은  *인포메이션 아키텍처(information architecture)*를 가지는 경향이 있기 때문이다. 

각 컴포넌트가 데이터 모델의 한 조각을 나타내도록 분리하라.

![Component diagram](https://ko.reactjs.org/static/thinking-in-react-components-eb8bda25806a89ebdc838813bdfa3601-82965.png)

다섯 개의 컴포넌트로 이루어진 앱을 한번 보자.

각각의 컴포넌트에 들어간 데이터는 Bold체 로 표기했다.

1. **`FilterableProductTable`(노란색)**: 예시 전체를 포괄한다.
2. **`SearchBar`(파란색)**: 모든 *유저의 입력(user input)* 을 받는다.
3. **`ProductTable`(연두색)**: *유저의 입력(user input)*을 기반으로 *데이터 콜렉션(data collection)*을 필터링 해서 보여준다.
4. **`ProductCategoryRow`(하늘색)**: 각 *카테고리(category)*의 헤더를 보여준다.
5. **`ProductRow`(빨강색)**: 각각의 *제품(product)*에 해당하는 행을 보여준다.

`ProductTable(연두색)`을 보면 “Name” 과 “Price” 레이블을 포함한 테이블 헤더만을 가진 컴포넌트는 없다. 

이 같은 경우, 데이터를 위한 독립된 컴포넌트를 생성할지 생성하지 않을지는 개발자의 선택이다. 

이 예시에서는 `ProductTable(연두색)`의 책임인 *데이터 컬렉션(data collection)*이 렌더링의 일부이기 때문에 `ProductTable(연두색)`을 남겨두었다. 

그러나 이 헤더가 복잡해지면 (즉 정렬을 위한 기능을 추가하는 등) `ProductTableHeader`컴포넌트를 만드는 것이 더 합리적일 것이다.

이제 목업에서 컴포넌트를 확인하였으므로 이를 계층 구조로 나열해보자. 

모형의 다른 컴포넌트 내부에 나타나는 컴포넌트는 계층 구조의 자식으로 나타낸다.

- `FilterableProductTable`
  - `SearchBar`
  - `ProductTable`
    - `ProductCategoryRow`
    - `ProductRow`

<br/>

### 2단계 : React로 정적인 버전 만들기. <a id = "a2"></a>

데이터 모델을 렌더링하는 앱의 정적 버전을 만들기 위해 다른 컴포넌트를 재사용하는 컴포넌트를 만들고 props 를 이용해 데이터를 전달해준다. 

props는 부모가 자식에게 데이터를 넘겨줄 때 사용할 수 있는 방법이다. 

정적 버전을 만들기 위해 **state를 사용하는 것은 좋지 않다**. 

state는 오직 상호작용을 위해, 즉 시간이 지남에 따라 데이터가 바뀌는 것에 사용한다. 

우리는 앱의 정적 버전을 만들고 있기 때문에 지금은 필요하지 않는다.

앱을 만들 때 하향식(top-down)이나 상향식(bottom-up)으로 만들 수 있다. 다시 말해 계층 구조의 상층부에 있는 컴포넌트 (즉 `FilterableProductTable`부터 시작하는 것)부터 만들거나 하층부에 있는 컴포넌트 (`ProductRow`) 부터 만들 수도 있다. 간단한 예시에서는 보통 하향식으로 만드는 게 쉽지만 프로젝트가 커지면 상향식으로 만들고 테스트를 작성하면서 개발하기가 더 쉽다.

이 단계가 끝나면 데이터 렌더링을 위해 만들어진 재사용 가능한 컴포넌트들의 라이브러리를 가지게 된다. 현재는 앱의 정적 버전이기 때문에 컴포넌트는 `render()` 메서드만 가지고 있을 것이다. 계층구조의 최상단 컴포넌트 (`FilterableProductTable`)는 prop으로 데이터 모델을 받는다. 데이터 모델이 변경되면 `ReactDOM.render()`를 다시 호출하서 UI가 업데이트 된다. UI가 어떻게 업데이트되고 어디에서 변경해야하는지 알 수 있다. React의 **단방향 데이터 흐름(one-way data flow)** (또는 *단방향 바인딩(one-way binding*))는 모든 것을 모듈화 하고 빠르게 만들어준다.

<br/>

### 3단계 :  UI state에 대한 최소한의 (하지만 완전한) 표현 찾아내기. <a id = "a3"></a>

UI를 상호작용하게 만들려면 기반 데이터 모델을 변경할 수 있는 방법이 있어야 한다. 이를 React는 **state**를 통해 변경할 수 있다.

애플리케이션을 올바르게 만들기 위해서는 애플리케이션에서 필요로 하는 변경 가능한 state의 최소 집합을 생각해보아야 하는데 여기서 핵심은 [중복배제](https://en.wikipedia.org/wiki/Don't_repeat_yourself)원칙이다. 애플리케이션이 필요로 하는 가장 최소한의 state를 찾고 이를 통해 나머지 모든 것들이 필요에 따라 그때그때 계산되도록 만들자. 

예를 들어 TODO 리스트를 만든다고 하면, TODO 아이템을 저장하는 배열만 유지하고 TODO 아이템의 개수를 표현하는 state를 별도로 만드는 것은 삼가하자. TODO 갯수를 렌더링해야한다면 TODO 아이템 배열의 길이를 가져오면 된다.

예시 애플리케이션 내 데이터들을 생각해보자.

- 제품의 원본 목록
- 유저가 입력한 검색어
- 체크박스의 값
- 필터링 된 제품들의 목록

이는 각 데이터에 대해 아래의 세 가지 질문을 통해 결정할 수 있다.

1. 부모로부터 props를 통해 전달되는가? 그러면 확실히 state가 아니다.
2. 시간이 지나도 변하지 않는가? 그러면 확실히 state가 아니다.
3. 컴포넌트 안의 다른 state나 props를 가지고 계산 가능한가? 그렇다면 state가 아니다.

- 제품의 원본 목록은 props를 통해 전달되므로 state가 아니다. 

  : 검색어와 체크박스는 state로 볼 수 있는데 시간이 지남에 따라 변하기도 하면서 다른 것들로부터 계산될 수 없기 때문이다.

- 마지막으로 필터링된 목록은 state가 아니다. 

  : 제품의 원본 목록과 검색어, 체크박스의 값을 조합해서 계산해낼 수 있기 때문이다.

결과적으로 애플리케이션은 다음과 같은 state를 가진다.

- 유저가 입력한 검색어
- 체크박스의 값

<br/>

### 4단계: State가 어디에 있어야 할 지 찾기. <a id = "a4"></a>

이제 앱에서 최소한으로 필요한 state가 뭔지 찾아냈다. 다음으로는 어떤 컴포넌트가 state를 변경하거나 **소유**할지 찾아야 한다.

> 중요 : React는 항상 컴포넌트 계층구조를 따라 아래로 내려가는 단방향 데이터 흐름을 따른다. 
>
> 어떤 컴포넌트가 어떤 state를 가져야 하는 지 바로 결정하기 어려울 수 있다. 
>
> **많은 초보자가 이 부분을 가장 어려워한다.** .

애플리케이션이 가지는 각각의 state에 대해서

- state를 기반으로 렌더링하는 모든 컴포넌트를 찾아라.

- 공통 소유 컴포넌트 (common owner component)를 찾아라. 

  (계층 구조 내에서 특정 state가 있어야 하는 모든 컴포넌트들의 상위에 있는 하나의 컴포넌트).

- 공통 혹은 더 상위에 있는 컴포넌트가 state를 가져야 한다.

- state를 소유할 적절한 컴포넌트를 찾지 못하였다면, state를 소유하는 컴포넌트를 하나 만들어서 공통 오너 컴포넌트의 상위 계층에 추가하라.

이 전략을 애플리케이션에 적용해보자.

- `ProductTable`은 state에 의존한 상품 리스트의 필터링해야 하고 `SearchBar`는 검색어와 체크박스의 상태를 표시해주어야 한다.
- 공통 소유 컴포넌트는 `FilterableProductTable`
- 의미상으로도 `FilterableProductTable`이 검색어와 체크박스의 체크 여부를 가지는 것이 타당하다.

 state를 `FilterableProductTable`에 두기로 했다. 

먼저 인스턴스 속성인 `this.state = {filterText: '', inStockOnly: false}` 를 `FilterableProductTable`의 `constructor`에 추가하여 애플리케이션의 초기 상태를 반영하자. 그리고 나서 `filterText`와 `inStockOnly`를 `ProductTable`와 `SearchBar`에 prop으로 전달한다. 

마지막으로 이 props를 사용하여 `ProductTable`의 행을 정렬하고 `SearchBar`의 폼 필드 값을 설정하자.

이제 애플리케이션의 동작을 볼 수 있다.

 `filterText`를 `"ball"`로 설정하고 앱을 새로고침 해보자. 

데이터 테이블이 올바르게 업데이트 된 것을 볼 수 있다.

<br/>

### 5단계: 역방향 데이터 흐름 추가하기.  <a id = "a5"></a>

지금까지 우리는 계층 구조 아래로 흐르는 props와 state의 함수로써 앱을 만들었다. 

이제 다른 방향의 데이터 흐름을 만들어볼 시간이다. 계층 구조의 하단에 있는 폼 컴포넌트에서 `FilterableProductTable`의 state를 업데이트할 수 있어야 한다.

React는 전통적인 양방향 데이터 바인딩(two-way data binding)과 비교하면 더 많은 타이핑을 필요로 하지만 데이터 흐름을 명시적으로 보이게 만들어서 프로그램이 어떻게 동작하는지 파악할 수 있게 도와준다.

현재 상태에서 input box를 체크하거나 키보드를 타이핑할 경우 React가 입력을 무시하는 것을 확인할 수 있다. 이는 `input`태그의 `value`속성이 항상 `FilterableProductTable`에서 전달된 state와 동일하도록 설정했기 때문이다.

우리가 원하는 것이 무엇인지를 한번 생각해자. 

우리는 사용자가 폼을 변경할 때마다 사용자의 입력을 반영할 수 있도록 state를 업데이트하기를 원한다. 컴포넌트는 그 자신의 state만 변경할 수 있기 때문에 `FilterableProductTable`는 `SearchBar`에 콜백을 넘겨서 state가 업데이트되어야 할 때마다 호출되도록 할 것이다. 우리는 input에 onChange 이벤트를 사용해서 알림을 받을 수 있다.

 `FilterableProductTable`에서 전달된 콜백은 `setState()`를 호출하고 앱이 업데이트될 것이다.

------------------

## 마치며,  <a id = "a6"></a>

이 글을 통해 React를 가지고 애플리케이션과 컴포넌트를 만드는 데에 대한 사고방식을 얻어갈 수 있기를 바란다. 

이전보다 더 많은 타이핑을 해야 할 수 있지만, 코드를 쓸 일보다 읽을 일이 더 많다는 사실을 기억하자. 

모듈화되고 명시적인 코드는 읽을 때 조금 덜 어렵다. 큰 컴포넌트 라이브러리를 만들게 되면 이 명시성과 모듈성에 감사할 것이며 코드 재사용성을 통해 코드 라인이 줄어들기 시작할 것이다. 😃

<br/>