// src/Main.js : 상위 컴포넌트
import React from 'react'
import useHistory from './hooks/useHistory'
import './styles.scss'

const Main = () => {
  const {state, set, clean, undo, redo, canUndo, canRedo} = useHistory();

  return (
  <div className="container">
    <div className="controls">
      <button onClick={() => undo()} disabled={canUndo}>
        Undo
      </button>
      <button onClick={() => redo()} disabled={canRedo}>
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
                key = {i}
                className = {'block' + (state[index] ? ' active' : '')}
                onClick = {() => set({...state, [index] : !state[index] })}
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

export default Main;

