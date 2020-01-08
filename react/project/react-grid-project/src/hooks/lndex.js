// hook들을 모아둔다. (커스텀)
import { useReducer, useCallback } from 'react';

// 초기상태 작성
const initialState = {
  past : [], //  과거의 값을 저장하기 위한
  present: null, // 현재의 값을 저장하기 위한
  future: [] // 현재 기준 미래의 값을 저장하기 위한
};

// 초기 상태 작성
export function useUndo (initialPresent) {
  //initialPresent :
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    present: initialPresent
  });
}