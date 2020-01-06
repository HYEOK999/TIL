const $inputTodo = document.querySelector('.input-todo');
const $todos = document.querySelector('.todos');
const $completeAllBtn = document.querySelector('#ck-complete-all');
const $completeClear = document.querySelector('.clear-completed');
const $completeTodoCount = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');

let todos = [];

function render() {
  let html = '';

  todos.forEach((todo) => {
    html += `
    <li id="${todo.id}" class="todo-item">
      <input class="checkbox" type="checkbox" id="ck-${todo.id}" ${todo.completed ? 'checked' : ''}>
      <label for="ck-${todo.id}">${todo.content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>`;
  });

  $todos.innerHTML = html;
  $inputTodo.value = '';
}

function findMaxId() {
  return Math.max(0, ...todos.map((todo) => todo.id)) + 1;
}

function getTodo() {
  todos = [
    { id: 3, content: 'Javascript', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'HTML', completed: false }
  ];

  render();
}

window.addEventListener('load', getTodo);

$inputTodo.addEventListener('keydown', function (e) {
  if (e.keyCode !== 13 || $inputTodo.value.trim() === '') return;
  todos = [{ id: findMaxId(), content: $inputTodo.value, completed: false }, ...todos];

  render();
});

$todos.addEventListener('click', function (e) {
  if (!e.target.classList.contains('remove-todo')) return;
  todos = todos.filter((todo) => +e.target.parentNode.id !== todo.id);

  render();
});

$completeAllBtn.addEventListener('click', function () {
  todos = todos.map((todo) => ($completeAllBtn.checked
    ? { ...todo, completed: true } : { ...todo, completed: false }));
  render();
});

$todos.addEventListener('change', function ({ target }) {
  todos = todos.map((todo) => (+target.parentNode.id === todo.id
    ? { ...todo, completed: !todo.completed } : todo));

  render();
});

$completeClear.addEventListener('click', function (e) {
  if (!e.target.classList.contains('btn')) return;
  const checkCount = todos.filter((todo) => todo.completed).length;
  const nonCheckCount = todos.filter((todo) => !todo.completed).length;

  todos = [];
  $completeTodoCount.innerHTML = checkCount;
  $activeTodos.innerHTML = nonCheckCount;

  render();
});
