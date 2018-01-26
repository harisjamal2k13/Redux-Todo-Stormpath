export function addTodo(message) {
    return {
      type: 'ADD_TODO',
      message: message,
      completed: false
    };
  }

  export function completeTodo(index) {
    return {
      type: 'COMPLETE_TODO',
      index: index
    };
  }
   
  export  function deleteTodo(index) {
    return {
      type: 'DELETE_TODO',
      index: index
    };
  }
   
  export  function clearTodo() {
    return {
      type: 'CLEAR_TODO'
    };
  }