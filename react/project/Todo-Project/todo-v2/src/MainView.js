import React, { useState, useEffect } from 'react'
import './MainView.css';
import InputTodo from './components/Input';
import Navigation from './components/Navigation';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

const MainView = () => {
  const [todos, setTodos] = useState([]);
  //TODO: v1,v2
  // const [navId, setNavId] = useState('all');

  //TODO: v3
  const [navLists, setNavLists] = useState([
    {id: 1, navId:'All', toggle: true},
    {id: 2, navId:'Active', toggle: false},
    {id: 3, navId:'Completed', toggle: false}
  ]);

  useEffect(() => {
    setTodos([
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }
    ])
  }, [])

  const generatedId = () => {
    return Math.max(0, ...todos.map((todo) => todo.id)) + 1;
  }

  const addTodo = (key, target) => {
    if(key !== 'Enter' || target.value.trim() === '') return;
    setTodos([
      ...todos,
      { id : generatedId(), content: target.value, completed: false }
    ])
    target.value = '';
  }

  const checkedTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? {...todo, completed: !todo.completed} : todo)))
  }

  const removeTodo = (target, id) => {
    if(!target.classList.contains('remove-todo')) return;
    setTodos(todos.filter((todo) => (todo.id !== id)))
  }

  const allToggleTodo = (target) => {
    setTodos(todos.map((todo) => ({...todo, completed: target.checked})))
  }

  const completedAllTodo = () => {
    setTodos(todos.filter(({completed}) => (!completed)))
  }

  //TODO: v1
  // const changeNavigation = ($nav, target) => {
  //   if (target.classList.contains('nav')) return;
  //   [...$nav.current.children].forEach(($navList) => {
  //     $navList.classList.toggle('active', $navList.id === target.id);
  //     setNavId(target.id);
  //   });
  // }

  //TODO: v2
  // const changeNavigation = ($nav, target) => {
  //   [...$nav.current.children].forEach(($navList) => {
  //     $navList.classList.toggle('active', $navList.id === target.id);
  //     setNavId(target.id);
  //   });
  // }

  //TODO: v3
  const changeNavigation = (id) => {
    setNavLists(navLists.map((navList) => id === navList.id ? {...navList, toggle:true} : {...navList, toggle:false}))
  }

  //TODO: v1,v2
  // const _todos = todos.filter((todo) => navId === 'all' ? todo : navId === 'active' ? !todo.completed : todo.completed)

  //TODO: v3
  const _todos = todos.filter((todo) => navLists[0].toggle ? todo : navLists[1].toggle ? !todo.completed : todo.completed)
  const completedCount = _todos.filter(({completed}) => completed).length
  const activeCount = _todos.filter(({completed}) => !completed).length

  return (
    <div className="container">
      <h1 className="title">Todos</h1>
      <div className="ver">2.0</div>
      <InputTodo addTodo={addTodo}/>
      <Navigation changeNavigation={changeNavigation} navLists={navLists}/>
      <TodoList todos={_todos} checkedTodo={checkedTodo} removeTodo={removeTodo}/>
      <Footer allToggleTodo={allToggleTodo} completedAllTodo={completedAllTodo} completedCount={completedCount} activeCount={activeCount}/>
    </div>
  );
}

export default MainView;