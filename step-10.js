import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, bindActionCreators, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';

import Rx from 'rxjs/Rx'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

const PING = 'PING';
const PONG = 'PONG';

const ping = () => ({ type: PING });

const pingEpic = action$ =>
    action$.ofType(PING)
        .delay(1000) // Asynchronously wait 1000ms then continue
        .mapTo({ type: PONG });

const pingReducer = (state = { isPinging: false }, action) => {
    switch (action.type) {
        case PING:
            return { isPinging: true };

        case PONG:
            return { isPinging: false };

        default:
            return state;
    }
};

let App = ({ isPinging, ping }) => (
    <div>
        <h1>is pinging: {isPinging.toString()}</h1>
        <button onClick={ping}>Start PING</button>
    </div>
);

App = connect(
    ({ isPinging }) => ({ isPinging }),
    { ping }
)(App);

const epicMiddleware = createEpicMiddleware(pingEpic);

const store = createStore(pingReducer, applyMiddleware(epicMiddleware));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
