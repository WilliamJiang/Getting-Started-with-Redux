import React, { Componnet} from 'react'
import { v4 } from 'uuid';
import faker from '../../node_modules/faker/locale/en'
import { Link } from 'react-router-dom'
import moment from 'moment'

//1. config:
export const getComments = () =>
  ['state', 'action', 'reducer', 'dispatching function', 'action creator', 'async action', 'middleware', 'store', 'store creator', 'store enhancer']
    .map(comment => ({
      id: v4(),
      name: faker.name.findName(),
      post: comment,
      date: moment().format('lll')
    }))

// add more meats:
export const Header = () => (
  <header>
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <ul className="nav navbar-nav">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/list'>List</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/roster'>Roster</Link></li>
        <li><Link to='/schedule'>Schedule</Link></li>
      </ul>
    </nav>
  </header>
);

export const Footer = ({footer}) => (
  <footer>
    <div {...footer}>&copy; william jiang - 2017</div>
  </footer>
);
// Footer = connect()(Footer);

export const Home = () => <h2>Home</h2>

export const About = () => <h2>About</h2>

export const Roster = () => <h2>Roster</h2>

export const Schedule = () => <h2>Schedule</h2>