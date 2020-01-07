import React from 'react'

const Todos = ({todos, checkedTodo, removeTodo}) => {
  return (
    <ul className="todos">
      {
        todos.map((todo) => (
          <li id={todos.id} className="todo-item" key={todo.id}>
            <input className="custom-checkbox" type="checkbox" id={`ck-${todo.id}`} onChange={() => checkedTodo(todo.id)} checked={todo.completed} />
            <label htmlFor={`ck-${todo.id}`}>{todo.content}</label>
            <i className="remove-todo far fa-times-circle" onClick={({target}) => removeTodo(target, todo.id)}></i>
          </li>
        ))
      }
    </ul>
  );
}

export default Todos;