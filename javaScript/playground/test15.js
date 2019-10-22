const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

const count = todos.reduce((pre, todo) => {
  if (todo.completed == true) pre++;
  return pre;
}, 0);

console.log(count);
