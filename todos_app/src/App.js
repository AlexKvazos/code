import React, { useState, useEffect } from 'react';
import './App.css';
import TodosList from './components/TodosList/TodosList';
import NewTodo from './components/NewTodo/NewTodo';


const App = () => {
  const [appState, setAppState] = useState({
    todos: []
  });

  useEffect(() => {
    const apiUrl = `http://jsonplaceholder.typicode.com/todos`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((resp) => {
        setAppState({ todos: resp.slice(0, 9) });
      });
  }, [setAppState]);

  const addNewTodoHandler = newTodo => {
    setAppState((todos) => appState.todos.concat(newTodo));
  };

  return (<div>
    <NewTodo onAddTodo={addNewTodoHandler}></NewTodo>
    <TodosList todos={appState.todos}></TodosList>
  </div>
  );
}

export default App;