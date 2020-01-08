import React, { createRef, Component } from 'react'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos : [],
      navId : 'all'
    };
    this.nav = createRef();
    // this.cleanTodos = this.cleanTodos.bind(this);
  }

  componentDidMount() {
    let todos = [
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }
    ]
    this.setState({
      todos : [...this.state.todos, ...todos]
    })
  }

  generateId() {
    return Math.max(0, ...this.state.todos.map((todo) => todo.id)) + 1;
  }

  addTodo(key, target) {
    if (target.value.trim() === '' || key !== 'Enter') return;
    let todo = { id: this.generateId() , content: target.value, completed: false};
    this.setState(() => ({
      todos : [...this.state.todos, todo]
    }))
    target.value = '';
  }

  removeTodo(target, id) {
    if(target.classList[0] !== 'remove-todo') return
    this.setState({
      todos : this.state.todos.filter((todo) => todo.id !== id)
    });
  }

  checkTodo(target, id){
    if(target.classList[0] !== 'custom-checkbox') return;
    this.setState({
      todos : this.state.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    })
  }

  toggleTodos(target) {
    this.setState({
      todos : this.state.todos.map((todo) => ({ ...todo, completed: target.checked}))
    })
  }

  cleanTodos() {
    this.setState({
      todos : this.state.todos.filter((todo) => (!todo.completed))
    })
  }

  changeNav(target) {
    if (target.classList.contains('nav')) return;
    [...this.nav.current.children].forEach((navList) => {
      navList.classList.toggle('active', navList.id === target.id);
      this.setState({
        navId : target.id
      })
    });
  }

  render() {
    console.log(this.state);
    const _todos = this.state.todos.filter(({ completed }) => (this.state.navId === 'all' ?  true : this.state.navId === 'active' ? !completed : completed));
    const completedCount = _todos.filter(({ completed }) => completed).length;
    const activeCount = _todos.filter(({ completed }) => !completed).length;

    return (
      <div className="container">
        <h1 className="title">Todos</h1>
        <div className="ver">2.0</div>
        <input className="input-todo" placeholder="What needs to be done?" autoFocus onKeyPress={({key, target}) => this.addTodo(key, target)} />
        <ul className="nav" ref={this.nav} onClick={({target}) => this.changeNav(target)}>
          <li id="all" className="active">All</li>
          <li id="active">Active</li>
          <li id="completed">Completed</li>
        </ul>
        <ul className="todos">
          {
            _todos.map((todo) => (
              <li id={todo.id} className="todo-item" key={todo.id}>
                <input
                  className="custom-checkbox"
                  type="checkbox"
                  onChange={({target}) => this.checkTodo(target, todo.id)}
                  id={`ck-${todo.id}`}
                  checked={todo.completed}
                />
                <label htmlFor={`ck-${todo.id}`}>{todo.content}</label>
                <i className="remove-todo far fa-times-circle" onClick={({target}) => this.removeTodo(target, todo.id)}></i>
              </li>
            ))
          }
        </ul>
        <div className="footer">
          <div className="complete-all">
            <input className="custom-checkbox" type="checkbox" id="ck-complete-all" onClick={({target}) => this.toggleTodos(target)}/>
            <label htmlFor="ck-complete-all">Mark all as complete</label>
          </div>
          <div className="clear-completed">
            <button className="btn" onClick={() => this.cleanTodos}>Clear completed (<span className="completed-todos">{completedCount}</span>)</button>
            <strong className="active-todos">{activeCount}</strong> items left
          </div>
        </div>
    </div>
    );
  }
}

export default App;
