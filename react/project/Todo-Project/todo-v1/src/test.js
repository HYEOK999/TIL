import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this));
    this.state = {
      todos: [
        {
          id: 1,
          content: 'HTML',
          completed: false
        },
        {
          id: 2,
          content: 'CSS',
          completed: true
        },
        {
          id: 3,
          content: 'JavaScript',
          completed: false
        }
      ],
      navState: 'all',
      _todos: [],
    };
    this.state._todos = this.state.todos;
  }

  generateId = () => {
    return this.state.todos.length ? Math.max(...this.state.todos.map(todo => todo.id)) + 1 : 1;
  }

  addTodo = e => {
    if (e.key === 'Enter') {
      this.setState({
        todos: [...this.state.todos, {
          id: this.generateId(),
          content: e.target.value,
          completed: false
        }],
      })
      this.setState((prevState) => ({
        _todos: [...prevState.todos]
      }))
    }
  }

  removeTodo = id => {
    const { todos } = this.state;
    console.log(id);
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
    this.setState({
      _todos: this.state.todos
    })
  }

  toggleTodo = id => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
    })
    this.setState({
      _todos: this.state.todos
    })
  }

  toggleCompletedAll = () => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map(todo => ({...todo, completed: true}))
    })
    this.setState({
      _todos: this.state.todos
    })
  }

  removeTodoAll = () => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => !todo.completed)
    })
    this.setState({
      _todos: this.state.todos
    })
  }

  // selectState = (e) => {
  //   const id = e.target.id;
  //   const { todos } = this.state;
  //   this.setState({
  //     _todos: todos
  //   })
  //   const { _todos } = this.state;

  //   if (id === 'completed') {
  //     this.setState({
  //       _todos: todos.filter(todo => todo.completed)
  //     })
  //   } else if (id === 'active') {
  //     this.setState({
  //       _todos: todos.filter(todo => !todo.completed)
  //     })
  //   } else {
  //     this.setState({
  //       _todos: todos
  //     })
  //   }
  //   return _todos;
  // }

  addStyle = e => {
    if(e.target.classList.contains('nav')) return;
    console.log('abc');
    const navChildren = e.target.parentNode.children;
    const id = e.target.id;
    console.log(id);
    [...navChildren].forEach(navItem => {
      navItem.classList.toggle('active', navItem.id === id)});

    this.setState({
      navState: id,
    })
  }

  render() {
    // console.log(this.state.todos);
    // console.log(this.state._todos);
    console.log('aa', this.state.todos);
    return (
      <div className="container">
        <h1 className="title">Todos</h1>
        <div className="ver">2.0</div>

        <input
          className="input-todo"
          placeholder="What needs to be done?"
          onKeyPress={this.addTodo}
          autoFocus
        />

        <ul className="nav" onClick={this.addStyle}>
          <li id="all" className="active">All</li>
          <li id="active">Active</li>
          <li id="completed">Completed</li>
        </ul>

        <ul className="todos">
          {this.state._todos.map(todo => <li id={todo.id} key={todo.id} className="todo-item">
                <input
                  className="custom-checkbox"
                  type="checkbox"
                  id={`ck-${todo.id}`}
                  checked={todo.completed}
                  onChange={() => this.toggleTodo(todo.id)}
                />
                  <label htmlFor={`ck-${todo.id}`}>{todo.content}</label>
                  <i className="remove-todo far fa-times-circle" onClick={() => this.removeTodo(todo.id)}></i>
          </li>)}
        </ul>
        <div className="footer">
          <div className="complete-all">
            <input className="custom-checkbox" type="checkbox" id="ck-complete-all" onChange={this.toggleCompletedAll}/>
            <label htmlFor="ck-complete-all">Mark all as complete</label>
          </div>
          <div className="clear-completed">
    <button className="btn" onClick={this.removeTodoAll}>Clear completed (<span className="completed-todos">{this.state.todos.filter(todo => todo.completed).length}</span>)</button>
            <strong className="active-todos">{this.state.todos.filter(todo => !todo.completed).length}</strong> items left
        </div>
        </div>
      </div>
    )
  };
}

export default App;