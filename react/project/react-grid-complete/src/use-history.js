import { useReducer, useCallback } from 'react';

const initialState = {
  past: [],
  present: null,
  future: []
};

// 2번 작성,
const reducer = (state, action) => {
  const { past, present, future } = state;

  switch (action.type) {
    case 'UNDO':
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      };

    case 'REDO':
      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture
      };
    case 'SET':
      const { newPresent } = action;

      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      };
    case 'CLEAR':
      const { initialPresent } = action;

      return {
        ...initialState,
        present: initialPresent
      };
  }
};

const useHistory = initialPresent => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    present: initialPresent
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  // useCallback 을 빼면 엄청난 과부하가 일어난다.
  const undo = useCallback(
    () => {
      if (canUndo) {
        dispatch({ type: 'UNDO' });
      }
    },
    [canUndo, dispatch]
  );

  const redo = useCallback(
    () => {
      if (canRedo) {
        dispatch({ type: 'REDO' });
      }
    },
    [canRedo, dispatch]
  );

  // 리듀서를 사용이유

  const set = useCallback(newPresent => {
    console.log('aaa');
    return dispatch({ type: 'SET', newPresent })
  }, [dispatch]);

  const clear = useCallback(() => dispatch({ type: 'CLEAR', initialPresent }), [
    dispatch
  ]);
  console.log('dispatch는 ', dispatch)
  return { state: state.present, set, undo, redo, clear, canUndo, canRedo };
};

export default useHistory;