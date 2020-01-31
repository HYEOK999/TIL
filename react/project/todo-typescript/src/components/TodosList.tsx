import React from 'react';

type Props = {
  todos: {
    id: number;
    content: string;
    completed: boolean;
  }[];
  deleteTodo: (event: React.MouseEvent<HTMLElement>, id: number) => void;
  checkTodo: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
};

const TodosList = ({ todos, deleteTodo, checkTodo }: Props) => {
  return (
    <ul className="todos">
      {todos.map(todo => (
        <li id={todo.id + ''} className="todo-item" key={todo.id}>
          <input
            className="custom-checkbox"
            type="checkbox"
            id={`ck-${todo.id}`}
            onChange={e => checkTodo(e, todo.id)}
            checked={todo.completed}
          />
          <label htmlFor={`ck-${todo.id}`}>{todo.content}</label>
          <i className="remove-todo far fa-times-circle" onClick={e => deleteTodo(e, todo.id)}></i>
        </li>
      ))}
    </ul>
  );
};

export default TodosList;
