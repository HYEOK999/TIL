![todo-react-v2](https://user-images.githubusercontent.com/31315644/71952612-a95de000-3222-11ea-8a65-3c94aa73e055.png)

-----------

# Todo Version 2

## 기능

1. Todo 추가
2. Todo 삭제
3. Todo 체크
4. 전체 Todos 완료 / 미완료 토글
5. 체크된 Todos 삭제
6. 체크된 Todos 카운팅
7. 체크되지 않은 Todos 카운팅
8. 탭에 따라 Todo 분류 (전체 Todo, 체크된 Todo, 체크되지 않은 Todo)

-----------

## Todo Version 2 구축하기

> 컴포넌트를 분류한다. 
>
> 함수형 컴포넌트(Hook)으로 구축해본다.

<br/>

### 컴포넌트 분류

최상위 컴포넌트: MainView 

하위 컴포넌트 : Input, Navigation, TodoList, Footer

<img src="https://user-images.githubusercontent.com/31315644/72003712-481f2680-328d-11ea-9670-9618227dddb3.png" alt="Todo Component Classify" style="zoom:50%;" />

<br/>

### 마크업

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Todos 2.0</title>
  <link href="css/style.css" rel="stylesheet">
  <script defer src="js/app.js"></script>
</head>
<body>
  <div class="container">
    <h1 class="title">Todos</h1>
    <div class="ver">2.0</div>

    <input class="input-todo" placeholder="What needs to be done?" autofocus>
    <ul class="nav">
      <li id="all" class="active">All</li>
      <li id="active">Active</li>
      <li id="completed">Completed</li>
    </ul>

    <ul class="todos">
      <li id="myId" class="todo-item">
        <input class="custom-checkbox" type="checkbox" id="ck-myId">
        <label for="ck-myId">HTML</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li>
    </ul>
    <div class="footer">
      <div class="complete-all">
        <input class="custom-checkbox" type="checkbox" id="ck-complete-all">
        <label for="ck-complete-all">Mark all as complete</label>
      </div>
      <div class="clear-completed">
        <button class="btn">Clear completed (<span class="completed-todos">0</span>)</button>
        <strong class="active-todos">0</strong> items left
      </div>
    </div>
  </div>
</body>
</html>
```

<br/>

### 초기화 데이터

```jsx
let todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ]
```

<br/>

### CSS

```css
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,700|Noto+Sans+KR');
@import url('https://use.fontawesome.com/releases/v5.5.0/css/all.css');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  /* font-size: 16px; */
  font-size: 0.9em;
  color: #58666e;
  background-color: #f0f3f4;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 750px;
  min-width: 450px;
  margin: 0 auto;
  padding: 15px;
}

.title {
  /* margin: 10px 0; */
  font-size: 4.5em;
  font-weight: 100;
  text-align: center;
  color: #23b7e5;
}

.ver {
  font-weight: 100;
  text-align: center;
  color: #23b7e5;
  margin-bottom: 30px;
}

/* .input-todo  */
.input-todo {
  display: block;
  width: 100%;
  height: 45px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  color: #555;
  border: 1px solid #ccc;
  border-color: #e7ecee;
  border-radius: 6px;
  outline: none;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}

.input-todo:focus {
  border-color: #23b7e5;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
}

.input-todo::-webkit-input-placeholder {
  color: #999;
}

/* .nav */
.nav {
  display: flex;
  margin: 15px;
  list-style: none;
}

