import React from 'react'

const CompleteAll = ({allToggleTodo}) => {
  return (
    <div className="complete-all">
      <input className="custom-checkbox" type="checkbox" id="ck-complete-all" onClick={({target}) => allToggleTodo(target)} />
      <label htmlFor="ck-complete-all">Mark all as complete</label>
    </div>
  );
}

export default CompleteAll;