(function () {
  let todos = [];

  // DOMs
  const $inputTodo = document.querySelector('.input-todo');
  const $todos = document.querySelector('.todos');

  // todos 배열을 html로 변환한다.
  function render() {
    let html = '';

    todos.forEach(({ id, content, completed }) => {
      html += `<li id="${id}">
        <input type="checkbox" class="ckbx" ${completed ? 'checked' : ''}>
        <span> ${content} </span>
        <button class="remove">X</button>
        </li>`;
    });

    $todos.innerHTML = html;
  }

  function getTodos() {
    // 서버로부터 todos를 취득
    todos = [
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }
    ];
    render();

    // fetch('https://simple-rest-api-server.ungmo2.now.sh/todos')
    //   .then(res => res.json())
    //   .then(_todos => {
    //     todos = _todos;
    //     console.log('[getTodos]', todos);
    //     render();
    //   })
    //   .catch(e => console.error(`Failed to retrieve todos: ${e}`));
  }

  function generateId() {
    return todos.length ? Math.max(...todos.map(({ id }) => id)) + 1 : 1;
  }

  function addTodo(content) {
    todos = [{ id: generateId(), content, completed: false }, ...todos];
    render();
  }

  function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== +id);
    render();
  }

  function completeTodo(id) {
    todos = todos.map(todo => (todo.id === +id ? { ...todo, completed: !todo.completed } : todo));
    render();
  }

  $inputTodo.addEventListener('keyup', function (e) {
    if (this.value.trim() === '' || e.keyCode !== 13) return;
    addTodo(this.value);
    this.value = '';
  });

  $todos.addEventListener('click', e => {
    if (!e.target.classList.contains('remove')) return;
    removeTodo(e.target.parentNode.id);
  });

  $todos.addEventListener('change', e => {
    if (!e.target.classList.contains('ckbx')) return;
    completeTodo(e.target.parentNode.id);
  });

  window.onload = getTodos;
  // getTodos();
}());
