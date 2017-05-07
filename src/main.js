/**
 * inherit from step-8
 */
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import { devToolsEnhancer } from 'redux-devtools-extension';

import { reducer as formReducer } from 'redux-form'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

import Helper from './components/'
import CommentList, {commentReducer} from './components/step8mini'
import List, {reducers as step_9_reducers} from './step-9'
import TodoApp, {visibilityFilter, todos} from './todoApp'
import Github, {githubReducer} from './components/delegate_github.js'
import Typicode, {typicodeReducer} from './components/delegate_typicode'
// use step-8 as an independant app, or use main+step8mini together. step8mini.js just copy step-8.js.
import TicTacToeApp from './ticTacToe/container'
import ticTacToeReducer from './ticTacToe/reducer'
import './ticTacToe/style.css'
import UBSApp from './ubs/UBSApp'
import ubsReducer from './ubs/reducer'
import HighChart from './components/HighChart'
import BullsFirst from "./bullsfirst/BullsFirstApp"

const Header = (props) => (
  <header className="app">
    <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink to="/" activeStyle={{color: '#33e0ff'}}>
            <div className="brand"/>
            Home</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header>

      <Navbar.Collapse key={0}>
        <Nav navbar>
          <LinkContainer to="/list">
            <NavItem key={1}>BootstrapTable</NavItem>
          </LinkContainer>
          <LinkContainer to="/comments">
            <NavItem key={2}>ReactBootstrapTable</NavItem>
          </LinkContainer>
          <LinkContainer to="/todos">
            <NavItem key={3}>Todos</NavItem>
          </LinkContainer>

          <NavDropdown key={4} title="Menu" id="menu-nav-dropdown">
            <LinkContainer to="/about">
              <NavItem key={4.1}>About</NavItem>
            </LinkContainer>
            <LinkContainer to="/topics">
              <NavItem key={4.2}>Topics</NavItem>
            </LinkContainer>
          </NavDropdown>

          <NavDropdown key={5} title="Delegate" id="delegate-nav-dropdown">
            <LinkContainer to="/github">
              <MenuItem key={5.1}>GitHub</MenuItem>
            </LinkContainer>
            <LinkContainer to="/typicode">
              <MenuItem key={5.2}>Typicode</MenuItem>
            </LinkContainer>
            <MenuItem divider/>
            <LinkContainer to="/more">
              <MenuItem key={6.9}>More...</MenuItem>
            </LinkContainer>
          </NavDropdown>

          <NavDropdown key={6} title="Demos" id="demo-nav-dropdown">
            <LinkContainer to="/ttt">
              <MenuItem key={6.1}>TicTacToe</MenuItem>
            </LinkContainer>
            <LinkContainer to="/ubs">
              <MenuItem key={6.2}>IRS</MenuItem>
            </LinkContainer>
            <LinkContainer to="/highchart">
              <MenuItem key={6.4}>High Chart</MenuItem>
            </LinkContainer>
            <LinkContainer to="/bullsfirst">
              <MenuItem key={6.5}>Bulls First</MenuItem>
            </LinkContainer>
          </NavDropdown>

          <LinkContainer to="/login">
            <NavItem key={7}>Login</NavItem>
          </LinkContainer>
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  </header>
)

const Footer = ({footer}) => (
  <footer>
    <div {...footer}>&copy; william jiang - 2017</div>
  </footer>
);

// TODO: use helpers/todo_menus.js:
//<Route component={Helper.NoMatch}/>
const Main = () => (
  <main style={{marginTop:60}}>
    <Switch>
      <Route exact path='/' component={Helper.Home}/>
      <Route path='/about' component={Helper.About}/>
      <Route path='/contact' component={Helper.Contact}/>
      <Route path='/topics' component={Helper.Topics}/>
      <Route path='/todos' component={TodoApp}/>
      <Route path='/list' component={List}/>
      <Route path='/typicode' component={Typicode}/>
      <Route path='/github' component={Github}/>
      <Route path='/comments' component={CommentList}/>
      <Route path='/ubs' component={UBSApp}/>
      <Route path='/ttt' component={TicTacToeApp}/>
      <Route path='/login' component={Helper.LoginForm}/>
      <Route path="/highchart" component={HighChart}/>
      <Route path="/bullsfirst" component={BullsFirst}/>
      <Route path="/notfound" component={Helper.NoMatch}/>
      <Redirect from="*" to="/notfound"/>
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
  form: formReducer,
  tttr: ticTacToeReducer,
  ubsReducer
});

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk, promise), devToolsEnhancer())
);

//8. render
render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);


