import React, {useState} from 'react'
import './styles.scss'
import useHistory from './hooks/Index2';

const Test = (props) => {
  const { state, set, clean, undo, redo, canUndo, canRedo } = useHistory();

  return (
  // 렌더링 되는 요소, JSX부분 완성
    <div className="container">
      <div className="controls">
        <button onClick={() => undo()} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={() => redo()} disabled={!canRedo}>
          Redo
        </button>
        <button onClick={() => clean()}>Clear</button>
      </div>

      <div className="grid">
        {
          ((blocks, i, len) => {
            while(++i <= len) {
              const index = i;
              blocks.push(
                <div
                  className={'block' + (state[index] ? ' active' : '')} // space가 반드시 필요하다. ' active'
                  onClick={() => set({ ...state, [index]: !state[index] })}
                  key = {i}
                />
              )
            }
            return blocks;
          })([], 0, 625)
        }
      </div>
    </div>
  );
}

export default Test;