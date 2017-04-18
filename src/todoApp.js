import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { connect, Provider } from 'react-redux';

let nextTodoId = 0;

const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text: text
  }
}

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  }
}

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

// reducers
//actionCreator
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }
      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

export const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
          todo(t, action)
      )
    default:
      return state
  }
}

export const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
};

export const todosReducer = ({
  todos,
  visibilityFilter
});

/////////////////

const Link = ({
  active,
  children,
  onClick
  }) => {
  if (active) {
    return <span>{children}</span>
  }
  return (
    <a href='#'
       onClick={e => {
          e.preventDefault();
          onClick()
        }}
      >
      {children}
    </a>
  );
};

const FilterLink = connect(
  (state, ownProps) => {
    return {
      active: ownProps.filter === state.visibilityFilter
    }
  },
  (dispatch, ownProps) => {
    return {
      onClick: () => {
        dispatch(setVisibilityFilter(ownProps.filter));
      }
    };
  }
)(Link);


const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
  </p>
);

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input ref={node => {input = node;}}/>
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};
AddTodo = connect()(AddTodo);
{ /*
 AddTodo = connect(
 state => { return {} },
 dispatch => { return { dispatch } }
 )(AddTodo);
 */
}

const Todo = ({
  onClick,
  completed,
  text
  }) => (
  <li
    onClick={onClick}
    style={{
        textDecoration: completed ? 'line-through' : 'none'
      }}>
    {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
  }) => (
  <ul>
    {todos.map(todo =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
          />
    )}
  </ul>
);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
};

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => dispatch(toggleTodo(id))
  };
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

class TodoApp extends Component {
  render() {
    debugger;
    return (
      <div className="row well">
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    );
  }
}
//const Provider = {props} => props.children;
export default TodoApp;


/* comment the render, so `TodoApp` can be used in `main`
 * uncomment the following the update entry in webpack.config.js to run todoApp.js exclusively.
 ReactDOM.render(
 <Provider store={createStore(todosReducer)}>
 <TodoApp/>
 </Provider>,
 document.getElementById('root')
 );
 */
