import React from 'react';

type Props = {
  addTodo: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Input = ({ addTodo }: Props) => {
  return (
    <input
      className="input-todo"
      placeholder="What needs to be done?"
      onKeyPress={e => addTodo(e)}
      autoFocus
    />
  );
};

export default Input;
