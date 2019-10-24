// 4. 새로운 요소 추가
let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

// function addTodo(newTodo) {
//   todos = [newTodo].concat(todos);
// }

function addTodo(newTodo) {
  todos = [newTodo, ...todos];
}


// function addTodo(newTodo) {
//   todos.unshift(newTodo);
// }

// function addTodo(newTodo) {
//   Object.assign(todos, todos.reduce((pre, todo) => pre.concat(todo), [newTodo]));
// }

addTodo({ id: 4, content: 'Test', completed: false });

console.log(todos);
/*
[
  { id: 4, content: 'Test', completed: false },
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
]
*/
