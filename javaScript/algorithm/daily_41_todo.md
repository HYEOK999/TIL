<img src="https://user-images.githubusercontent.com/31315644/68863936-a28b8300-0733-11ea-8ae8-08de5d0795bb.png" alt="email-axios" style="zoom:50%;" />

-------

## TODO LIST FULL VERSION - axios

### Ajax 란?

> JavaScript를 사용한 비동기 통신, 클라이언트와 서버간에 XML 데이터를 주고받는 기술.

Ajax 요청 방법 3가지

1. XMLHttpRequest
2. Axios
3. fetch

-------

###  axios

<img src="https://user-images.githubusercontent.com/31315644/68789904-aebb0600-0689-11ea-9c3f-116a5f08b61b.jpeg" alt="todoFolder구조" style="zoom: 33%;" />

1. [package.json](#a1)

2. [.eslintrc.js](#a2)

3. [app.js 서버](#a3)

   **public폴더 ▼**

4. [index.html](#a4)

5. [css/style.css](#a5)

6. [js/03axios.js](#a6)

------------------

- `package.json` <a id="a1"></a>

~~~json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon app"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "eslint": "^6.6.0",
    "eslint-config-airbnb-base": "^14.0.0",
    "eslint-plugin-html": "^6.0.0",
    "eslint-plugin-import": "^2.18.2"
  }
}
~~~

<br/>

- `.eslintrc.js` <a id="a2"></a>

~~~json
module.exports = {
  "parserOptions": {
    "ecmaVersion": 9
  },
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true,
    "jquery": true
  },
  "extends": "airbnb-base",
  "plugins": [ "import", "html" ],
  "rules": {
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
    // "no-var": 0,
    "prefer-arrow-callback": 0,
    "no-console": 0,  // "warn"
    "no-plusplus": "off",  // x
    "vars-on-top": 0,  // x
    "eqeqeq": 0,
    "quotes": [ "error", "single" ],
    "no-underscore-dangle": "warn",
    // "no-plusplus": [ "error", { "allowForLoopAfterthoughts": true }],
    "comma-dangle": [ "error", "never"],
    "no-nested-ternary": 0,
    "no-param-reassign": 0,
    "no-return-assign" : 0,
  }
};
~~~

<br/>

- `app.js` 서버 <a id="a3"></a>

~~~javascript
// express 패키지(모듈)를 가지고 온다.
const express = require('express');

const app = express();

let todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascirpt', completed: false }
];

// 루트 폴더의 이름을 퍼블릭으로 할거야.
// 미들웨어 딱 1번만 실행됨.
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing

// app.get('/', (req, res) => {
//   res.send('hello world!');
// });

app.get('/todos', (req, res) => {
  todos.sort((t1, t2) => t2.id - t1.id);
  res.send(todos);
});

app.post('/todos', (req, res) => {
  console.log(req.body);
  todos = [req.body, ...todos];
  res.send(todos);
});

// app.patch('/todos/:id([0-9])', (req, res) => {
app.patch('/todos/:id', (req, res) => {
  const { id } = req.params; // req.params.id
  const { completed } = req.body; // req.body.completed;
  todos = todos.map((todo) => (todo.id === +id ? { ...todo, completed } : todo));
  res.send(todos);
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params; // req.params.id
  todos = todos.filter((todo) => todo.id !== +id);
  res.send(todos);
});

app.delete('/completedTodos', (req, res) => {
  todos = todos.filter((todo) => !todo.completed);
  res.send(todos);
});

app.patch('/todos', (req, res) => {
  const { completed } = req.body;
  todos = todos.map((todo) => ({ ...todo, completed }));
  res.send(todos);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
~~~

<br/>

- `index.html` <a id="a4"></a>

~~~html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Todos 2.0</title>
  <link href="./css/style.css" rel="stylesheet">
  <<script defer src="./js/01promise.js"></script>
  <script defer src="./js/04async.js"></script>
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
      <!-- <li id="myId" class="todo-item">
        <input class="checkbox" type="checkbox" id="ck-myId">
        <label for="ck-myId">HTML</label>
        <i class="remove-todo far fa-times-circle"></i>
      </li> -->
    </ul>
    <footer>
      <div class="complete-all">
        <input class="checkbox" type="checkbox" id="ck-complete-all">
        <label for="ck-complete-all">Mark all as complete</label>
      </div>
      <div class="clear-completed">
        <button class="btn">Clear completed (<span class="completed-todos">0</span>)</button>
        <strong class="active-todos">0</strong> items left
      </div>
    </footer>
  </div>
</body>
</html>
~~~

<br/>

- `css/style.css` <a id="a5"></a>

~~~css
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,700|Noto+Sans+KR');
@import url('https://use.fontawesome.com/releases/v5.5.0/css/all.css');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  font-size: 0.9em;
  color: #a9b0b4; /*#58666e;*/
  background-color: #505455;/*#f0f3f4;*/
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
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
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

.todos {
  margin-top: 20px;
}

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
  .checkbox
  .checkbox 바로 뒤에 위치한 label의 before와 after를 사용해
  .checkbox의 외부 박스와 내부 박스를 생성한다.

  <input class="checkbox" type="checkbox" id="myId">
  <label for="myId">Content</label>
*/

.checkbox {
  display: none;
}

.checkbox + label {
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

.checkbox + label:before {
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

.checkbox:checked + label:after {
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

footer {
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
~~~

<br/>

- `js/03axios.js` <a id="a6"></a>

~~~javascript
let todos = [];
let navId = 'all';

const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $nav = document.querySelector('.nav');
const $clearCompleted = document.querySelector('.clear-completed > .btn');
const $completeAll = document.querySelector('.complete-all');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');

const ajax = (() => {
  const request = (method, url, payload) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        resolve(JSON.parse(xhr.response));
      }
    };
    xhr.onerror = () => {
      reject(xhr.status);
    };
  });

  return {
    get(url) {
      return request('GET', url);
    },
    post(url, payload) {
      return request('POST', url, payload);
    },
    delete(url) {
      return request('DELETE', url);
    },
    patch(url, payload) {
      return request('PATCH', url, payload);
    },
    put(url, payload) {
      return request('PUT', url, payload);
    }
  };
})();

// 렌더
const render = () => {
  let html = '';
  const _todos = todos.filter((todo) => (navId === 'all' ? true : navId === 'active' ? !todo.completed : todo.completed));

  _todos.forEach(({ id, content, completed }) => {
    html += `
    <li id="${id}" class="todo-item">
      <input class="checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <button class="remove-todo">X</button>
    </li>`;
  });

  $completedTodos.textContent = todos.filter((todo) => todo.completed).length;
  $activeTodos.textContent = todos.filter((todo) => !todo.completed).length;
  $todos.innerHTML = html;
};

// 기능
const findMaxId = () => Math.max(0, ...todos.map((todo) => todo.id)) + 1;

// 이벤트 함수
const getTodos = () => {
  ajax.get('./todos')
    .then((res) => todos = res)
    .then(render)
    .catch((err) => console.log(err));
};

const addTodos = () => {
  const todo = { id: findMaxId(), content: $inputTodo.value, completed: false };
  ajax.post('./todos', todo)
    .then((res) => todos = res)
    .then(render)
    .catch((err) => console.log(err));
  $inputTodo.value = '';
};

const removeTodo = (id) => {
  ajax.delete(`./todos/${id}`)
    .then((res) => todos = res)
    .then(render)
    .catch((err) => console.log(err));
};

const toggleTodo = (id) => {
  const completed = !todos.find((todo) => todo.id === +id).completed;
  ajax.patch(`/todos/${id}`, { completed })
    .then((res) => todos = res)
    .then(render)
    .catch((err) => console.log(err));
};

const toggleAll = (completed) => {
  ajax.patch('./todos', { completed })
    .then((_todos) => todos = _todos)
    .then(render)
    .catch((err) => console.error(err));
};

const clearTodos = () => {
  ajax.delete('./completedTodos')
    .then((_todos) => todos = _todos)
    .then(render)
    .catch((err) => console.error(err));
};

const changeNav = (li) => {
  [...$nav.children].forEach(($list) => {
    $list.classList.toggle('active', $list === li);
  });
  navId = li.id;
  render();
};

// 이벤트
window.onload = () => {
  getTodos();
  console.log('promise');
};

$inputTodo.onkeyup = ({ target, keyCode }) => {
  if (keyCode !== 13 || target.value.trim() === '') return;
  addTodos();
};

$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;
  removeTodo(target.parentNode.id);
};

$todos.onchange = ({ target }) => {
  toggleTodo(target.parentNode.id);
};


$completeAll.onchange = ({ target }) => {
  toggleAll(target.checked);
};

$clearCompleted.onclick = () => {
  clearTodos();
};

$nav.onclick = ({ target }) => {
  if (target.classList.contains('nav')) return;
  changeNav(target);
};
~~~

<br/>
