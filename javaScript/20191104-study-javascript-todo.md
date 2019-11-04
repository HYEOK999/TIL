![to-do](https://user-images.githubusercontent.com/31315644/67931586-8cdf6f00-fc05-11e9-9549-3642a1b8805a.jpg)

----------

# JavaScript Study 20

## TODO-LIST 

<br/>

### Todo List V.01  

~~~html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>Todo List V.01</title>
  <style>
     .cb:checked + .content {
       text-decoration: line-through;
     }
  </style>
</head>
<body>
  <input class="input">
  <ul class="todos"></ul>
</body>
<script>
  const $input = document.querySelector('.input');
  const $todos = document.querySelector('.todos');

  $input.addEventListener('keydown', function (e) {
    if (e.keyCode !== 13 || $input.value.trim() === '') return;
    $todos.innerHTML += `<li>
        <label>
          <input type="checkbox" class="cb">
          <span class="content">${$input.value}</span>
        </label>
        <button class="remove">X</button>
      </li>`;
    $input.value = '';
  });

  $todos.addEventListener('click', function (e) {
    if (!e.target.classList.contains('remove')) return;
    this.removeChild(e.target.parentNode);
  });
</script>
</html>
~~~

#### 주요 코드

1. `document.querySelector()` : css셀렉터 문법을 이용하여 해당 요소에 접근 하기 위해 사용.

~~~javascript
const $input = document.querySelector('.input');
const $todos = document.querySelector('.todos');
~~~

<br/>

2. `$input.addEventListener( 'keydown', function (e) { ... })` :

   키보드를 통해 입력을 받을 수 있게 'keydown' 이벤트를 이용하였음.

   엔터키(13번) 혹은 입력받는 문자열이 빈문자열 일 경우 해당 이벤트는 실행되지 않도록 조건함.

   조건에 해당 될 경우 `$todos` innerHTML 프로퍼티를 이용하여 html 소스 코드를 추가함.

   마지막에 input 창을 비워줘야되기 때문에 $input.value를 비워줌.

~~~html
$input.addEventListener('keydown', function (e) {
    if (e.keyCode !== 13 || $input.value.trim() === '') return;
    $todos.innerHTML += `<li>
        <label>
          <input type="checkbox" class="cb">
          <span class="content">${$input.value}</span>
        </label>
        <button class="remove">X</button>
      </li>`;
    $input.value = '';
  });
~~~

추가로 css 가로줄을 넣는다.

 생성된 `<li>`들을 체크할 경우  `<li>` 내에 있는 `<input>`의 어트리뷰트로 `checked` 상태인지 파악한다. `checked`라면 `<input><span>` 태그에 가로 줄을 그어넣는다.

~~~css
<style>
  .cb:checked + .content {
    text-decoration: line-through;
  }
</style>
~~~

<br/>

3. `$todos.addEventListener( 'keydown', function (e){ ... })` :

   2번에서 만들어진 `<button class="remove">X</button>`에 접근하기 위해서 상위 부모인 todos에서 부터 접근함. 

   이유는 코드 순서상 해당 버튼에 대한 변수를 만들어서 접근을 할 수 없기 때문임.

   따라서, 실제로 이벤트를 발생한 요소를 가리키는 Event.target을 이용하여 클릭된 요소의 클래스명에 `remove`라는 클래스 명이 있는 지 조건한다.

   해당 조건으로 `<ul>`의 자식 중 클릭된 해당 `<button>` 요소의 부모(`<li>`)를 제거한다.

~~~javascript
$todos.addEventListener('click', function (e) {
    if (!e.target.classList.contains('remove')) return;
    this.removeChild(e.target.parentNode);
  });
~~~

<br/>

<br/>

<br/>

---------

### Todo List V.02

~~~html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>Todo List V02</title>
  <style>
    .check-box:checked + span {
      text-decoration: line-through;
    }
  </style>
</head>
<body>
  <input class="input">
  <ul class="todos"></ul>
</body>
<script>
  let todos = [];

  const $input = document.querySelector('.input');
  const $todos = document.querySelector('.todos');

  function render() {
    let html = '';

    todos.forEach((todo) => {
      html += `
      <li id=${todo.id}>
        <label>
          <input type="checkbox" class="check-box" ${todo.completed ? 'checked' : ''}>
          <span>${todo.content}</span>
        </label>
        <button class="remove">X</button>
      </li>
      `;
    });
    $todos.innerHTML = html;
    console.log(todos);
  }

  const getTodos = function () {
    // TODO: 서버로부터 데이터를 취득.
    todos = [
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }
    ];
    render();
  };

  function findMaxId() {
    return Math.max(0, ...todos.map((todo) => todo.id));
  }

  const addTodos = function (e) {
    if (e.keyCode !== 13 || $input.value.trim() === '') return;

    todos = [...todos, { id: findMaxId() + 1, content: $input.value, completed: false }];
    $input.value = '';

    render();
  };

  const removeTodos = function (e) {
    if (!e.target.classList.contains('remove')) return;

    const listId = +(e.target.parentNode.id);
    todos = todos.filter((todo) => todo.id !== listId);

    // Id 재정렬
    if (todos.length !== findMaxId()) {
      todos = todos.map((todo, index) => ({ ...todo, id: index + 1 }));
    }
    render();
  };

  const toggleTodos = function (e) {
    const listId = +(e.target.parentNode.parentNode.id);
    todos = todos.map((todo) => (
      todo.id === listId ? { ...todo, completed: !todo.completed } : todo));

    render();
  };

  window.onload = getTodos;
  $input.onkeydown = addTodos;
  $todos.onclick = removeTodos;
  $todos.onchange = toggleTodos;
</script>
</html>
~~~

#### 주요 코드

