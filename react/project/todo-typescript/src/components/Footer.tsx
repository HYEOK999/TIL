import React from 'react';

type Props = {
  stateNum: {
    completedNumber: number;
    leftNumber: number;
  };
  allCheckTodos: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allClean: () => void;
};

const Footer = ({ stateNum, allCheckTodos, allClean }: Props) => {
  return (
    <footer className="footer">
      <div className="complete-all">
        <input
          className="custom-checkbox"
          type="checkbox"
          id="ck-complete-all"
          onChange={e => allCheckTodos(e)}
        />
        <label htmlFor="ck-complete-all">Mark all as complete</label>
      </div>
      <div className="clear-completed">
        <button className="btn" onClick={allClean}>
          Clear completed (<span className="completed-todos">{stateNum.completedNumber}</span>)
        </button>
        <strong className="active-todos">{stateNum.leftNumber}</strong> items left
      </div>
    </footer>
  );
};

export default Footer;
