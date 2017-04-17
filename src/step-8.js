import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { reducer as formReducer } from 'redux-form'
import Helper from './components/'

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css'

//2. actionCreator:
const loadComments = () => ({type: 'LOAD_COMMENTS'});
const addComment = (text) => {
  console.log(text);
  return {type: 'ADD_COMMENT', payload: text}
}

//3. reducer:
const commentReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [...state, action.payload]
    case 'LOAD_COMMENTS':
      return state;
  }
  return state;
}

//5. component
class List extends Component {
  componentDidMount() {
    this.props.loadComments();
  }

  render() {
    let { comments } = this.props;
    return (
      <div className="row">
        <BootstrapTable data={comments} striped={true} hover={true}>
          <TableHeaderColumn dataField="name" isKey={true} dataSort={true}>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="post" dataSort={true}>Post</TableHeaderColumn>
          <TableHeaderColumn dataField="date" dataSort={true}>Date</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

//7. bind store with props and methods
List = connect(
  (state) => ({comments: state.comments}),
  {loadComments, addComment}
)(List);


// in case App = List + AddForm + Footer + Navigator...
const App = () => (
  <div className="container">
    <Helper.Header />
    <Main />
    <Helper.Footer done={true} author='william jiang'/>
  </div>
)
// add More
const Main = () => (
  <main style={{marginTop:60}}>
    <Switch>
      <Route exact path='/' component={Helper.Home}/>
      <Route path='/list' component={List}/>
      <Route path='/about' component={Helper.About}/>
    </Switch>
  </main>
)


//6. store and dispatch
let initialComments = Helper.getComments();
let persistance = {comments: initialComments};
const rootReducer = combineReducers({
  comments: commentReducer,
  form: formReducer
});
const store = createStore(rootReducer);

//8. render
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);