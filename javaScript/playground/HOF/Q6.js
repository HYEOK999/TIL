// 6. 특정 요소의 프로퍼티 값 반전
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function toggleCompletedById(id) {
  const result = todos.map((todo) => {
    if (todo.id == id) todo.completed = !todo.completed;
    // if (todo.id == id) ...todo , {...todo, completed: !todo.completed};
    return todo;
  });

  Object.assign(todos, result);
}

toggleCompletedById(2);

console.log(todos);
/*
[
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: false },
  { id: 1, content: 'Javascript', completed: false }
]
*/
