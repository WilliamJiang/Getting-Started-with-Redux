import React, { Componnet} from 'react'
import { v4 } from 'node-uuid';
import faker from '../../node_modules/faker/locale/en'
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


export const Home = () => <h2>Home</h2>

export const About = () => <h2>About</h2>
