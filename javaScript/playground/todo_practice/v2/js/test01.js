let todos = [];
let navId = 'all';

const $todos = document.querySelector('.todos');
const $inputTodo = document.querySelector('.input-todo');
const $nav = document.querySelector('.nav');
const $completeAll = document.querySelector('.complete-all');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');

const getTodos = () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ];

  todos.sort((todo1, todo2) => todo2.id - todo1.id);
};

// 확장 기능
const findMaxId = () => Math.max(0, ...todos.map((todo) => todo.id)) + 1;

const separateTab = () => {
  if (navId === 'active') {
    todos = todos.filter((todo) => !todo.completed);
  }
  if (navId === 'completed') {
    todos = todos.filter((todo) => todo.completed);
  }
};

// 기능
const addTodo = (content) => {
  todos = [{ id: findMaxId(), content, completed: false }, ...todos];
  console.log('[addTodo] : ', todos);
};

const removeTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  console.log('[removeTodo] : ', todos);
};

const toggleTodo = (id) => {
  todos = todos.map((todo) => (
    todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  console.log('[toggleTodo] : ', todos);
};

const changeTab = (target) => {
  [...target.parentNode.children].forEach((navItem) => {
    navItem.classList.toggle('active', navItem === target);
    if (navItem.classList.contains('active')) navId = navItem.id;
  });
  console.log('[changeTab] : ', todos, navId);
};

const toggleAll = (checked) => {
  todos = todos.map((todo) => ({ ...todo, completed: checked }));
  console.log('[toggleAll] : ', todos);
};

// 렌더링
const render = () => {
  let html = '';
  const tempTodos = todos;

  separateTab();
  todos.forEach((todo) => {
    html += `
    <li id="${todo.id}" class="todo-item">
      <input class="checkbox" type="checkbox" id="ck-${todo.id}" ${todo.completed ? 'checked' : ''} >
      <label for="ck-${todo.id}">${todo.content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>`;
  });

  $completedTodos.textContent = todos.filter((todo) => todo.completed).length;
  $activeTodos.textContent = todos.filter((todo) => !todo.completed).length;

  $todos.innerHTML = html;
  todos = tempTodos;
};

// 이벤트
window.onload = () => {
  getTodos();
  render();
};

$inputTodo.onkeydown = ({ target, keyCode }) => {
  if (keyCode !== 13 || target.value.trim() === '') return;
  addTodo($inputTodo.value);
  $inputTodo.value = '';
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

$nav.onclick = ({ target }) => {
  if (target.classList.contains('nav')) return;
  changeTab(target);
  render();
};

$completeAll.onchange = ({ target }) => {
  // console.log(target.checked);
  toggleAll(target.checked);
  render();
};
