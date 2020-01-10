// src/hooks/useHistory.js : 커스텀 훅
import {useReducer, useCallback} from 'react'

const initialState = {
  past : [],
  present : {},
  future : []
}

const reducer = (state, action) => {
  const {past, present, future} = state;

  switch(action.type) {
    case 'SET' :

      if (action.toggle === present) return state;

      return {
        past : [...past, present],
        present : action.toggle,
        future : []
      };
    case 'UNDO' :
      const newPast = past.slice(0, -1);
      const beforePresent = past[past.length - 1];

      return {
        past : newPast,
        present : beforePresent,
        future : [present, ...future]
      };
    case 'REDO' :
      const newFuture = future.slice(1);
      const nextPresent = future[0];

      return {
        past : [...past, present],
        present : nextPresent,
        future : newFuture
      };
    case 'CLEAN' : return initialState;
    default : return initialState;
  }
}

const useHistory = (NowValue) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const canUndo = state.past.length === 0;
  const canRedo = state.future.length === 0;

  const set = useCallback((toggle) => {
    return dispatch({type: 'SET', toggle})
  }, [dispatch]);

  const clean = useCallback(() => {
    return dispatch({type: 'CLEAN'})
  }, [dispatch]);

  const undo = useCallback(() => {
    if(!canUndo) dispatch({type: 'UNDO'})
  }, [canUndo, dispatch]);

  const redo = useCallback(() => {
    if(!canRedo) dispatch({type: 'REDO'})
  }, [canRedo, dispatch]);


  return {state : state.present, set, clean, undo, redo, canUndo, canRedo}
}

export default useHistory;