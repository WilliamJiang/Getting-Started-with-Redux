import React, { Component} from 'react'
import { v4 } from 'node-uuid';
import faker from '../../node_modules/faker/locale/en'
import moment from 'moment'
import { Link, Redirect, Route, withRouter } from 'react-router-dom'

//1. config:
export const getComments = () =>
  ['state', 'action', 'reducer', 'dispatching function', 'action creator', 'async action',
    'middleware', 'store', 'store creator', 'store enhancer']
    .map(comment => ({
      id: v4(),
      name: faker.name.findName(),
      post: comment,
      date: moment().format('lll')
    }))


export const About = ({match, location}) => (
  <div>
    <h2>About</h2>
    <hr/>
    <ul>
      <li><Link to={`${match.url}/section1`}>Sub Menu 1</Link></li>
      <li><Link to={`${match.url}/section2`}>Sub Menu 2</Link></li>
      <li><Link to={`${match.url}/section3`}>Sub Menu 3</Link></li>
      <li><Link to={`${match.url}/section4`}>Sub Menu 4</Link></li>
    </ul>
    <hr/>
    <Route path="/:path" component={Child}/>
    <strong>{match.url}</strong>: {location.pathname}
  </div>
)
const Child = ({ match }) => (
  <div>
    <h3>PATH: {match.params.path}</h3>
  </div>
)


export const Contact = () => <h2>Contact</h2>

/**
 * match, location, history
 */
export const Topics = ({match, location}) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li><Link to={`${match.url}/todos`}>Todo</Link></li>
      <li><Link to={`${match.url}/react`}>React</Link></li>
      <li><Link to={`${match.url}/redux`}>Redux</Link></li>
      <li><Link to={`${match.url}/rxjs`}>RxJs</Link></li>
    </ul>
    <strong>{match.url}</strong>: {location.pathname}
    <hr/>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={()=><h3>Please select a sub-topic under Topics</h3>}/>
  </div>
)
const Topic = ({match}) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

export const Home = () => (
  <div>
    <h2>Home</h2>
    <ul>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/topics">Topics</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/notfound">404 Not Found</Link></li>
    </ul>
  </div>
)
