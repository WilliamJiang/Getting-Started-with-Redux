import React, {Component}  from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'

require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
// use isomorphic-fetch instead of superagent

//1. createAction
const loadJSON = () => (dispatch) => {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    })
    .then(data => {
      dispatch({type: 'LOAD_DELEGATEPOST', payload: data})
    });
}

//2. reducer:
/**
 * {type: @@redux/UNIT}, {type: "@@redux/PROBE_UNKNOWN_ACTION_p.q.2.x.a.8.k"}...
 */
export const typicodeReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_DELEGATEPOST':
      return action.payload;
      break;
  }
  return state;
}

class Typicode extends Component {

  constructor(props) {
    super(props);
  }

  /**
   * I added 'User-Agent' for "https://api.github.com/users/" + user + "/repos";
   * still *NOT* work.
   * Error: Request has been terminated
   Possible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.
   at Request.crossDomainError (client.js:625)
   at XMLHttpRequest.xhr.onreadystatechange (client.js:733)

   * All API requests MUST include a valid User-Agent header. Requests with no User-Agent header will be rejected.
   * We request that you use your GitHub username, or the name of your application, for the User-Agent header value.
   */

  componentDidMount() {
    this.props.loadJSON();
  }

  render() {
    if (!this.props.jsonpost || this.props.jsonpost.length === 0) {
      return (
        <div className="well">
          Load JSON....
        </div>
      )
    }
    const list = this.props.jsonpost.map((post, i) => (
      <li className="list-group-item" key={post.userId + '_' + post.id}>
        <h4>{post.title}</h4>

        <p>{post.body}</p>
      </li>
    ))
    return (
      <div className="row container">
        <h2>data from `https://jsonplaceholder.typicode.com/posts`</h2>
        <ul className="list-group">{list}</ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  jsonpost: state.typicodeReducer
});

Typicode = connect(mapStateToProps, {
  loadJSON
})(Typicode);

export default Typicode;

