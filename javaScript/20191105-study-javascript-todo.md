![to-do](https://user-images.githubusercontent.com/31315644/67931586-8cdf6f00-fc05-11e9-9549-3642a1b8805a.jpg)

----------

# JavaScript Study 22

## TODO-LIST 

<br/>

### Todo List V.02 풀이 버전

~~~javascript
let todos = [];
let navId = 'all';

const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $completeAll = document.querySelector('.complete-all');
const $nav = document.querySelector('.nav');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');
const $clearCompleted = document.querySelector('.clear-completed > .btn');


// 데이터 받아오기
function getTodos() {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ];

  todos.sort((todo1, todo2) => todo2.id - todo1.id);
}

// function separateTab() {
//   if (navId === 'all') return;
//   if (navId === 'active') {
//     todos = todos.filter((todo) => (!todo.completed));
//   } else {
//     todos = todos.filter((todo) => (todo.completed));
//   }
// }

function findMaxId() {
  return Math.max(0, ...todos.map((todo) => todo.id)) + 1;
}

function completedCount() {
  return todos.filter((todo) => todo.completed).length;
}

function activeCount() {
  return todos.filter((todo) => !todo.completed).length;
}

// 렌더링
function render() {
  // const tempTodos = [...todos];
  // separateTab();

  const tempTodos = todos.filter(({ completed }) => (navId === 'all' ? true : navId === 'active' ? !completed : completed));

  let html = '';
  tempTodos.forEach(({ id, content, completed }) => {
    html += `
    <li id="${id}" class="todo-item">
      <input class="checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>`;
  });

  $todos.innerHTML = html;

  $completedTodos.textContent = completedCount();
  $activeTodos.textContent = activeCount();

  // todos = tempTodos;
}

// 기능
function addTodo(content) {
  todos = [{ id: findMaxId(), content, completed: false }, ...todos];
  console.log('[addTodo] : ', todos);
}

function removeTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  console.log('[removeTodo] : ', todos);
}

function toggleTodo(id) {
  todos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  console.log('[toggleTodo] : ', todos);
}

function allChangeToggle(checked) {
  todos = todos.map((todo) => ({ ...todo, completed: checked }));
  console.log('[allChangeToggle] : ', todos);
}

function clearCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  console.log('[clearCompleted] : ', todos);
}

function changeNav(id) {
  [...$nav.children].forEach(($navItem) => {
    $navItem.classList.toggle('active', $navItem.id === id);
    navId = id;
  });
  console.log('[changeNav] : ', todos);
}

// 이벤트
window.onload = () => {
  getTodos();
  render();
};

$inputTodo.onkeydown = ({ target, keyCode }) => {
  if (target.value.trim() === '' || keyCode !== 13) return;
  addTodo(target.value);
  target.value = '';
  render();
};

$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;
  removeTodo(+target.parentNode.id);
  render();
};

$todos.onchange = ({ target }) => {
  toggleTodo(+target.parentNode.id);
  render();
};

$completeAll.onchange = ({ target }) => {
  allChangeToggle(target.checked);
  render();
};

$clearCompleted.onclick = () => {
  clearCompleted();
  render();
};

$nav.onclick = ({ target }) => {
  if (target.classList.contains('nav')) return;
  changeNav(target.id);
  render();
};

~~~

#### 주요 코드

이벤트와 기능을 분리하여 코드를 작성함

- 가독성을 크게 늘릴 수 있었다.
- 이벤트에서 처리할 내용들은 if문으로 해당 조건이 맞을 경우 이벤트가 발생하도록만 하게끔 함.
- 모든 이벤트는 `render()` 를 이용하여 웹페이지에 상태를 즉각 반영가능.

<br/>

##### 전 코드와의 다른점

1. 임시 변수`tempTodos` 를 렌더링

   내가 한 방법은 변수를 따로 만들고 거기에 `todos` 값을 임시로 저장하는 방법으로 진행하였다.

   **풀이 방식에서는 `todos`에 대한 변화는 전혀 없었다. ( todos의 데이터는 유지한다.)** 

   임시 변수 `tempTodos`를 만들어서 할당하고 임시 변수 `tempTodos`를 그대로 렌더링 하는 방식이었다.

~~~javascript
function render() {
  // const tempTodos = [...todos];
  // separateTab();

  const tempTodos = todos.filter(({ completed }) => (navId === 'all' ? true : navId === 'active' ? !completed : completed));

  let html = '';
  tempTodos.forEach(({ id, content, completed }) => {
    html += `
    <li id="${id}" class="todo-item">
      <input class="checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>`;
  });

  $todos.innerHTML = html;

  $completedTodos.textContent = return todos.filter((todo) => todo.completed).length;
  $activeTodos.textContent = return todos.filter((todo) => !todo.completed).length;

  // todos = tempTodos;
}
~~~

<br/>

2. 잘못된 문제 이해. 

<img width="730" alt="기본vs풀이" src="https://user-images.githubusercontent.com/31315644/68215878-59e11500-0023-11ea-8c7e-6c12c6f51d44.png">

~~~javascript
  $completedTodos.textContent = return todos.filter((todo) => todo.completed).length;
  $activeTodos.textContent = return todos.filter((todo) => !todo.completed).length;
~~~

현재 `nav`가 아닌 `All-navigation` 기준으로 완료한 할 일 목록, 하지 못한 할일 목록을 나열.

기본 버전의 완료한 할 일 목록을 나타내는 `$completedTodos`와 완료하지 못한 할 일 목록을 나타내는 `$activeTodos`에 대한 값이 다르다. 

우선 풀이 버전은 어느 탭을 가던지 항상 `All` 탭의 상태를 가리키고 있고,
기본 버전은 탭에 따라 가리키는 데이터가 다르다. 

문제는 풀이버전이든 기본버전이든 소스는 동일한데,
이유는 기본버전에서는 `1번` 처럼 임시 변수를 렌더링 하는 방식이 아니라 todos자체를 렌더링 하고 렌더링 후에 todos를 다시 원래 값으로 바꿔 주는 형태의 소스 였고, 풀이버전은 todos의 값을 임시 변수에 할당하고 임시 변수를 렌더링하는 방식이기 때문에 todos의 값은 항상 그대로이며  `$completedTodos`와 `$activeTodos` 도 모두 todos 데이터를 참조하고 있기 때문이다.

<br/>