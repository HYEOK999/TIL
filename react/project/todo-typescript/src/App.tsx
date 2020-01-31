import React, { useState } from 'react';
import Input from './components/Input';
import Nav from './components/Nav';
import TodosList from './components/TodosList';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false },
  ]);

  const [navs, setNavs] = useState([
    { navId: 'All', toggle: true },
    { navId: 'Active', toggle: false },
    { navId: 'Completed', toggle: false },
  ]);

  const generateId = () => {
    return Math.max(0, ...todos.map(todo => todo.id)) + 1;
  };

  const addTodo = ({ key, target }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key !== 'Enter' || (target as HTMLInputElement).value.trim() === '') return;
    setTodos([
      ...todos,
      { id: generateId(), content: (target as HTMLInputElement).value, completed: false },
    ]);
  };

  const deleteTodo = ({ target }: React.MouseEvent<HTMLElement>, id: number) => {
    if (!(target as HTMLInputElement).classList.contains('remove-todo')) return;
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const checkTodo = ({ target }: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (!(target as HTMLInputElement).classList.contains('checkbox')) return;
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const changeNav = (id: string) => {
    setNavs(
      navs.map(nav => (nav.navId === id ? { ...nav, toggle: true } : { ...nav, toggle: false })),
    );
  };

  const allCheckTodos = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setTodos(todos.map(todo => ({ ...todo, completed: target.checked })));
  };

  const allClean = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const currentNav = navs.find(nav => nav.toggle === true)?.navId;
  const _todos = todos.filter(todo => {
    return currentNav === 'All' ? todo : currentNav === 'Active' ? !todo.completed : todo.completed;
  });

  const stateNum = {
    completedNumber: todos.filter(todo => todo.completed).length,
    leftNumber: todos.filter(todo => !todo.completed).length,
  };

  return (
    <div className="container">
      <h1 className="title">Todos</h1>
      <div className="ver">2.0</div>
      <Input addTodo={addTodo} />
      <Nav navs={navs} changeNav={changeNav} />
      <TodosList todos={_todos} deleteTodo={deleteTodo} checkTodo={checkTodo} />
      <Footer stateNum={stateNum} allCheckTodos={allCheckTodos} allClean={allClean} />
    </div>
  );
};

export default App;
