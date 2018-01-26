import React from 'react';
import ReactDOM from 'react-dom';
import {addTodo,completeTodo,deleteTodo} from './actions';
import { createStore } from 'redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { connect } from 'react-redux';
import {AddTodoForm,TodoList} from './App'

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

ReactDOM.render(
   <div className="container bg-color">
<center>

      <h1>Redux Todo App <h3>By Haris Jamal</h3></h1>
      <AddTodoForm />
      <TodoList />
   </center>
    </div>,
    document.getElementById('root')
  );
  