.nav > li {
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.nav > li.active {
  color: #fff;
  background-color: #23b7e5;
}

.todo-list {}

/* .todo-item */
.todo-item {
  position: relative;
  /* display: block; */
  height: 50px;
  padding: 10px 15px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-color: #e7ecee;
  list-style: none;
}

.todo-item:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.todo-item:last-child {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

/*
  .custom-checkbox
  custom-checkbox 바로 뒤에 위치한 label의 before와 after를 사용해
  custom-checkbox의 외부 박스와 내부 박스를 생성한다.

  <input class="custom-checkbox" type="checkbox" id="myId">
  <label for="myId">Content</label>
*/

.custom-checkbox {
  display: none;
}

.custom-checkbox + label {
  position: absolute; /* 부모 위치를 기준으로 */
  top: 50%;
  left: 15px;
  transform: translate3d(0, -50%, 0);
  display: inline-block;
  width: 90%;
  line-height: 2em;
  padding-left: 35px;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox + label:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 0);
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 1px solid #cfdadd;
}

.custom-checkbox:checked + label:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 6px;
  transform: translate3d(0, -50%, 0);
  width: 10px;
  height: 10px;
  background-color: #23b7e5;
}

/* .remove-todo button */
.remove-todo {
  display: none;
  position: absolute;
  top: 50%;
  right: 10px;
  cursor: pointer;
  transform: translate3d(0, -50%, 0);
}

/* todo-item이 호버 상태이면 삭제 버튼을 활성화 */
.todo-item:hover > .remove-todo {
  display: block;
}

.footer {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.complete-all, .clear-completed {
  position: relative;
  flex-basis: 50%;
}

.clear-completed {
  text-align: right;
  padding-right: 15px;
}

.btn {
  padding: 1px 5px;
  font-size: .8em;
  line-height: 1.5;
  border-radius: 3px;
  outline: none;
  color: #333;
  background-color: #fff;
  border-color: #ccc;
  cursor: pointer;
}

.btn:hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
```

<br/>

### Todo V2 전체 코드

#### MainView.js

**최상위 컴포넌트**

수정사항 : `Navigation`컴포넌트에서 상태를 받아가지고 오기 위해서 사용한 `all`을 상태 객체로 관리한다. 이렇게 한 이유는 굳이 DOM요소를 조작하지 않고 상태만으로 렌더링이 가능할 것이라고 판단하였기 때문이다. 따라서 기존의 `주석 TODO: v1,2`는 주석처리하고 `주석 TODO: v3`를 사용한다.

전반적으로 `Todo Version 1`과 비교했을 때 훨씬 더 자바스크립트의 모양새에 탈피한 느낌이며, 리액트의 특징 답게 UI를 신경쓰지 않고 상태만 관리를 해주면 되었기에 훨씬 더 간편하고 직관적이며 유지보수가 용이한 코드를 작성할 수 있었다.

```jsx
import React, { useState, useEffect } from 'react'
import './MainView.css';
import InputTodo from './components/Input';
import Navigation from './components/Navigation';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

const MainView = () => {
  const [todos, setTodos] = useState([]);
  //TODO: v1,v2
  // const [navId, setNavId] = useState('all');

  //TODO: v3
  const [navLists, setNavLists] = useState([
    {id: 1, navId:'All', toggle: true},
    {id: 2, navId:'Active', toggle: false},
    {id: 3, navId:'Completed', toggle: false}
  ]);

  useEffect(() => {
    setTodos([
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }
    ])
  }, [])

  const generatedId = () => {
    return Math.max(0, ...todos.map((todo) => todo.id)) + 1;
  }

  const addTodo = (key, target) => {
    if(key !== 'Enter' || target.value.trim() === '') return;
    setTodos([
      ...todos,
      { id : generatedId(), content: target.value, completed: false }
    ])
    target.value = '';
  }

  const checkedTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? {...todo, completed: !todo.completed} : todo)))
  }

  const removeTodo = (target, id) => {
    if(!target.classList.contains('remove-todo')) return;
    setTodos(todos.filter((todo) => (todo.id !== id)))
  }

  const allToggleTodo = (target) => {
    setTodos(todos.map((todo) => ({...todo, completed: target.checked})))
  }

  const completedAllTodo = () => {
    setTodos(todos.filter(({completed}) => (!completed)))
  }

  //TODO: v1
  // const changeNavigation = ($nav, target) => {
  //   if (target.classList.contains('nav')) return;
  //   [...$nav.current.children].forEach(($navList) => {
  //     $navList.classList.toggle('active', $navList.id === target.id);
  //     setNavId(target.id);
  //   });
  // }

  //TODO: v2
  // const changeNavigation = ($nav, target) => {
  //   [...$nav.current.children].forEach(($navList) => {
  //     $navList.classList.toggle('active', $navList.id === target.id);
  //     setNavId(target.id);
  //   });
  // }

  //TODO: v3
  const changeNavigation = (id) => {
    setNavLists(navLists.map((navList) => id === navList.id ? {...navList, toggle:true} : {...navList, toggle:false}))
  }

  //TODO: v1,v2
  // const _todos = todos.filter((todo) => navId === 'all' ? todo : navId === 'active' ? !todo.completed : todo.completed)

  //TODO: v3
  const _todos = todos.filter((todo) => navLists[0].toggle ? todo : navLists[1].toggle ? !todo.completed : todo.completed)
  const completedCount = _todos.filter(({completed}) => completed).length
  const activeCount = _todos.filter(({completed}) => !completed).length

  return (
    <div className="container">
      <h1 className="title">Todos</h1>
      <div className="ver">2.0</div>
      <InputTodo addTodo={addTodo}/>
      <Navigation changeNavigation={changeNavigation} navLists={navLists}/>
      <TodoList todos={_todos} checkedTodo={checkedTodo} removeTodo={removeTodo}/>
      <Footer allToggleTodo={allToggleTodo} completedAllTodo={completedAllTodo} completedCount={completedCount} activeCount={activeCount}/>
    </div>
  );
}

