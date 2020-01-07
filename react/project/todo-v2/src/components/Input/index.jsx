import React from 'react'

const InputTodo = ({addTodo}) => {
  return (
    <>
      <input className="input-todo" placeholder="What needs to be done?" autoFocus onKeyPress={({key, target}) => addTodo(key, target)}/>
    </>
  );
}

export default InputTodo;