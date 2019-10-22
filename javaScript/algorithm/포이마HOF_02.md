![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

문제 출처 : Poiema - HOF

<br/>

### 특정 요소 삭제

todos에서 삭제할 요소의 id를 인수로 전달하면 해당 요소를 삭제하는 함수를 작성하라.

```javascript
// 5. 특정 요소 삭제
let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function removeTodo(id) {
  todos = todos.filter((todo) => (todo.id == id));
}

removeTodo(2);

console.log(todos);
/*
[
  { id: 3, content: 'HTML', completed: false },
  { id: 1, content: 'Javascript', completed: false }
]
*/

```

<br/>

### 특정 요소의 프로퍼티 값 반전

todos에서 대상 요소의 id를 인수로 전달하면 해당 요소의 completed 프로퍼티 값을 반전하는 함수를 작성하라.

단, [Object.assign](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)를 사용하도록 한다.

```javascript
// 6. 특정 요소의 프로퍼티 값 반전
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function toggleCompletedById(id) {
  const result = todos.map((todo) => {
    if (todo.id == id) todo.completed = !todo.completed;
    return todo;
  });

  Object.assign(todos, result);
}

toggleCompletedById(2);

console.log(todos);
/*
[
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: false },
  { id: 1, content: 'Javascript', completed: false }
]
*/

```

<br/>

### 모든 요소의 completed 프로퍼티 값을 true로 설정

todos의 모든 요소의 completed 프로퍼티 값을 true로 설정하는 함수를 작성하라.

단, [Object.assign](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)를 사용하도록 한다.

```javascript
// 7. 모든 요소의 completed 프로퍼티 값을 true로 설정
let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function toggleCompletedAll() {
  todos = todos.map((todo) => {
    if (!todo.completed) todo.completed = !todo.completed;
    return todo;
  });
}

toggleCompletedAll();

console.log(todos);
/*
[
  { id: 3, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: true }
]
*/
```

<br/>

### completed 프로퍼티의 값이 true인 요소의 갯수 구하기

todos에서 완료(completed: true)한 할일의 갯수를 구하는 함수를 작성하라.

단, for 문, Array#forEach는 사용하지 않도록 하자.

```javascript
// 8. completed 프로퍼티의 값이 true인 요소의 갯수 구하기
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function countCompletedTodos() {
  return todos.reduce((pre, todo) => {
    if (todo.completed === true) pre++;
    return pre;
  }, 0);
}

console.log(countCompletedTodos()); // 1
```