export default MainView;

```

<br/>

#### components/Input/index.jsx

**하위 컴포넌트**

`input`  태그를 별도로 분리하여 관리한다. 해당 태그에서 추가 이벤트가 일어나야 하므로 `onKeyPress`이벤트를 이용하였고 상위 컴포넌트로부터 내려받은 이벤트와 연결시켜주었다.

태그를 하나만 쓰면 되고 기존의 마크업을 변경시키지 않기 위해서 Fragments(`<>  </>`)을 이용하였다.

```jsx
import React from 'react'

const InputTodo = ({addTodo}) => {
  return (
    <>
      <input className="input-todo" placeholder="What needs to be done?" autoFocus onKeyPress={({key, target}) => addTodo(key, target)}/>
    </>
  );
}

export default InputTodo;
```

<br/>

#### components/Navigation/index.jsx

**하위 컴포넌트**

`Navigation`  을 분리하여 관리한다. 해당 태그에서 탭 변경 이벤트가 일어나야 하므로 `onClick`이벤트를 이용하였고 상위 컴포넌트로부터 내려받은 이벤트와 연결시켜주었다.

수정사항 : 기존에는 DOM을 조작하는 방식으로 이용을 하였으나 상위 컴포넌트에서 관리하는 상태를 이용하여 DOM을 조작하는 방식이 아닌 상태에 의존하여 DOM을 렌더링하는 방식으로 변경하였다.

```jsx
import React, { useRef } from 'react'

const Navigation = ({navLists, changeNavigation}) => {
  const nav = useRef();
  console.log(navLists);
  return (
    //TODO: v3
    <ul className="nav" ref={nav}>
      {
      navLists.map((navItem) => (
          <li
            key={navItem.id}
            id={navItem.navId}
            className={navItem.toggle ? 'active' : null}
            onClick={() => changeNavigation(navItem.id)}
          >
            {navItem.navId}
          </li>
        ))
      }
    </ul>

    //TODO: v1
    // <ul className="nav" ref={nav} onClick={({target}) => changeNavigation(nav, target)}>
    //   <li id="all" className="active" >All</li>
    //   <li id="active">Active</li>
    //   <li id="completed">Completed</li>
    // </ul>

    //TODO: v2
    // <ul className="nav" ref={nav}>
    //   <li id="all" onClick={({target}) => changeNavigation(nav, target)} className="active" >All</li>
    //   <li id="active" onClick={({target}) => changeNavigation(nav, target)}>Active</li>
    //   <li id="completed" onClick={({target}) => changeNavigation(nav, target)}>Completed</li>
    // </ul>
  );
}

