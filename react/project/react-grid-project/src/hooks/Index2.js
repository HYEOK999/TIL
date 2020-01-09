import React ,{ useReducer, useCallback } from 'react';

const initialState = {
  past: [],
  present: {},
  future: []
};
const reducer = (state, action) => {
  const { past, present, future } = state;

  switch(action.type) {
    case 'UNDO' :
      const newPast = past.slice(0, past.length - 1);
      const beforePresent = past[past.length - 1];

      return {
        past: newPast,
        present: beforePresent,
        future: [present, ...future]
      };
    case 'REDO' :
      const nextPresent = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: nextPresent,
        future: newFuture
      };
    case 'SET' :
      console.log('SET');
      const { ans } = action;

      if (ans === present) {
        return state;
      }

      return {
        past : [...past, present],
        present : ans,
        future: []
      };
    case 'CLEAR' :
      console.log('CLEAR');
      return initialState;
    }
}

const useHistory = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('Render');

  const set = useCallback((ans) => {
    console.log('set fn');
    return dispatch({type: 'SET', ans});
  }, [dispatch])

  const clean = useCallback(() => {
    console.log('clean fn');
    return dispatch({type: 'CLEAR'});
  }, [dispatch])

  const undo = useCallback(() => {
    console.log('undo fn');
    return dispatch({type: 'UNDO'});
  }, [dispatch])

  const redo = useCallback(() => {
    console.log('redo fn');
    return dispatch({type: 'REDO'});
  }, [dispatch])

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  return { state : state.present, set, clean, undo, redo, canUndo, canRedo };
}

export default useHistory;