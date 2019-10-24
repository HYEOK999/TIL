// 3. 프로퍼티 정렬
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

// function sortBy(key) {
//   return todos.slice(0, todos.length).sort(
//     (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0))
//   );
// }

// function sortBy(key) {
//   return Array.prototype.apply(todos).sort(
//     (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0))
//   );
// }

// function sortBy(key) {
//   return todos.concat().sort(
//     (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0))
//   );
// }

function sortBy(key) {
  return [...todos].sort(
    (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0))
  );
}

// function sortBy(key) {
//   var arr = Array.apply(null, todos);
//   return arr.sort((a, b) => a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0));
// }

console.log(sortBy('id'));
/*
[
  { id: 1, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'HTML', completed: false }
]
*/
console.log(sortBy('content'));
/*
[
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false }
]
*/
console.log(sortBy('completed'));
/*
[
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true }
]
*/
