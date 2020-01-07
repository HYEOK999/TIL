import React from 'react';
import './App.css';

const App = () => {
  return (
      <div className="container">
        <h1 className="title">Todos</h1>
        <div className="ver">2.0</div>
        <input className="input-todo" placeholder="What needs to be done?" autoFocus />
        <ul className="nav">
          <li id="all" className="active">All</li>
          <li id="active">Active</li>
          <li id="completed">Completed</li>
        </ul>

        <ul className="todos">
          <li id="myId" className="todo-item">
            <input className="custom-checkbox" type="checkbox" id="ck-myId" />
            <label htmlFor="ck-myId">HTML</label>
            <i className="remove-todo far fa-times-circle"></i>
          </li>
        </ul>
        <div className="footer">
          <div className="complete-all">
            <input className="custom-checkbox" type="checkbox" id="ck-complete-all" />
            <label htmlFor="ck-complete-all">Mark all as complete</label>
          </div>
          <div className="clear-completed">
            <button className="btn">Clear completed (<span className="completed-todos">0</span>)</button>
            <strong className="active-todos">0</strong> items left
          </div>
        </div>
      </div>
  );
}

export default App;