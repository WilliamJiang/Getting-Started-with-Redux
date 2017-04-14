import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const comments = [
    'state',
    'action',
    'reducer',
    'dispatching function',
    'action creator',
    'async action',
    'middleware',
    'store',
    'store creator',
    'store enhancer'
];

const reducers = (state, action) => {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [...state, action.text]
    }
    return state;
}

const Detail = ({comment}) => (
    <li className="list-group-item text-capitalize">
        <i className="fa fa-comment-o" aria-hidden="true"></i>{comment}
    </li>
)

class List extends Component {
    render() {
        return (
            <div className="container">
                <h2>List</h2>

                <div className="row">
                    <ul className="list-group">
                        {this.props.comments.map((comment, i) => <Detail key={i} comment={comment}/>)}
                    </ul>
                </div>
                <p className="well">{this.props.done ? this.props.author : 'not available'}</p>
            </div>
        )
    }
}

const store = createStore(reducers, comments);

store.dispatch({
    type: 'ADD_COMMENT',
    text: 'what is the return from mapStateToProps?'
});


List = connect((state) => ({comments: state}))(List);

ReactDOM.render(
    <Provider store={store}>
        <List
            done={true}
            author='william jiang'
            />
    </Provider>,
    document.getElementById('root')
)

/** TODO:
 * font-awesome
 */
