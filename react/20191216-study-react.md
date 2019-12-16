![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 07

- 한글 단어 처리
- Router
- props.location
- Redux
  - Redux의 사용이유
  - Redux를 배우는 시기
  - Redux 주요 개념 3가지
  - Redux 원칙
  - Action { type : 타입명, 변수명 :  변수값 }
  - Reducers
  - ACTION을 REDUCER에게 전달해주는 행위 : 디스패치( DISPATCH )
  - Store 
  - Redux Data Flow
- Redux 쉽게 이해해보기
- [Redux 셋팅 하기](#a1)

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- props.location
- Redux
- Reducer
- Action
- Store

<br/>

--------

### 한글 단어 처리

한글은 encodeURIComponent로 변환되어 해석한다.

```javascript
encodeURIComponent('사과')
```

<br/>

### Router 

라우터는 Route를 모아놓은 최상위 집합이다.

Route는 path를 통해 실제 경로를 지정한다.

Switch를 통해 default루트 혹은 어떤 경로도 해당 되지 못할경우 404페이지를 쉽게 설정할 수 있다.

<br/>

### props.location

Youtube 프로젝트를 보면 다음과 같은 코드가 있다.

props.location은 상위 Router를 통해서 내려온 프로퍼티다. (history, location, match등이 내려온다.)

location 객체는 URL상의 ? 뒤에 나오는 쿼리의 내용을 저장하는데, 

`if (props.location)`을 해준 이유는 해당 함수가 비동기로 돌기 떄문에, props.location이 정의가 되지 않을 시점에 `props.location.search`를 찾는다면 `undefind`를 유도한다. 따라서 이를 해결하기 위해 방어코드로 설정 해놓는다.

```javascript
  componentDidMount() {
    const { props } = this
    if (props.location) { // 방어코드. lacation이 주입되기까지 기다린다.
      const { search_query } = qs.parse(props.location.search)
      // this.setState({
      //   query : search_query
      // })
      this.getYoutubeData(search_query || '여행')
      // if (search_query) this.getYoutubeData(search_query)
    }
  }
```

<br/>

### Redux

JS의 상태 관리 라이브러리.

React 혹은 Vue와 같은 라이브러리 에서 많이 사용된다.

만약 순수 React소스로도 어플리케이션의 사용 문제가 없다면 Redux는 사용 고려 대상이 아니다.

왜냐하면 Redux 설정하는 것 자체는 복잡하고 많은 규칙과 쳬계를 개발자에게 강요하기 때문이다.

Redux는 모든 상태는 예측 가능해야한다는 모티브를 지니고있다.

<br/>

#### Redux의 사용이유

React에서 Redux를 사용하는 가장 큰 이유는 독립적인 여러 컴포넌트들이 다 같이 사용할 유일한 단일 저장소를 필요로 하기 때문이다.

Router 를 사용하지 않는다면 최상위 컴포넌트에서 props로 전부 뿌리를 내려주면 되지만 Router를 사용하면서 URL 별로 관리를 시작한다면 컴포넌트들은 점점 독립적으로 자리를 잡게 된다. 

서로 독립된 컴포넌트들끼리 데이터를 주고 받으면서 상태를 유지하기 위해서 단일 저장소를 필요로 하게 되는데 그것이 Redux를 사용해야만 하는 가장 큰 이유이다.

Youtube-Mini-Clone 프로젝트에서 특정 비디오를 검색하고 나오는 리스트들 중 하나를 클릭하였을 경우, 해당 리스트의 플레이어에서 Nav-SearchBar는 공백으로 초기화 되어있다. ( 상태가 유지가 되지 않았다는 것을 의미 ) 또한 브라우저의 뒤로가기를 누를 경우, 역시 상태가 유지가 되지 않았으므로 아까와 같은 리스트들을 보여주지 않고 그저 공백 화면 만 보여줄 것이다.

<br/>

#### Redux를 배우는 시기

1. 데이터 흐름이 복잡해질 경우
2. 같으 데이터를 여러곳에 중복 사용
3. 많은 요청
4. 컴포넌트 간 통신
5. 비계층적 데이터

<br/>

#### Redux 주요 개념 3가지

**Action**  : '어떠한 데이터 변경작업을 해주세요' 라는 것을 명시하는 곳. 데이터 요청을 하기 위한 데이터 객체

**Reducers** : 요청한 Action을 처리하여 새로운 상태를 리턴 해준다. HOF들처럼 특정 배열로 처리를하여 새로운 배열을 반환하는 느낌.

**Store** : Redux에서 사용되는 유일한 단일 저장소.

<br/>

#### Redux 원칙

1. One immutable store : 기존의 상태에 직접적인 수정을 해서는 안된다. ( 예: a++ ) → 스프레드 등등
2. Actions trigger changes : 변화를 야기시킨다.
3. Reducers update state : Reducers는 상태를 업데이트한다.

<br/>

#### Action { type : 타입명, 변수명 :  변수값 }

**type** : 요청할 액션에 대한 설명 - 변수 (임의로 지정 가능하다.)

Redux는 우리가 작업한 코드가 순수함수라는 보장이 없기 때문에, 이러한 문제를 원천적으로 막고자 ACTION -> REDUCER -> STORE 라는 순서를 지키라고 강요한다.

<br/>

#### Reducers

**상태는 읽기 전용 이다.** Reducers는 순수 함수를 지향한다. 기존의 상태를 변경하지 않고 새로운 상태를 return 한다.

```jsx
export default function counter(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD :
      return {
        ...state,
        count: state.count + action.val
      }
    default:
      return state;
  }
}
```

<br/>작업한 코드가 순수함수라는 보장이 없기 때문에 순수함수를 만들라는 강요, 이 강요는 리덕스 시스템을 유지하는데 굉장히 중요하다. 

언제나 예측 가능한 상태를 만들기 위한 원천적으로 제한(Action, Reducers) 을 두고 있다. 

<br/>

#### ACTION을 REDUCER에게 전달해주는 행위 : 디스패치( DISPATCH )

상태를 바꾸고싶다면 상태 자체(객체 자체)를 바꾸어야만한다.

이럴 경우, 바뀐 데이터에 대해 예측이 가능해진다.

<br/>

#### Store 

앱의 전체 상태 트리를 가지고 있다.

상태를 변경하는 유일한 방법은 액션을 보내는 것 뿐이다.

스토어는 클래스가 아니며, 몇가지 메서드가 속해있는 객체이고, `createStore`를 통해 생성할 수 있다.

##### Store 메서드

- [`getState()`](https://deminoth.github.io/redux/api/Store.html#getState)
- [`dispatch(action)`](https://deminoth.github.io/redux/api/Store.html#dispatch)
- [`subscribe(listener)`](https://deminoth.github.io/redux/api/Store.html#subscribe)
- [`replaceReducer(nextReducer)`](https://deminoth.github.io/redux/api/Store.html#replaceReducer)

<br/>

Redux는 모든 상태는 예측 가능해야만 하는 것을 강조한다. 곧 순수함수를 사용하라는 이야기다. 

**잘못된 상태변경.** `role`은 더 이상 숫수함수가 아니다.

````jsx
state = {
	name : 'KIM',
	role : 'developer'
}

state.role = 'admin';
return state;
````

<br/>

**리덕스에서 제안하는 상태변경.** 객체 자체를 리턴한다.

```jsx
state = {
	name : 'KIM',
	role : 'developer'
}

return state = {
	name : 'KIM',
	role = 'admin';
}
```

<br/>

#### Redux Data Flow

상태 변화는 오직 Reducer만 가능하다.

State -> UI -> ACTION -> REDUX -> STORE -> State

![](https://user-images.githubusercontent.com/31315644/70904387-8e91b480-2044-11ea-843e-e18d01033ebe.jpeg)

<br/>

------------

### Redux 쉽게 이해해보기

실제 우리가 생활에서 사용하는 은행(인터넷뱅킹X, 전자거래X, 반드시 은행 창구를 직접 이용해야만 한다.)이 있다고 가정하자.

**Redux는 은행**이다.

**React.state는 지갑**이다.

 우린 **지갑을 마음대로 사용할 수 있고, 돈만 들어 있다면 어떠한 절차없이 바로 사용하는 것이 가능**하다.

**은행 역시 우리 마음대로 사용할 수는 있지만, 절차와 체계 그리고 시스템을 지니고 있다.** 은행에 가서 통장에서 돈을 얼마나 꺼낼것인지 출금 명세표를 작성하고 은행직원에게 전달하면 은행직원이 처리를 하고 돈을 준다. 

여기서 **Redux의 Store는 은행 통장** 이다. (통장은 무조건 1개이다. 유일성 강조)

출금 명세표, 입금 명세표 등등의 은행에서 하고자 하는 업무를 작성해서 은행원에게 줘야하는데 **Redux의 Action이 명세표들**이다.

**Redux의 Reducer은 은행원**이다. 명세표를 받아 처리를 하기 때문이다. 

따라서 **명세표를 은행원에게 주는 행위는 Redux의 Dispatch다.**

자 이제, 통장을 보자 은행업무를 보고나면 통장에 입금 혹은 출금 등등을 했다면 통장에 기록이 남을텐데 통장기록은 한줄 한줄 쌓여간다.

기록을 지우고 다시 쓴 것이 아닌 한줄 한줄 쌓아서 적어놓은 것인데 이것은 **Redux로 치면 순수함수와 불변성을 대변한다.**

다시 정리하면,

1. 은행(Redux)에 가서 100원을 입금 해달라는 명세표(Action)을 작성해서 은행원(Reducer)에게 준다.(주는 행위 : Dispatch)
2. 은행원(Reducer)은 요청받은 명세표(Action)을 처리해서 통장(Store)에 기록한다.
3. 통장(Store)에는 총 300원이 있는데 기록이 300원으로 있는게 아닌, 100원, 200원, 방금 넣은 300원으로 차례차례 기록 되어 있다.( 순수함수, 불변성 )

--------

### Redux 셋팅 하기 <a id="a1"></a>

```bash
npx create-react-app redux-study

VSCode로 해당 폴더 오픈
```

<br/>

```bash
npm i redux --save
npm i react-redux --save
```

react-redux는 react에 redux를 적용하기 위해서 설치한다.

<br/>

#### 폴더 2개 생성

src 하위

#### src/actions

#### src/reducers

store는 redux에 포함되어 있기 때문에 만들 필욘 없다.

![redux-repo01](https://user-images.githubusercontent.com/31315644/70904390-905b7800-2044-11ea-8ddf-2b931c3a0911.jpeg)

<br/>

#### import 추가

src/App.js

```jsx
import { Provider } from 'react-redux';
import { createStore } from 'redux';
```

`createStore` = `store`를 만든다. (은행 통장을 개설한다.)

`Provider`는 하위 컴포넌트에게 `store`를 접근할 방법을 제공해준다.

store를 사용하고자 하는 최상위 컴포넌트에게 다음 코드를 추가한다.

<br/>

#### Provider 랩핑

src/App.js

최상위 컴포넌트에서 `Provider`를 랩핑시켜준다.

```jsx
function App() {
  return (
    	<Provider store={createStore(reducers)}>
     		 ...
      </Provider>
    );
}

```

`store`를 만들 때는 `createStore`함수를 통해야 하고 `reducers`를 걸쳐야만 한다.

은행 통장을 만들 때는, 은행원(`reducers`)을 걸쳐야 하는 것과 같다.

<br/>

#### reducers 파일 생성

src/reducers/counter.js

src/reducers/index.js

<br/>

#### App.js reducers import

src/App.js

````jsx
import reducers from './reducers'

````

<br/>

#### actions 파일 생성 및 정의

src/actions/index.js

```jsx
export const ADD = 'ADD';

export function add(val) {
  return ({ type : ADD, val })
}

```

`Action` : ` { type : ADD, val }`

`type` : 수행하고자 하는 변수명 ,

`val` : 실제 데이터 명, 값

`Dispatch` : `return ({ type : ADD, val })`

<br/>

#### reducers 정의

src/reducers/counter.js

위에 정의한 actions를 import하고 초기 상태를 정의해준다.

```jsx
import { ADD } from '../actions'

const INITIAL_STATE = {
  count: 0 
}

```

<br/>

`reducer`를 정의한다.

```jsx
export default function counter(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD :
      return {
        ...state,
        count: state.count + action.val
      }
    default:
      return state;
  }
}

```

<br/>

