/**
 * inherit from step-8
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import Helper from './components/'
import TodoApp, {todosReducer, todos, visibilityFilter} from './todoApp'
import List, {reducers as step_9_reducers} from './step-9'
import Typicode, {typicodeReducer} from './components/delegate_typicode'
import Github, {githubReducer} from './components/delegate_github.js'
import CommentList, {commentReducer} from './components/step8mini'
// use step-8 as an independant app, or use main+step8mini together.
// step8mini.js just copy step-8.js.
import { reducer as formReducer } from 'redux-form'
import { Link } from 'react-router-dom'


const Header = () => (
  <header>
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <ul className="nav navbar-nav">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/todos'>Todos</Link></li>
        <li><Link to='/list'>BootstrapTable</Link></li>
        <li><Link to='/comments'>ReactBootstrapTable</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/typicode'>Typicode</Link></li>
        <li><Link to='/github'>GitHub</Link></li>
        <li><Link to='/login'>Login</Link></li>
      </ul>
    </nav>
  </header>
);

const Footer = ({footer}) => (
  <footer>
    <div {...footer}>&copy; william jiang - 2017</div>
  </footer>
);

const Main = () => (
  <main style={{marginTop:60}}>
    <Switch>
      <Route exact path='/' component={Helper.Home}/>
      <Route path='/about' component={Helper.About}/>
      <Route path='/todos' component={TodoApp}/>
      <Route path='/list' component={List}/>
      <Route path='/typicode' component={Typicode}/>
      <Route path='/github' component={Github}/>
      <Route path='/comments' component={CommentList}/>
      <Route path='/login' component={Helper.LoginForm}/>
    </Switch>
  </main>
)

// in case App = List + AddForm + Footer + Navigator...
const App = () => (
  <div className="container">
    <Header />
    <Main />
    <Footer done={true} author='william jiang'/>
  </div>
)

// TODO (william): why can't use todosReducer directly???
// 1. `people` is state's property <=> step-9 reducers
// 2. in step-9 mapStateToProps: {people: state.people}
const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  people: step_9_reducers,
  typicodeReducer,
  githubReducer,
  comments: commentReducer,
  form: formReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, promise)
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

