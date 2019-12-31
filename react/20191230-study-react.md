![React](https://user-images.githubusercontent.com/31315644/69938302-4345b500-1520-11ea-8436-26d69300e699.png)

--------------

# React Study 10

- 객체의 접근 방법
- YouTube 프로젝트 변경점
  - 좋아요, 싫어요 기능 추가
- 댓글 추가 / 삭제 기능 추가
- Stale closure problem
  - 결과를 변경하기 위한 해결점 1 : 함수를 만들고 함수로 호출
  - 결과를 변경하기 위한 해결점 2 : 즉시실행함수를 사용한다.
- React Hook
  - useState
  - useEffect

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- 객체의 접근 방법
- React Hook
- useState
- useEffect
- Stale closure problem

<br/>

--------

### 객체의 접근 방법

````javascript
const state = { id : 'abc', pwd : '1234' }
state.id; // abc
state['id'] // abc

cont pwd = 'pwd'
state[pwd] // 1234
state['pwd'] // 1234
state.pwd //1234

state.id === state[id]; // true
````

<br/>

### YouTube 프로젝트 변경점

#### 좋아요, 싫어요 기능 추가

**Action 구성하기**

액션의 내용은 현재 좋아요와 싫어요를 기본적으로 저장할 `id`와 좋아요인지 싫어요인지 구별하기 위한 `toggle_like`를 구별한다.

```javascript
export const LIKE = 'LIKE';

export function like(id, toggle_like) {
  return ({type:LIKE, id, toggle_like})
}	
```

<br/>

**Reducer 구성하기**

Action 구성을 했다면 `toggle_like`를 구성해준다.

toggle은 true인지 false인지만 구분하면 되므로 `if ... else`로 구분해준다.

`data && data.likeCount` 에서 `&&`  연산자의 의미는 

첫번째, 자바스크립트에게 객체 내부로 접근하기 전에 상위 레벨부터 접근해야만 한다.

바로 `data.likeCount`로 접근했을 경우, data가 존재하지 않는다면, 

`undefined.likeCount`가 될 수도 있기 때문이다. 

두번째, 해당 소스는 `likeCount` 와 `disLikeCount`로 총 2개가 나뉘어져 있다.

만약 2개중 한개라도 사용되었다면 이미 `data`는 존재하는 것이기 때문에 항상 참이게 된다.

그럴경우 초기화가 되어있지 않은 `data.likeCount`는 null 상태인데 여기서 +1을 아무리 해도 NULL이다.

따라서 2개의 비교가 필요하다.

```javascript
  case LIKE :
      if(action.toggle_like) {
        return {
          ...state, // 쿼리를 보존하기위해서
          data: {
            ...state.data, // 나중에 추가될 데이터를 보존하기위해서
            [action.id]: {
              ...data, // Comment의 데이터를 보존하기 위해서 나열해주엇음.
              likeCount: data && data.likeCount
                ? data.likeCount + 1
                : 1,
            }
          }
        }
      } else {
        return {
          ...state, // 쿼리를 보존하기위해서
          data: {
            ...state.data, // 나중에 추가될 데이터를 보존하기위해서
            [action.id]: {
              ...data, // Comment의 데이터를 보존하기 위해서 나열해주엇음.
              disLikeCount: data && data.disLikeCount
                ? data.disLikeCount + -1
                : -1,
            }
          }
        }
      };
```

<br/>

**VideoPlayer Redux 추가하기**

VideoPlayer에 Redux를 추가한다. 

```jsx
<button onClick={() => props.like(_id, true)}>좋아요</button>
{ props.data[_id] &&
props.data[_id].likeCount ? props.data[_id].likeCount : 0}
<button onClick={() => props.like(_id, false)}>싫아요</button>
{ props.data[_id] &&
props.data[_id].disLikeCount ? props.data[_id].disLikeCount : 0}

...
};

function mapStateToProps(state) {
...
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    like,
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(VideoPlayer);
```

<br/>

#### 댓글 추가 / 삭제 기능 추가

**Action 구성하기**

댓글 추가 및 삭제기능 전부 `id`객체 내부따라서 저장이 되야하므로 2개를 전부 받는다.

댓글 추가 기능은 텍스트 값을 입력 받아야하므로 `val` 를 인자로 받고

댓글 삭제 기능은 각 댓글마다 있는 `commentId` 를 가지고 삭제해야 한다. 

```javascript
export const COMMENT = 'COMMENT';
export const DELETECOMMENT = 'DELETECOMMENT';

export function comment(id, val) {
  return ({type:COMMENT, id, val})
}

export function deleteComment(id, commentId) {
  return ({type:DELETECOMMENT, id, commentId})
}

```

<br/>

**Reducer 구성하기**

먼저 댓글 추가 기능을 작성하자.

댓글을 추가할 때 중복이 되어야 하므로 **배열**로 받는다.

`data` 객체와 `comments` 배열이 둘다 존재 하지 않을 경우

배열 내부에 객체로 `text(댓글 내용)` 과 `cid(댓글 아이디)`를 추가한다.

여기서, `cid(댓글 아이디)`는 여러가지 방법이 있지만, 새로 추가된 댓글과 중복되어서는 안된다.

나는 여기서 1씩 늘어나는 방식을 사용한다.

`cid : Math.max(-1, ...data.comments.map((id) => id.cid)) + 1 `

는 댓글이 존재할 경우 해당 댓글아이디만을 `map()`함수를 이용해 뽑아낸뒤 `Math.max`를 이용해 최고값을 갱신하다.

그 후 1을 더해준다. 

여기서 `Math.max(-1)`을 기본으로 두어 만약 댓글이 전부 삭제하고 다시 추가할 경우, 다시 0부터 시작하게끔 설정한다.

```javascript
case COMMENT :
  return {
		...state,
		data : {
			...state.data,
			[action.id]: {
          ...data,
          comments: data && data.comments
  				? [ 
               {  
            		text: action.val, 
            		cid : Math.max(-1, ...data.comments.map((id) => id.cid)) + 1 
               }, 
  							...data.comments 
            ]
          : [{ text: action.val, cid : 0 }],
     }
  }
};
```

<br/>

삭제기능은 `VideoPlayer` 에서 `선택한 비디오의 cid`와 `filter()`를 돌리면서 뽑아내 `cid` 를 비교하여 삭제하는 방식을 사용한다.

```javascript
    case DELETECOMMENT :
      return {
        ...state,
        data : {
          [action.id]: {
            comments: data && data.comments.filter((comment) => {
              return comment.cid !== action.commentId
            })
          }
        }
      };
```

<br/>

**VideoPlayer Redux 추가하기**

`props.data[_id] && props.data[_id].comments && props.data[_id].comments.map((comment)` 의 의미는

자바스크립트에서는 객체에 접근하기 위해서는 상위부터 접근해야만 한다.

`props.data[_id].comments`에 접근할 때, 만약 `props.data[_id]`가 없다면 javascript는 `props.data[_id].comments`가

`undefined.comments`로 인식을 하기 때문이다. 따라서 방어코드 최상위부터 접근을 해야하는데 해당 객체의 최상위는 props다.

그런데 props는 Router 컴포넌트를 통해 뿌려지기 때문에 절대 없을 수가 없으므로 검사를 할 필요가 없다. 따라서 다음 단계인

`props.data[_id]`부터 검사하기 시작한다.

삭제는 선택한 요소의 `cid`를 보내주어야 하므로 해당 객체를 선택할 당시의 `comment.cid`를 클릭의 인자값으로 넘겨준다.

```jsx
  const handleEnter = (k) => (e) => {
    if(e.key === 'Enter') {
        k(_id, e.target.value);
      }
  }

  return (
			...
      <input type='text' onKeyPress={handleEnter(props.comment)} />
      <div>
        {
          props.data[_id] &&
          props.data[_id].comments &&
          props.data[_id].comments.map((comment) =>
            <h1 key={uuid.v4()}>
              {comment.text}
              <button onClick={() => props.deleteComment(_id, comment.cid)}>삭제</button>
            </h1>
          )
        }
      </div>
    </div>
  );
};

function mapStateToProps(state) {
...
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    like,
    comment,
    deleteComment
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(VideoPlayer);
```

<br/>

### Stale closure problem

```javascript
function useState(init) {
  let _val = init;

  function setState(newVal) {
    _val = newVal
  }

  return [_val, setState];
}

const [query, setQuery] = useState('여행')
console.log(query)
setQuery('크리스마스')
console.log(query)	

// 여행, 여행
```

값을 리턴할 경우, 상위 렉시컬환경의 값이 업데이트 되지않는다.

<br/>

#### 결과를 변경하기 위한 해결점 1 : 함수를 만들고 함수로 호출

함수 내부에서만 작동하는 변수일 경우 앞에 `_`를 붙여주는 경우가 많다.

```javascript
function useState(init) {
  let _val = init;

  function useState () {
    return _val
  }

  function setState(newVal) {
    _val = newVal
  }

  return [useState, setState];
}

const [query, setQuery] = useState('여행')
console.log(query())
setQuery('크리스마스')
console.log(query())	

// 여행, 크리스마스
```

<br/>

#### 결과를 변경하기 위한 해결점 2 : 즉시실행함수를 사용한다.

- 외부에서 접근하지 못하도록 변수를 보호할 수 있다.
- 기존의 함수에서 변수 리턴 시 업데이트가 되지 않는 문제를 해결.

```javascript
const React = (function() {
  let _val
  return {
    render(Component) {
      const Comp = Component()
      Comp.render()
      return Comp
    },
    useState(init) {
      _val = _val || init
      function setState(newVal) {
        _val = newVal
      }
      return [_val, setState]
    }
  }
})();
```

<br/>

### React Hook

리액트에서는 Hook을 IIFE(즉시실행함수) 형태로 폴리필 해보자.

많은 함수가 있게지만 useState는 다음과 같이 작성한다.

리액트 훅은 **무조건 최상위에서만 사용한다.(for문, if문 등의 중첩 내에서 리액트 훅 사용 X)**

리액트 훅 내부에서 for, if문등의 사용은 가능하다.

```javascript
const React = (function() {
  let _val
  return {
    render(Component) {
      const Comp = Component()
      Comp.render()
      return Comp
    },
    useState(init) {
      _val = _val || init
      function setState(newVal) {
        _val = newVal
      }
      return [_val, setState]
    }
  }
})()

const { useState } = React
function Counter() {
  const [count, setCount] = useState(0)
  return {
    click : () => setCount(count + 1),
    render : () => console.log('render', {count})
  }
} // 개발자가 작성한 코드 : 리액트 훅

let App
App = React.render(Counter)
App.click()
App = React.render(Counter)
```

<br/>

#### useState

```jsx
const { useState } = React
function Counter() {
  const [count, setCount] = useState(0)
  return {
    click : () => setCount(count + 1),
    render : () => console.log('render', {count})
  }
} // 개발자가 작성한 코드 : 리액트 훅
```

리액트 훅에서는, `this.setState`를 사용하지 않는다. 

`useState`는 `변수와 변수를 업데이트하기 위한 함수를 정의`한다.

<br/>

#### useEffect

`componentDidMount`, `componentDidUpdate`를 합쳐놓은 느낌.

`componentDidUpdate`와 동일하게 는 모든 변화에 대해 업데이트 하기 때문에 모니터 조건이 필요하다.

`useEffect` 역시 모니터 조건이 반드시 필요하다.

- (옵션) 조건식으로 쓸 변수들을 Array로 작성시킨다.

```javascript
useEffect(() => {
  console.log(count);
}) // 기본 : 모든 업데이트에 대해 변화를 감지한다. ( 반드시 조건식을 작성해야만 한다. )

useEffect(() => {
  console.log(count);
}, [count]) // 조건쓸 변수를 배열에 작성 :  [count] 요소의 변화가 있을 경우에만 감지.

useEffect(() => {
  console.log(count);
}, []) // 빈 배열 : 빈배열로 작성 시 단 한번만 실행된다.
```

<br/>