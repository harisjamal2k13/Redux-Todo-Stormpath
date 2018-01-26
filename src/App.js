import React from 'react';
import ReactDOM from 'react-dom';
import { addTodo, completeTodo, deleteTodo } from './actions';
import { createStore } from 'redux';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { connect } from 'react-redux';



var defaultState = {
  todo: {
    items: []
  }
};

// Add the actions here that we created in the previous steps...

function todoApp(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      var newState = Object.assign({}, state);
 
      newState.todo.items.push({
        message: action.message,
        completed: false
      });
 
      return newState;
 
    case 'COMPLETE_TODO':
      var newState = Object.assign({}, state);
 
      newState.todo.items[action.index].completed = true;
 
      return newState;
 
    case 'DELETE_TODO':
      var items = [].concat(state.todo.items);
 
      items.splice(action.index, 1);
 
      return Object.assign({}, state, {
        todo: {
          items: items
        }
      });
 
    case 'CLEAR_TODO':
      return Object.assign({}, state, {
        todo: {
          items: []
        }
      });
 
    default:
      return state;
  }
  // Add the reducer logic that we added in the previous steps...
}

var store = createStore(todoApp, defaultState);

export class AddTodoForm extends React.Component {
  state = {
    message: ''
  };

  onFormSubmit(e) {
    e.preventDefault();
    store.dispatch(addTodo(this.state.message));
    this.setState({ message: '' });
  }

  onMessageChanged(e) {
    var message = e.target.value;
    this.setState({ message: message });
  }

  render() {
    return (
      <div>
          <form onSubmit={this.onFormSubmit.bind(this)}>
        <input type="text" placeholder="Todo..." className="form-control"  onChange={this.onMessageChanged.bind(this)} value={this.state.message} />
        <input type="submit" className='btn btn-primary mb-2' value="Add" />
      </form>
      </div>
     );
  }
}

class TodoItem extends React.Component {
  onDeleteClick() {
    store.dispatch(deleteTodo(this.props.index));
  }

  onCompletedClick() {
    store.dispatch(completeTodo(this.props.index));
  }

  render() {
    return (
    <center>
      <li>
        <form href="#" className="form-control"  onClick={this.onCompletedClick.bind(this)} style={{ textDecoration: this.props.completed ? 'line-through' : 'none' }}>{this.props.message.trim()}</form>
        <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this)} style={{ textDecoration: 'none' }}>Delete</button>
      </li>
   </center>
    );
  }
}

export class TodoList extends React.Component {
  state = {
    items: []
  };

  componentWillMount() {
    store.subscribe(() => {
      var state = store.getState();
      this.setState({
        items: state.todo.items
      });
    });
  }
  render() {
    var items = [];

    this.state.items.forEach((item, index) => {
      items.push(<TodoItem
        key={index}
        index={index}
        message={item.message}
        completed={item.completed}
      />);
    });

    if (!items.length) {
      return (
        <p>
          <i>Please add something to do.</i>
        </p>
      );
    }

    return (
      <ol>{items}</ol>
    );
  }
}

// ReactDOM.render(
//   <div>
//     <h1>Todo</h1>
//     <AddTodoForm />
//     <TodoList />
//   </div>,
//   document.getElementById('container')
// );
