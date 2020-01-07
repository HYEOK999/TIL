MainView(상위컴포넌트) input, navigation, todolist, footer

MainView
  <div class="container">
    <h1 class="title">Todos</h1>
    <div class="ver">2.0</div>
      ㄴ Input :
          <input class="input-todo" placeholder="What needs to be done?" autofocus>
      ㄴ Navigation :
          <ul class="nav">
            <li id="all" class="active">All</li>
            <li id="active">Active</li>
            <li id="completed">Completed</li>
          </ul>
      ㄴ TodoList :
          <ul class="todos">
            <li id="myId" class="todo-item">
              <input class="custom-checkbox" type="checkbox" id="ck-myId">
              <label for="ck-myId">HTML</label>
              <i class="remove-todo far fa-times-circle"></i>
            </li>
          </ul>
      ㄴ Footer :
          <div class="footer">
            ㄴ CompleteAll :
                <div class="complete-all">
                  <input class="custom-checkbox" type="checkbox" id="ck-complete-all">
                  <label for="ck-complete-all">Mark all as complete</label>
                </div>
            ㄴ ClearCompleted :
                <div class="clear-completed">
                  <button class="btn">Clear completed (<span class="completed-todos">0</span>)</button>
                  <strong class="active-todos">0</strong> items left
                </div>
          </div>
    </div>