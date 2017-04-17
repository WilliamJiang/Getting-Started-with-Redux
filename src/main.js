/**
 * inherit from step-8
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import Helper from './components/'
import TodoApp, {todosReducer, todos, visibilityFilter} from './todoApp'
import List, {reducers as step_9_reducers} from './step-9'
import Delegate, {delegateReducer} from './components/delegate'

// add More
const Main = () => (
  <main style={{marginTop:60}}>
    <Switch>
      <Route exact path='/' component={Helper.Home}/>
      <Route path='/about' component={Helper.About}/>
      <Route path='/todos' component={TodoApp}/>
      <Route path='/list' component={List}/>
      <Route path='/delegate' component={Delegate}/>
      <Route path='/login' component={Helper.LoginForm}/>
    </Switch>
  </main>
)

// in case App = List + AddForm + Footer + Navigator...
const App = () => (
  <div className="container">
    <Helper.Header />
    <Main />
    <Helper.Footer done={true} author='william jiang'/>
  </div>
)

// TODO (william): why can't use todosReducer directly???
// 1. `people` is state's property <=> step-9 reducers
// 2. in step-9 mapStateToProps: {people: state.people}
const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  people: step_9_reducers,
  delegateReducer,
  form: formReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

//8. render
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);