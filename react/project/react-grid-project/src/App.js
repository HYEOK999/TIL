// import React, {useEffect, useState, useReducer, useRef} from 'react'
// import { useHistory } from './hooks'
// import './styles.scss'

// const App = (props) => {
//   const { state, set, undo, redo, clear, canUndo, canRedo } = useHistory({});

//   return (
//     <>
//       {
//         ((blocks, i, len) => {
//           // i가 정의된 길이 이하일 경우 반복한다.
//           while(++i <= len) {
//             const index = 1;
//             blocks.push(
//               <div
//                 className={'block' + (state[index] ? 'active' : '')}
//                 onClick={()=> set({...state, [index]: !state[index]})}
//               >

//               </div>
//             )
//           }
//         })([], 0, 625) //IIFE(즉시 실행 함수)로 작성하다.
//       }
//     </>
//   );
// }

// export default App;