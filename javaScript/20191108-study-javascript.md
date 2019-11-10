![Ajax_Todo](https://user-images.githubusercontent.com/31315644/68525090-467ac600-0311-11ea-8f16-c79a28f2491e.png)

------

## JavaScript Study 24

- Ajax를 이용한 Todos App 개발

<br/>

------

<br/>

### 용어 - ( 러버덕 )

- GET

- POST

- PETCH

- POP

- DELETE

  <br/>

---------

## Ajax를 이용한 Todos App 개발

#### 1. package.json 파일 및 app.js 파일 생성

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

#### 2. npm install

package.json 파일 내용을 토대로 npm install 한다.

~~~bash
npm install
~~~

<br/>

#### 3. eslint 설치 및 적용

파일 코드를 깔끔하게 작성하기 위해서 eslint를 사용한다.

~~~bash
npm install eslint eslint-config-airbnb-base eslint-plugin-import eslint-plugin-html --save-dev
~~~

그 후 `.eslintrc.js` 파일을 생성한다.

`.eslintrc.js` 에 내용 추가

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
    "no-console": 0, // "warn"
    "no-plusplus": "off", // x
    "vars-on-top": 0, // x
    "eqeqeq": 0,
    "quotes": [ "error", "single" ],
    "no-underscore-dangle": "warn",
    // "no-plusplus": [ "error", { "allowForLoopAfterthoughts": true }],
    "comma-dangle": [ "error", "never"],
    "no-nested-ternary": 0,
    "no-param-reassign": 0
  }
};
~~~

<br/>

**현재 폴더 상태**

![설치 완료 후 폴더 상태](https://user-images.githubusercontent.com/31315644/66038841-33c0e480-e54e-11e9-9fc8-4277d185b003.jpeg)

<br/>

#### 4. app.js에 내용 추가 ( 백엔드 )

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

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.get('/todos', (req, res) => {
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

app.put('/todos', (req, res) => {
  const { completed } = req.body;
  todos = todos.map((todo) => ({ ...todo, completed }));
  res.send(todos);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
~~~

<br/>

#### 5. public/index.html 추가

~~~html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Todos 2.0</title>
  <link href="css/style.css" rel="stylesheet">
  <script defer src="js/index.js"></script>
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

#### 6. public/css/style.css 추가

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

#### 7. public/js/index.js 추가

~~~~javascript
const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $clearCompleted = document.querySelector('.clear-completed > .btn');
const $completeAll = document.querySelector('.complete-all');
const $nav = document.querySelector('.nav');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');

let todos = [];
let navID = 'all';

// TODOS 데이터 요청 및 받아오기.
const ajax = (() => {
  const request = (method, url, fn, payload) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      // 200 정상 응답, POST는 가끔 201로 반환함.
      if (xhr.status === 200 || xhr.status === 201) {
        fn(JSON.parse(xhr.response)); // 요청의 응답 된 데이터 처리
      } else {
        console.error('error', xhr.status, xhr.statusText);
      }
    };
  };

  return {
    get(url, fn) {
      request('GET', url, fn);
    },
    post(url, fn, payload) {
      request('POST', url, fn, payload);
    },
    delete(url, fn) {
      request('DELETE', url, fn);
    },
    patch(url, fn, payload) {
      request('PATCH', url, fn, payload);
    },
    put(url, fn, payload) {
      request('PUT', url, fn, payload);
    }
  };
})();

// render 함수
const render = (data) => {
  let html = '';
  todos = data;

  todos = data.filter((todo) => (navID === 'all' ? true : navID === 'active' ? !todo.completed : todo.completed));

  todos.forEach(({ id, content, completed }) => {
    html += `
    <li id="${id}" class="todo-item">
      <input class="checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>`;
  });

  $completedTodos.textContent = data.filter((todo) => todo.completed).length;
  $activeTodos.textContent = data.filter((todo) => !todo.completed).length;
  $todos.innerHTML = html;
  console.log('[RENDER]', todos);
};

// 부가 기능 함수
const findMaxId = () => Math.max(0, ...todos.map((todo) => todo.id)) + 1;

// 기능 함수
const getTodos = () => {
  ajax.get('./todos', render);
};

const postTodos = (content) => {
  ajax.post('./todos', render, { id: findMaxId(), content, completed: false });
  $inputTodo.value = '';
};

const removeTodo = (id) => {
  ajax.delete(`./todos/${id}`, render);
};

// patch
const checkTodo = (id, checked) => {
  const completed = checked;
  // const completed = !todos.find((todo) => todo.id === +id).completed;
  ajax.patch(`./todos/${id}`, render, { completed });
};

const toggleAll = (checked) => {
  const completed = checked;
  ajax.put('./todos', render, { completed });
};

const clearTodos = () => {
  ajax.delete('./completedTodos', render);
};

const changeNav = (target) => {
  [...$nav.children].forEach(($list) => {
    $list.classList.toggle('active', $list == target);
    navID = target.id;
  });
  ajax.get('./todos', render);
};

// 이벤트 핸들러
window.onload = () => {
  getTodos();
};

$inputTodo.onkeyup = ({ target, keyCode }) => {
  if (target.value.trim() === '' || keyCode !== 13) return;
  postTodos(target.value.trim());
};

$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;
  removeTodo(target.parentNode.id);
};

$todos.onchange = ({ target }) => {
  checkTodo(target.parentNode.id, target.checked);
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
~~~~

