let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function toggleCompletedById(id) {
 todos = todos.map((todo) => {
    if(id === todo.id) { return Object.assign(todo , {completed : !todo.completed});}
    else{ return todo; }
 })
}


toggleCompletedById(2);

console.log(todos);