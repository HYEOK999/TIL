let todos = [];

// DOMs
const $todos = document.querySelector('.todos');
const $input = document.querySelector('.input-todo');
const $completeAll = document.querySelector('.complete-all');
const $clearCompleted = document.querySelector('.clear-completed > .btn');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');


// 1. 서버로부터 데이터를 취급
const getTodos = () => {
  // 서버로부터 todos를 취득
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }
  ];

  // 서버에서 가져온 데이터 정렬(Sort)
  todos.sort((todo1, todo2) => todo2.id - todo1.id);
};

// 2. 화면에 그릴 렌더함수 작성.
const render = () => {
  let html = '';

  // 디스트럭처링
  todos.forEach(({ id, content, completed }) => {
    html += `
    <li id="${id}" class="todo-item">
      <input class="checkbox" type="checkbox" id="ck-${id}" ${completed ? 'checked' : ''}>
      <label for="ck-${id}">${content}</label>
      <i class="remove-todo far fa-times-circle"></i>
    </li>`;
  });

  $todos.innerHTML = html;
  $completedTodos.textContent = todos.filter((todo) => todo.completed).length;
  $activeTodos.textContent = todos.filter((todo) => !todo.completed).length;
};

// 3. 데이터 조작 함수
// 3-2. id만들기
const generatedId = () => Math.max(0, ...todos.map((todo) => todo.id)) + 1;

// 3-1. Todo 추가
const addTodo = (content) => {
  // { id: generatedId(), content: content, completed: false} 아래로 축약
  todos = [{ id: generatedId(), content, completed: false }, ...todos];
  console.log('[addTodo]', todos);
};

// 3-2. Todo 토글
const toggleCompleted = (id) => {
  todos = todos.map((todo) => (id === todo.id ? { ...todo, completed: !todo.completed } : todo));
  console.log('[toggleTodo]', todos);
};

// 3-3. remove 버튼(x 버튼)
const removeTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  console.log('[removeTodo]', todos);
};

// 3-4. 모두 체크 및 해제 버튼
// const completeAll = (checked) => {
//   todos.map(todo => ({ ...todo, completed: checked}));
// }
const toggleCompletedAll = (checked) => {
  todos = todos.map((todo) => ({ ...todo, completed: checked }));
  console.log('[toggleCompletedAll]', todos);
};

const removeCompleted = () => {
  todos = todos.filter((todo) => !todo.completed);
  console.log('[removeCompleted]', todos);
};

// -> 이벤트 처리
window.onload = () => {
  getTodos();
  render();
};

$input.onkeyup = ({ target, keyCode }) => {
  const content = target.value.trim();
  if (content === '' || keyCode !== 13) return;

  target.value = '';
  addTodo(content);
  render();
};

$todos.onchange = ({ target }) => {
  toggleCompleted(+target.parentNode.id);
  render();
};

$todos.onclick = ({ target }) => {
  if (!target.classList.contains('remove-todo')) return;
  removeTodo(+target.parentNode.id);
  render();
};

$completeAll.onchange = ({ target }) => {
  console.log('a');
  toggleCompletedAll(target.checked);
  render();
};

$clearCompleted.onclick = () => {
  removeCompleted();
  render();
};
