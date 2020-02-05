import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// const middleware1 = store => {
//   console.log(store);
//   return next => {
//     // next 는 dispatch
//     return action => {
//       console.log('middleware1 - dispatch 되기전', 1, action);
//       const value = next(action);
//       console.log('middleware2 - dispatch 된 후', 2, action);
//       return value;
//     };
//   };
// };

// const middleware2 = store => {
//   console.log(store);
//   return next => {
//     // next 는 dispatch
//     return action => {
//       console.log('middleware1 - dispatch 되기전', 1, action);
//       const value = next(action);
//       console.log('middleware2 - dispatch 된 후', 2, action);
//       return value;
//     };
//   };
// };

export default function create(initialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );
}