1. `let todos = [];`

   `const $input = document.querySelector('.input');`
   `const $todos = document.querySelector('.todos');`

   todos는 백단으로부터 받아온 데이터를 받기 위해 만든 변수이다.

   또한 각 요소들에게 접근하기 위해서 `<ul>`태그의 `$todos` 와 `<input>` 태그의 `$input` 라는 변수를 만들고 `querySelector()` 를 통해 접근한다.

2. `const getTodos = function () {...};`

   1번에서 만든 todos의 변수에 백단으로부터 받을 변수를 담기위한 과정을 넣은 함수를 작성한다.

   해당 함수는 4번에서 이벤트 핸들러로 인해 콜백 될 것이다.

   ~~~javascript
     const getTodos = function () {
       // TODO: 서버로부터 데이터를 취득.
       todos = [
         { id: 1, content: 'HTML', completed: false },
         { id: 2, content: 'CSS', completed: true },
         { id: 3, content: 'Javascript', completed: false }
       ];
       render();
     };
   ~~~

3. ` function render() {...}`

   2번에서 마지막에 작성한 `render()`를 작성한다.

   `render()`는 직접적으로 가지고온 todos 데이터를 화면에 뿌리기 위해서 (View역할) innerHTML 프로퍼티를 이용하여 작성한다. 여기서 주의할 것은 위에서 선언한 변수 $todos를 통해 DOM요소에 직접적으로 접근하여 innertHTML을 하여서는 안된다. 이유는 그럴 경우 todos의 데이터만큼 뷰 페이지가 다시 렌더링 되는 것이므로 리소스를 많이 잡아먹는다.

   ~~~javascript
   function render() {
       let html = '';
   
       todos.forEach((todo) => {
         html += `
         <li id=${todo.id}>
           <label>
             <input type="checkbox" class="check-box" 
   						${todo.completed ? 'checked' : ''}>
             <span>${todo.content}</span>
           </label>
           <button class="remove">X</button>
         </li>
         `;
       });
       $todos.innerHTML = html;
       console.log(todos);
     }
   ~~~

4. `window.onload = getTodos;`

   처음으로 .html 파일을 열었을 경우, 웹페이지의 로드가 완료되었을 때 `getTodos` 함수를 실행한다.

   `getTodos`함수에는 `render()`도 호출되므로 페이지가 렌더링 된다.

5. ` $input.onkeydown = addTodos;`

   키보드 버튼이 눌러지고 떼졌을 때 `addTodos` 를 실행한다.

6. `const addTodos = function (e) {...}`

   엔터키(13번) 혹은 입력받는 문자열이 빈문자열 일 경우 해당 이벤트는 실행되지 않도록 조건함.

   조건에 해당 될 경우 todos배열에 새로운 배열 값을 추가하는 작업을 한다.

   마지막에 input 창을 비워줘야되기 때문에 $input.value를 비워줌.

   ~~~javascript
   const addTodos = function (e) {
       if (e.keyCode !== 13 || $input.value.trim() === '') return;
   
       todos = [...todos, { id: findMaxId() + 1, content: $input.value, completed: false }];
       $input.value = '';
   
       render();
     };
   
   ~~~

   추가 새로운 배열을 추가할 떄 아이디값을 채번 해야한다.

   채번하는 과정은 새로운 함수를 만들어서 진행한다.

   ~~~javascript
    function findMaxId() {
       return Math.max(0, ...todos.map((todo) => todo.id));
     }
   
   ~~~

7. ` $todos.onclick = removeTodos;`

   삭제 버튼을 눌렀을 경우 할일 목록 중 일부가 사라지기 위해서 `removeTodo`를 실행한다.

8. `const removeTodos = function (e) {...}`

   3번에서 만들어진 `<button class="remove">X</button>`에 접근하기 위해서 상위 부모인 todos에서 부터 접근함. 

   이유는 코드 순서상 해당 버튼에 대한 변수를 만들어서 접근을 할 수 없기 때문임.

   따라서, 실제로 이벤트를 발생한 요소를 가리키는 Event.target을 이용하여 클릭된 요소의 클래스명에 `remove`라는 클래스 명이 있는 지 조건한다.

   아이디값을 비교하여 해당 아이디를 제외하고 나머지값을 새로운 배열로 추가하는 코드를 `filter`를 이용하여 작성한다.

   `filter` 후에 만들어진 todos를 이용하여 아이디값을 재정렬한다. 

   그 때 `Id`의 최댓값이 필요하므로 6번에서 만들어 놓은 `findMaxId()`를 이용한다.

   ~~~javascript
   const removeTodos = function (e) {
       if (!e.target.classList.contains('remove')) return;
   
       const listId = +(e.target.parentNode.id);
       todos = todos.filter((todo) => todo.id !== listId);
   
       // Id 재정렬
       if (todos.length !== findMaxId()) {
         todos = todos.map((todo, index) => ({ ...todo, id: index + 1 }));
       }
       render();
     };
   
   ~~~

9. `$todos.onchange = toggleTodos;`

   체크박스를 선택할 경우 todos 배열의 completed를 바꾸고 해당 값을 통해 선이 그어지도록 설정한다. 

   해당 함수는 toggleTodos이다.

10. `  const toggleTodos = function (e) {...}`

    todos내부의 객체에 있는 completed값을 반전 시켜야되므로 `map `고차함수를 이용하여 id값을 매칭해 해당 completed값만 반전시킨다.

    ~~~javascript
    const toggleTodos = function (e) {
        const listId = +(e.target.parentNode.parentNode.id);
        todos = todos.map((todo) => (
          todo.id === listId ? { ...todo, completed: !todo.completed } : todo));
    
        render();
      };
    
    ~~~

    