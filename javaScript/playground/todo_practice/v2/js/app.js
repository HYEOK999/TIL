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
