import React from 'react'

const ClearCompleted = ({completedAllTodo, completedCount, activeCount}) => {
  return (
    <div className="clear-completed">
      <button className="btn"  onClick={() => completedAllTodo()} >Clear completed (<span className="completed-todos">{completedCount}</span>)</button>
      <strong className="active-todos">{activeCount}</strong> items left
    </div>
  );
}

export default ClearCompleted;