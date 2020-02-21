import { createStore, applyMiddleware } from 'redux';
import reducer from './modules/reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga'; // 1. import
import rootSaga from './modules/saga';
import { Map, List } from 'immutable';

// const a = { name: 'Mark', age: 38 };

// const b = a;
// b.name = 'Hanna';

// console.log(a === b);

// const object = Map({ name: 'Mark', age: 38 });

// console.log(object);

// const newObject = object.set('name', 'Hanna');

// console.log(newObject);

// console.log(object === newObject);

const list = List([
  Map({ name: 'Mark', age: 38 }),
  Map({ name: 'Hanna', age: 27 }),
]);

const first = list.get(0);

// const newList = list.setIn([1, 'age'], list.getIn([1, 'age']) + 1);
const newList = list.updateIn([1, 'age'], val => val + 1);

console.log(list === newList);
console.log(list.toJS(), newList.toJS());

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware(); // 2. saga 미들웨어 생성

const create = () => {
  const token = localStorage.getItem('token');

  const store = createStore(
    reducer(history),
    {
      auth: {
        token,
        loading: false,
        error: null,
      },
    },
    composeWithDevTools(
      applyMiddleware(thunk, routerMiddleware(history), sagaMiddleware),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default create;
