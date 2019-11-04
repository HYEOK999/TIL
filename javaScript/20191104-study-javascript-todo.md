![to-do](https://user-images.githubusercontent.com/31315644/67931586-8cdf6f00-fc05-11e9-9549-3642a1b8805a.jpg)

----------

# JavaScript Study 21

## TODO-LIST 

<br/>

### Todo List V.02 추가 버전

~~~javascript
let todos = [];
let tempTodos = [];
let $navId = 'all';

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

function separateTab(navId) {
  if (navId === 'all') return;
  if (navId === 'active') {
    todos = todos.filter((todo) => (!todo.completed));
  } else {
    todos = todos.filter((todo) => (todo.completed));
  }
}

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
  tempTodos = todos;
  separateTab($navId);
  let html = '';
  todos.forEach(({ id, content, completed }) => {
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

  todos = tempTodos;
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

function changeNav(navList) {
  [...$nav.children].forEach(($navItem) => {
    $navItem.classList.toggle('active', $navItem === navList);
    if ($navItem.classList.contains('active')) $navId = $navItem.id;
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
  changeNav(target);
  render();
};
~~~

#### 주요 코드

이벤트와 기능을 분리하여 코드를 작성함

- 가독성을 크게 늘릴 수 있었다.
- 이벤트에서 처리할 내용들은 if문으로 해당 조건이 맞을 경우 이벤트가 발생하도록만 하게끔 함.
- 모든 이벤트는 `render()` 를 이용하여 웹페이지에 상태를 즉각 반영가능.

<br/>

##### 네비게이션 바 ( 탭을 분리하여 todo 관리하기)

~~~html
<ul class="nav">
      <li id="all" class="active">All</li>
      <li id="active">Active</li>
      <li id="completed">Completed</li>
</ul>
~~~

<br/>

1. 네비게이션 3개( All, Active, Completed )탭에 따라 현재 할 일 목록을 나누고자 함.

   가장 먼저 할일은 `document.querySelector('.nav');` 를 불러와 전역 변수를 생성하여 해당 요소에 접근하도록 함.

   그리고 해당 요소를 클릭했을 시에 일어나는 이벤트를 처리하도록 함수를 작성함. 

   해당 함수는 각 탭마다 보여지는게 다르므로 `render()` 를 해야 하기에 코드를 추가 하였고 선택된 `<li> e.target` 와 `<ul>의 자식인 <li>` 를 비교하기 위해 함수`changeNav(e.target)`를 작성하였음.  

~~~javascript
const $nav = document.querySelector('.nav');

// 이벤트
$nav.onclick = ({ target }) => {
  if (target.classList.contains('nav')) return;
  changeNav(target);
  render();
};
~~~

<br/>

2. 해당 함수에서는 `<ul> 안의 <li>` 를 통채로 꺼내와야 하는데 2가지 방법이 존재한다.

   1. `children` : HTMLCollection 형태로 자식들이 구성되어있다. 특징은 요소만 가지고 있다.
   2. `childNodes` : NodeList 형태로 자식들이 구성 되어있다.  텍스트요소를 포함하여 모두 가지고 있기에 별도의 분리가 필요하다.

   2번은 텍스트요소도 포함되어 있기 때문에 더 간단히 사용할 수 있는 `children` 을 이용한다. 

   HOF를 사용하기 위해서 HTMLCollection을 배열로 스프레드 연산자를 이용하여 변환한다. `[...$nav.children]`

   변환 후 forEach 함수를 이용하여 반복 한다.

   `<ul>` 의 각 요소 `<li>` 를 나태나는 `$navItem` 이 만약 인수로 넘겨 준 클릭 `<li>` 요소 `navList` 와 같다면 toggleMethod를 이용하여 해당 클래스에 'active'를 추가하고 같지 않다면 'active'를 제거한다.

   그리고 `전역 변수 $navId`에 class='active'인 `<li>`의 id값을 넘겨준다.

~~~javascript
function changeNav(navList) {
  [...$nav.children].forEach(($navItem) => {
    $navItem.classList.toggle('active', $navItem === navList);
    if ($navItem.classList.contains('active')) $navId = $navItem.id;
  });
  console.log('[changeNav] : ', todos);
}
~~~

<br/>

3. 2번에서 함수를 호출 하여 `<li>` 요소의 클래스를 변경 해준 뒤 `render()`를 실행한다.

   `render()`에서 탭이 바뀌기 전에 저장할 임시 전역 변수 `tempTodos`에게 `todos`값을 저장 하고  `separateTab($navId)`함수를 호출 하면서 인수로 nav의 id값을 저장하고있는 $navId를 넣는다.

~~~javascript
// 렌더링
function render() {
  tempTodos = todos;
  separateTab($navId);
  ...
}
~~~

<br/>

4. 3번에서 호출한 `separateTab(navId)`는 전역변수로 받은 navigation의 id값에 따라 화면에 렌더링할 todos를 재할당한다.

~~~~javascript
function separateTab(navId) {
  if (navId === 'all') return;
  if (navId === 'active') {
    todos = todos.filter((todo) => (!todo.completed));
  } else {
    todos = todos.filter((todo) => (todo.completed));
  }
}
~~~~

<br/>

5. 4번에 의하여 재할당된 todos를 가지고 html을 렌더링한다. 

   마지막 쯤 todos 에 처음에 복사한 원본 todos를 다시 할당하고 render 함수를 종료한다.

~~~javascript
// 렌더링
function render() {
  tempTodos = todos;
  separateTab($navId);
  let html = '';
  todos.forEach(({ id, content, completed }) => {
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

  todos = tempTodos;
}
~~~

<br/>