import React from 'react'
import CompleteAll from './CompleteAll'
import ClearCompleted from './ClearCompleted';

const Footer = ({allToggleTodo, completedAllTodo, completedCount, activeCount}) => {
  return (
    <div className="footer">
      <CompleteAll allToggleTodo={allToggleTodo}></CompleteAll>
      <ClearCompleted completedAllTodo={completedAllTodo} completedCount={completedCount} activeCount={activeCount}></ClearCompleted>
    </div>
  );
}

export default Footer;