export default Navigation;
```

<br/>

#### components/TodoList/index.jsx 

**하위 컴포넌트**

`Todos List`  를 별도로 분리하여 관리한다. 해당 태그에서는 실질적으로 Todo를 렌더링해야 한다.

중간의 `input`태그에서는 `checked` 속성이 이용되었는데 이 속성은 해당 태그 내의 속성 중 `onChange` 이벤트가 작성이 안되어 있으면 `defaultChecked`를 사용하라는 에러를 내뿜는다. 이점을 참고할 것.

삭제 버튼이 이쪽에 구현되야 하므로 `<i></i>`태그에 `onClick` 이벤트를 걸어주었다.

```jsx
import React from 'react'

const Todos = ({todos, checkedTodo, removeTodo}) => {
  return (
    <ul className="todos">
      {
        todos.map((todo) => (
          <li id={todos.id} className="todo-item" key={todo.id}>
            <input className="custom-checkbox" type="checkbox" id={`ck-${todo.id}`} onChange={() => checkedTodo(todo.id)} checked={todo.completed} />
            <label htmlFor={`ck-${todo.id}`}>{todo.content}</label>
            <i className="remove-todo far fa-times-circle" onClick={({target}) => removeTodo(target, todo.id)}></i>
          </li>
        ))
      }
    </ul>
  );
}

export default Todos;
```

<br/>

#### components/Footer/index.jsx

**하위 컴포넌트**

`Footer`  를 별도로 분리하여 관리한다. 

`Footer`에서는 폴더를 쉽게 관리하기 위해서 내부적으로 2개의 하위 컴포넌트로 더 나누었다.

- CompleteAll
- ClearCompleted

```jsx
import React from 'react'
import CompleteAll from './CompleteAll'
import ClearCompleted from './ClearCompleted';

const Footer = ({allToggleTodo, completedAllTodo, completedCount, activeCount}) => {
  return (
    <div className="footer">
      <CompleteAll allToggleTodo={allToggleTodo}></CompleteAll>
      <ClearCompleted completedAllTodo={completedAllTodo} completedCount={completedCount} activeCount={activeCount}></ClearCompleted>
    </div>
  );
}

export default Footer;
```

<br/>

#### components/Footer/ClearCompleted.jsx

**Footer의 하위 컴포넌트**

완료된 할 일들을 목록에서 모두 제거해버리는 로직을 구현한다.

추가로, 현재 완료된 할 일 목록의 카운팅 수 와 완료되지 않은 할 일 목록의 카운팅 수를 화면에 렌더링한다.

```jsx
import React from 'react'

const ClearCompleted = ({completedAllTodo, completedCount, activeCount}) => {
  return (
    <div className="clear-completed">
      <button className="btn"  onClick={() => completedAllTodo()} >Clear completed (<span className="completed-todos">{completedCount}</span>)</button>
      <strong className="active-todos">{activeCount}</strong> items left
    </div>
  );
}

export default ClearCompleted;
```

<br/>

#### components/Footer/CompleteAll.jsx

**Footer의 하위 컴포넌트**

모든 목록에 대하여 클릭 시 모든 목록을 토글 시켜주는 기능을 구현한다.

따라서 버튼을 클릭해야 하므로 `onClick`으로 구현을 하며, 최상위 MainView - 상위 Footer - 현재 CompleteAll순으로 props를 통해 내려받는다.

```jsx
import React from 'react'

const CompleteAll = ({allToggleTodo}) => {
  return (
    <div className="complete-all">
      <input className="custom-checkbox" type="checkbox" id="ck-complete-all" onClick={({target}) => allToggleTodo(target)} />
      <label htmlFor="ck-complete-all">Mark all as complete</label>
    </div>
  );
}

export default CompleteAll;
```

