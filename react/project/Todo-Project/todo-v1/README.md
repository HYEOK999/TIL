![todo-react-v1](https://user-images.githubusercontent.com/31315644/71952794-546e9980-3223-11ea-9038-5df9fbf298ee.png)

-----------

# Todo Version 1

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

## Todo Version 1 구축하기

> 컴포넌트를 분류하지 않고, 하나의 파일에 클래스형 컴포넌트로 구축해본다.

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

### Todo V1 전체 코드

`JavaScript`로 구현한 것보다 확실히 `Render`를 별도로 구현하지 않아서 훨씬 더 간편하였다.

상태만 관리해주면 되었기 때문에 직접적인 UI를 고려하지 않아도 되는 편리함을 느꼈다.

반대로, render되는 시점에 대한 이해가 더 필요할 것으로 생각된다. 처음 구현시 화면 렌더링 순서에 대한 오해가 개발하는 데 있어서 오류를 발생시키는 원인이 되었다.

```jsx
import React, { createRef, Component } from 'react'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos : [],
      navId : 'all'
    };
    this.nav = createRef();
    // this.cleanTodos = this.cleanTodos.bind(this);
  }

  componentDidMount() {
    let todos = [
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }
    ]
    this.setState({
      todos : [...this.state.todos, ...todos]
    })
  }

  generateId() {
    return Math.max(0, ...this.state.todos.map((todo) => todo.id)) + 1;
  }

  addTodo(key, target) {
    if (target.value.trim() === '' || key !== 'Enter') return;
    let todo = { id: this.generateId() , content: target.value, completed: false};
    this.setState(() => ({
      todos : [...this.state.todos, todo]
    }))
    target.value = '';
  }

  removeTodo(target, id) {
    if(target.classList[0] !== 'remove-todo') return
    this.setState({
      todos : this.state.todos.filter((todo) => todo.id !== id)
    });
  }

  checkTodo(target, id){
    if(target.classList[0] !== 'custom-checkbox') return;
    this.setState({
      todos : this.state.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    })
  }

  toggleTodos(target) {
    this.setState({
      todos : this.state.todos.map((todo) => ({ ...todo, completed: target.checked}))
    })
  }

  cleanTodos() {
    this.setState({
      todos : this.state.todos.filter((todo) => (!todo.completed))
    })
  }

  changeNav(target) {
    if (target.classList.contains('nav')) return;
    [...this.nav.current.children].forEach((navList) => {
      navList.classList.toggle('active', navList.id === target.id);
      this.setState({
        navId : target.id
      })
    });
  }

  render() {
    console.log(this.state);
    const _todos = this.state.todos.filter(({ completed }) => (this.state.navId === 'all' ?  true : this.state.navId === 'active' ? !completed : completed));
    const completedCount = _todos.filter(({ completed }) => completed).length;
    const activeCount = _todos.filter(({ completed }) => !completed).length;

    return (
      <div className="container">
        <h1 className="title">Todos</h1>
        <div className="ver">2.0</div>
        <input className="input-todo" placeholder="What needs to be done?" autoFocus onKeyPress={({key, target}) => this.addTodo(key, target)} />
        <ul className="nav" ref={this.nav} onClick={({target}) => this.changeNav(target)}>
          <li id="all" className="active">All</li>
          <li id="active">Active</li>
          <li id="completed">Completed</li>
        </ul>
        <ul className="todos">
          {
            _todos.map((todo) => (
              <li id={todo.id} className="todo-item" key={todo.id}>
                <input
                  className="custom-checkbox"
                  type="checkbox"
                  onChange={({target}) => this.checkTodo(target, todo.id)}
                  id={`ck-${todo.id}`}
                  checked={todo.completed}
                />
                <label htmlFor={`ck-${todo.id}`}>{todo.content}</label>
                <i className="remove-todo far fa-times-circle" onClick={({target}) => this.removeTodo(target, todo.id)}></i>
              </li>
            ))
          }
        </ul>
        <div className="footer">
          <div className="complete-all">
            <input className="custom-checkbox" type="checkbox" id="ck-complete-all" onClick={({target}) => this.toggleTodos(target)}/>
            <label htmlFor="ck-complete-all">Mark all as complete</label>
          </div>
          <div className="clear-completed">
            <button className="btn" onClick={() => this.cleanTodos}>Clear completed (<span className="completed-todos">{completedCount}</span>)</button>
            <strong className="active-todos">{activeCount}</strong> items left
          </div>
        </div>
    </div>
    );
  }
}

export default App;

```



