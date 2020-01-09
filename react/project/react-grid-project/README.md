![React Grid Mini Project](https://user-images.githubusercontent.com/31315644/72083980-07cfaf00-3346-11ea-9066-0ddbb7c4d4da.png)

----------

# React Grid Mini Project

## 개요

> 커스텀 훅, useReducer, useCallback에 대한 학습을 위한 프로젝트를 구현해본다.
>
> 해당 프로젝트는 각각의 요소를 상태로서 관리를 하고
>
> 이전의 상태 , 현재의 상태, 미래의 상태를 각각 관리를 하는 방식으로 진행한다.

<img src="https://user-images.githubusercontent.com/31315644/72069585-dbf30000-332a-11ea-83d7-989a9ae49151.gif" alt="React-grid" style="zoom:75%;" />

<br/>

### 목차

1. [화면 UI 보여주기](#a1)
2. [useState를 이용하여 set이벤트 구현(요소 클릭시 색깔 변화 확인)](#a2)
3. [useHistory 커스텀 훅 만들어서 state와 set 연동하기](#a3)
4. [Clear구현하기](#a4)
5. [useReducer 적용하기](#a5)
6. [Undo, Redo 구현 전 초기 상태 셋팅 및 적용하기](#a6)
7. [Undo구현하기](#a7)
8. [Redo구현하기](#a8)
9. [canUndo, canRedo구현하기](#a9)
10. [useCallback으로 최적화하기 및 반복 렌더링 방지하기](#a10)
11. [느낀점](#a11)

<br/>

### 1. 화면 UI 보여주기 <a id="a1"></a>

해당 프로젝트의 폴더 구조는 다음과 같다.

 ```bash
src/styles.scss
src/Main.js
src/hooks/useHistory.js
 ```

<br/>

먼저 UI를 구현하도록 한다.
UI는 함수형 컴포넌트 형태로 구현을 하도록 한다.(클래스도 상관은 없다.)

```jsx
// src/Main.js : 상위 컴포넌트
import React from 'react'
import './styles.scss'

const Main = (props) => {
  return (
  <div className="container">
    <div className="controls">
      <button>
        Undo
      </button>
      <button>
        Redo
      </button>
      <button>Clear</button>
    </div>
    <div className="grid">
     {/* 1번. 선택 박스 요소 */}
    </div>
  </div>
  );
}

export default Main;

```

 <br/>

현재 만들고자 하는 UI의 박스 요소 개수는 총 625개다. 

이것을 그리는 방법은 미리 배열에 저장해두고 `map` 함수를 이용하여 렌더링 하는 방식도 있지만, 즉시실행함수를 이용해서 즉석에서 바로 그리는것으로 하자. 

따라서 반복문을 사용해야하는 데 여기서는 `while`문을 이용한다.

즉시 실행 함수에서 필요한 것은 요소를 그리기 위한 배열, 시작값, 끝값이 필요하고 `while`을 통해 시작값을 하나씩 올려가면서 끝값에 도달 할 때 까지  배열 `push`하고 while문이 끝낫을 때 해당 배열을 반환해주면서 화면에 렌더링 하도록 한다.

 `{/* 1번. 선택 박스 요소 */}` 부분에 해당 코드를 삽입하도록 하자.

```jsx
<div className="grid">
  {
    ((blocks, i, len) => {
      while(++i <= len) {
        blocks.push(
          <div
            key = {i}
            className={'block'}
          />
        )
      }
      return blocks;
    })([], 0, 625)
  }
</div>
```

<br/>

### 2. useState를 이용하여 set이벤트 구현(요소 클릭시 색깔 변화 확인) <a id="a2"></a>

1. 상태를 관리하기 위해 `useState` Hook 을 사용하도록 한다.

2. 직접적인 `set Hook`함수를 쓰는게 아니라 별도의 함수를 만들고 해당 함수 호출 시 `set Hook`을 하는 방식을 이용한다. `set()`함수의 인자로는 객체를 넣을건데 대충 다음과 같은 값으로 들어가야한다.

   `{ 선택한 요소박스의 숫자 : true || false }` 

   **참고로**, `undefined`는 Boolean 비교 시 `false`이며 `!undefined`는` true`다.

3. 클릭 시 className에 `block active` 라는 클래스가 추가되도록 구현하여야 한다.

   **주의사항**, `{'block' + (state[index] ? ' active' : '')}` 에서 삼항연산자를 `()`를 안치게 될 경우 렌더링이 안되는 것에 주의하자.

```jsx
// src/Main.js : 상위 컴포넌트
import React, {useState} from 'react'
import './styles.scss'

const Main = (props) => {
const [state, setState] = useState({})  // 1번

const set = (toggle) => {  // 2번
  setState(toggle)
}

  return (
  <div className="container">
    <div className="controls">
      <button>
        Undo
      </button>
      <button>
        Redo
      </button>
      <button>Clear</button>
    </div>

    <div className="grid">
      {
        ((blocks, i, len) => {
          while(++i <= len) {
            const index = i;
            blocks.push(
              <div
                key = {i}
                className = {'block' + (state[index] ? ' active' : '')} // 3번
                onClick = {() => set({...state, [index] : !state[index] })} // 2번
              />
            )
          }
          return blocks;
        })([], 0, 625)
      }
    </div>
  </div>
  );
}

export default Main;
```

<br/>

### 3. useHistory 커스텀 훅 만들어서 state와 set 연동하기  <a id="a3"></a>

1. [2번](#a2)에서 만든 `useState`를 커스텀 훅으로 별도의 파일을 만들어 작성한다. (src/hooks/useHistory.js)
2. 상위 컴포넌트(src/Main.js)에서는 커스텀 훅을 사용한다.

```jsx
// src/hooks/useHistory.js : 커스텀 훅
import {useState} from 'react'

const useHistory = (NowValue) => {
  const [state, setState] = useState({})

  const set = (toggle) => {
    setState(toggle)
  }

  return {state, set} // 객체로 상태, 함수를 담아 뿌려준다.
}

export default useHistory;
```

<br/>

```jsx
// src/Main.js : 상위 컴포넌트
import React from 'react'
import useHistory from './hooks/useHistory' // 커스텀 훅 import
import './styles.scss'

const Main = () => {
  const {state, set} = useHistory(); // 커스텀 훅 사용하기.

  return (
  <div className="container">
    <div className="controls">
      <button>
        Undo
      </button>
      <button>
        Redo
      </button>
      <button>Clear</button>
    </div>

    <div className="grid">
      {
        ((blocks, i, len) => {
          while(++i <= len) {
            const index = i;
            blocks.push(
              <div
                key = {i}
                className = {'block' + (state[index] ? ' active' : '')}
                onClick = {() => set({...state, [index] : !state[index] })}
              />
            )
          }
          return blocks;
        })([], 0, 625)
      }
    </div>
  </div>
  );
}

export default Main;
```

<br/>

### 4. Clear구현하기  <a id="a4"></a>

1. 커스텀 훅에 `clean`함수 구현 및 `return`에 포함시켜주기.

   clean을 누를 경우, 상태로 싹 비워줘야하기 때문에 일단 빈객체를 반환한다.

2. 상위 컴포넌트에서 `clean` 함수 사용하기.

```jsx
// src/hooks/useHistory.js : 커스텀 훅
import {useState} from 'react'

const useHistory = (NowValue) => {
  const [state, setState] = useState({})

  const set = (toggle) => {
    setState(toggle)
  }

  const clean = () => {  // 1번
    setState({})
  }

  return {state, set, clean} // 1번 - clean 추가
}

export default useHistory;
```

<br/>

```jsx
// src/Main.js : 상위 컴포넌트
import React from 'react'
import useHistory from './hooks/useHistory'
import './styles.scss'

const Main = () => {
  const {state, set, clean} = useHistory(); // 2번

  return (
  <div className="container">
    <div className="controls">
      <button>
        Undo
      </button>
      <button>
        Redo
      </button>
      <button onClick={() => clean()}/*2번*/>Clear</button > 
    </div>

    <div className="grid">
      {
        ((blocks, i, len) => {
          while(++i <= len) {
            const index = i;
            blocks.push(
              <div
                key = {i}
                className = {'block' + (state[index] ? ' active' : '')}
                onClick = {() => set({...state, [index] : !state[index] })}
              />
            )
          }
          return blocks;
        })([], 0, 625)
      }
    </div>
  </div>
  );
}

export default Main;
```

<br/>

### 5. useReducer 적용하기  <a id="a5"></a>

1. 본격적으로 커스텀 훅에서 `useState`가 아닌 `reducer`를 구현한다. ( 구현 위치: src/hooks/useHistory.js )

   선언-예) `const [상태변수명, dispatch] = useReducer(리듀서, 초기상태)`로 선언한다.

2. `useReducer` 는 다음과 같은 개념으로 구성되어 있다.

   - 상태(`state`)를 어떻게 해야할 것인지 적어놓은 양식인 `action`
   - `action`을 `reducer`에게 전달하는 `dispatch` , 예)  `dispatch({type: '수행할 액션명(대문자)', 액션 })`
   - `action`을 수행하는 `reducer` , 리듀서는 `switch(action.type)` 을 통해 어떻게 상태를 관리해야할지를 수행한다.

```jsx
// src/hooks/useHistory.js : 커스텀 훅
import {useReducer} from 'react'

const reducer = (state, action) => {
  switch(action.type) {
    case 'SET' :
      return action.toggle;
    case 'CLEAN' :
      return {};
  }
}

const useHistory = (NowValue) => {
  const [state, dispatch] = useReducer(reducer, {}) // 2번 

  const set = (toggle) => {
    return dispatch({type: 'SET', toggle})
  }

  const clean = () => {
    return dispatch({type: 'CLEAN'})
  }

  return {state, set, clean}
}

export default useHistory;

```

<br/>

### 6. Undo, Redo 구현 전 초기 상태 셋팅 및 적용하기. <a id="a6"></a>

`Undo`와 `Redo`를 구현하기 앞서 초기 상태를 셋팅하도록 한다. 
`Undo`는 이전 상태로 되돌아가는 것이고, `Redo`는 현재에서 1번 앞선 상태(최신상태는 제외)로 되돌아가는 것이다.
따라서, 과거-현재-미래 로 초기상태를 셋팅해보자.

1. 초기상태는 과거, 현재, 미래로 구현한다. 
2. 과거와 미래는 지속적으로 상태를 기억해야하므로 배열로 만들고 배열에 추가하는 방식을 이용한다.
3. set은 제일 최신 상태이므로 `Redo`가 필요 없기 때문에 빈배열을 준다.
4. `return`은 `present` 만 한다. 

```jsx
// src/hooks/useHistory.js : 커스텀 훅
import {useReducer} from 'react'

const initialState = { // 1번
  past : [],
  present : {},
  future : []
}

const reducer = (state, action) => {
  const {past, present, future} = state;

  switch(action.type) {
    case 'SET' :
      return {
        past : [...past, present], // 2번, 과거 현재 상태를 배열로 추가하는 방식 이용.
        present : action.toggle,
        future : [] // 3번
      };
    case 'CLEAN' :
      return initialState;
  }
}

const useHistory = (NowValue) => {
  const [state, dispatch] = useReducer(reducer, initialState) // 1번 초기상태 셋팅

  const set = (toggle) => {
    return dispatch({type: 'SET', toggle})
  }

  const clean = () => {
    return dispatch({type: 'CLEAN'})
  }

  return {state : state.present, set, clean} // 4번
}

export default useHistory;

```

<br/>

### 7. Undo구현하기 <a id="a7"></a>

과거의 상태로 돌아가는 `Undo`를 구현한다.

1. 상위 컴포넌트에서 `Hook`을 통해 `undo`를 불러온다. (이벤트도 달아준다.)
2. 커스텀 훅에서 `undo`에 대한 `action`, `reducer`, `dispatch`를 각각 구현해준다.
3. `reducer` 반환하는 상태 현재, 과거, 미래를 다음과 같이 구성한다.
   - 과거 : 현재 쌓아놓은 과거에서 마지막 배열을 제거한 후 할당한다.
   - 현재 : 과거에 쌓여있는 데이터 중에 마지막 배열 보다 한칸 앞선 객체를 할당 한다.
   - 미래 : 현재의 데이터를 배열 맨 앞에 할당한다.(`Redo` 사용 시 앞에서 부터 가져오기 위함.) 

```jsx
// src/Main.js : 상위 컴포넌트
import React from 'react'
import useHistory from './hooks/useHistory'
import './styles.scss'

const Main = () => {
  const {state, set, clean, undo} = useHistory(); // 1번

  return (
  <div className="container">
    <div className="controls">
      <button onClick={() => undo() /* 1번 */}> 
        Undo
      </button>
    ....

```

<br/>

```jsx
// src/hooks/useHistory.js : 커스텀 훅
import {useReducer} from 'react'

const initialState = {
  past : [],
  present : {},
  future : []
}

const reducer = (state, action) => {
  const {past, present, future} = state;

  switch(action.type) {
    case 'SET' :
      return {
        past : [...past, present],
        present : action.toggle,
        future : []
      };
    case 'UNDO' : // 2번
      // 3번
      const newPast = past.slice(0, -1);
      const beforePresent = past[past.length - 1];

      return {
        past : newPast,
        present : beforePresent,
        future : [present, ...future]
      };
    case 'CLEAN' : return initialState;
  }
}

const useHistory = (NowValue) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const set = (toggle) => {
    return dispatch({type: 'SET', toggle})
  }

  const clean = () => {
    return dispatch({type: 'CLEAN'})
  }

  const undo = () => { // 2번
    return dispatch({type: 'UNDO'}) 
  }

  return {state : state.present, set, clean, undo} // 2번
}

export default useHistory;

```

<br/>

### 8. Redo구현하기 <a id="a8"></a>

최신 상태로 되돌아가는 `Redo`를 구현한다.

1. 상위 컴포넌트에서 `Hook`을 통해 `Redo`를 불러온다. (이벤트도 달아준다.)
2. 커스텀 훅에서 `Redo`에 대한 `action`, `reducer`, `dispatch`를 각각 구현해준다.
3. `reducer` 반환하는 상태 현재, 과거, 미래를 다음과 같이 구성한다.
   - 과거 : 쌓아놓은 과거에서 추가로 현재 데이터를 배열에 추가한다. 
   - 현재 : 미래에 쌓여있는 데이터 중에 맨 처음 배열 리스트를 할당 한다.
   - 미래 : 미래의 데이터에서 첫번째 배열 리스트를 제외한 나머지 배열리스트를 할당한다.

```jsx
// src/Main.js : 상위 컴포넌트
import React from 'react'
import useHistory from './hooks/useHistory'
import './styles.scss'

const Main = () => {
  const {state, set, clean, undo, redo} = useHistory(); // 1번

  return (
  <div className="container">
    <div className="controls">
      <button onClick={() => undo()}>
        Undo
      </button>
      <button onClick={() => redo()/* 1번 */}> 
        Redo
      </button>
      <button onClick={() => clean()}>Clear</button>
    </div>
      ...

```

<br/>

```jsx
// src/hooks/useHistory.js : 커스텀 훅
import {useReducer} from 'react'

const initialState = {
  past : [],
  present : {},
  future : []
}

const reducer = (state, action) => {
  const {past, present, future} = state;

  switch(action.type) {
    case 'SET' :
      return {
        past : [...past, present],
        present : action.toggle,
        future : []
      };
    case 'UNDO' :
      const newPast = past.slice(0, -1);
      const beforePresent = past[past.length - 1];

      return {
        past : newPast,
        present : beforePresent,
        future : [present, ...future]
      };
    case 'REDO' : // 2번
      // 3번
      const newFuture = future.slice(1);
      const nextPresent = future[0];

      return {
        past : [...past, present],
        present : nextPresent,
        future : newFuture
      };
    case 'CLEAN' : return initialState;
  }
}

const useHistory = (NowValue) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const set = (toggle) => {
    return dispatch({type: 'SET', toggle})
  }

  const clean = () => {
    return dispatch({type: 'CLEAN'})
  }

  const undo = () => {
    return dispatch({type: 'UNDO'})
  }

  const redo = () => {
    return dispatch({type: 'REDO'}) // 2번
  }

  return {state : state.present, set, clean, undo, redo} // 2번
}

export default useHistory;

```

<br/>

### 9. canUndo, canRedo구현하기 <a id="a9"></a>

더 이상 과거 상태로 돌아가거나, 최신 상태로 돌아갈 필요가 없는 상황일 때 `undo`, `redo` 버튼을 막아버리는 `canUndo`와 `canRedo`를 구현해본다. 

1. 버튼의 클릭을 막아버리는 속성은 `disabled`를 이용한다. 해당 속성은 `true`와 `false`를 버튼의 클릭 유무를 결정내릴수 있게한다.
2. 커스텀 훅에서 각각 `state`에서 `past`와 `future`의 길이가 0일 경우, `true`를 아닐 경우, `false`를 반환하는 형태로 구현한다.

```jsx
// src/Main.js : 상위 컴포넌트
import React from 'react'
import useHistory from './hooks/useHistory'
import './styles.scss'

const Main = () => {
  const {state, set, clean, undo, redo, canUndo, canRedo} = useHistory(); // 1번

  return (
  <div className="container">
    <div className="controls">
      <button onClick={() => undo()} disabled={canUndo} /* 1번 */>
        Undo
      </button>
      <button onClick={() => redo()} disabled={canRedo} /* 1번 */>
        Redo
      </button>
      ...

```

<br/>

```jsx
// src/hooks/useHistory.js : 커스텀 훅
import {useReducer} from 'react'

const initialState = {
  past : [],
  present : {},
  future : []
}

const reducer = (state, action) => {
  const {past, present, future} = state;

  switch(action.type) {
    case 'SET' :
      return {
        past : [...past, present],
        present : action.toggle,
        future : []
      };
    case 'UNDO' :
      const newPast = past.slice(0, -1);
      const beforePresent = past[past.length - 1];

      return {
        past : newPast,
        present : beforePresent,
        future : [present, ...future]
      };
    case 'REDO' :
      const newFuture = future.slice(1);
      const nextPresent = future[0];

      return {
        past : [...past, present],
        present : nextPresent,
        future : newFuture
      };
    case 'CLEAN' : return initialState;
  }
}

const useHistory = (NowValue) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const set = (toggle) => {
    return dispatch({type: 'SET', toggle})
  }

  const clean = () => {
    return dispatch({type: 'CLEAN'})
  }

  const undo = () => {
    return dispatch({type: 'UNDO'})
  }

  const redo = () => {
    return dispatch({type: 'REDO'})
  }

  const canUndo = state.past.length === 0;
  const canRedo = state.future.length === 0;

  return {state : state.present, set, clean, undo, redo, canUndo, canRedo}
}

export default useHistory;

```

<br/>

### 10. useCallback으로 최적화하기 및 반복 렌더링 방지하기<a id="a10"></a>

1. `useCallback`을 이용해서 최적화를 한다.

   `useCallback(fn, [의존성배열])` 

2. `undo`와 `redo`의 경우 `canUndo`, `canRedo` 의 변화에 따라 사용할 수 있도록 `useCallback`에 추가한다. 

3. 반복 렌더링을 방지하기 위한 조건문을 `reducer SET`에 추가해준다.

```jsx
// src/hooks/useHistory.js : 커스텀 훅
import {useReducer, useCallback} from 'react'

const initialState = {
  past : [],
  present : {},
  future : []
}

const reducer = (state, action) => {
  const {past, present, future} = state;

  switch(action.type) {
    case 'SET' :
      if (action.toggle === present) return state; // 3번

      return {
        past : [...past, present],
        present : action.toggle,
        future : []
      };
    case 'UNDO' :
      const newPast = past.slice(0, -1);
      const beforePresent = past[past.length - 1];

      return {
        past : newPast,
        present : beforePresent,
        future : [present, ...future]
      };
    case 'REDO' :
      const newFuture = future.slice(1);
      const nextPresent = future[0];

      return {
        past : [...past, present],
        present : nextPresent,
        future : newFuture
      };
    case 'CLEAN' : return initialState;
  }
}

const useHistory = (NowValue) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const canUndo = state.past.length === 0;
  const canRedo = state.future.length === 0;

  const set = useCallback((toggle) => { // 1번
    return dispatch({type: 'SET', toggle})
  }, [dispatch]);

  const clean = useCallback(() => { // 1번
    return dispatch({type: 'CLEAN'})
  }, [dispatch]);

  const undo = useCallback(() => { // 1번
    if(!canUndo) dispatch({type: 'UNDO'}) // 2번
  }, [canUndo, dispatch]); // 2번

  const redo = useCallback(() => { // 1번
    if(!canRedo) dispatch({type: 'REDO'}) // 2번
  }, [canRedo, dispatch]); // 2번


  return {state : state.present, set, clean, undo, redo, canUndo, canRedo}
}

export default useHistory;

```

<br/>

### 11. 느낀점 <a id="a11"></a>

우선, `커스텀 훅`을 사용했을 경우 유지보수성면에서 좋아질 것이라고 생각했다. 지금은 하나의 파일에 작업을 해도 전혀 무리가 없지만, 협업이나 다른 사람에게 코드를 설명해주거나 할 때에는 커스텀 훅의 장점이 발휘될 것이라고 생각했다.

추가로 `useReducer`의 경우 사용 방법이 좀 까다롭고 복잡한 절차가 있었지만 사용하면 할수록 체계화된 느낌을 많이 받았고 상태가 어떤식으로 동작할 지 내부적인 선택으로 하는 것이기 때문에 가독성 면이나 유지보수면에서 큰 장점이라고 생각했다.

마지막으로, `useCallbackd`의 개념적인 면은 의존성 배열의 여부에 따라 이전의 상태를 기억하는 것으로 알고 있는데, 위 프로젝트에서는 의존성 배열이 모두 `dispatch`를 포함하고 있어서 아직까지는 왜 사용되었는지가 좀 의문이다. 추측상으로는 다른 상태가 추가되고 업데이트 될 경우, `useCallback`이 걸린 상태만 리렌더링을 방지하기 위함이라고 생각했다.  625개의 요소를 처음부터 다시 그려주는 것을 방지하는 것에 대해서 리소스적인 면은 큰 장점이라고 생각한다.

<br/>