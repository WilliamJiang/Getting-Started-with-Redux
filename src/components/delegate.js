import React, {Component}  from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import superagent from 'superagent'

//1. createAction
const loadJSON = () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  return (dispatch) => {
    superagent
      .get(url)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) throw err;
        //console.log('return from jsonplaceholder: ', JSON.stringify(res.body));
        dispatch({type: 'LOAD_DELEGATEPOST', payload: res.body})
      });
  }
}

//2. reducer:
/**
 * {type: @@redux/UNIT}, {type: "@@redux/PROBE_UNKNOWN_ACTION_p.q.2.x.a.8.k"}...
 */
export const delegateReducer = (state = [], action) => {
  console.log('in delegateReducer', action);
  switch (action.type) {
    case 'LOAD_DELEGATEPOST':
      return action.payload;
      break;
  }
  return state;
}

class Delegate extends Component {

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
  jsonpost: state.delegateReducer
});

Delegate = connect(mapStateToProps, {
  loadJSON
})(Delegate);

export default Delegate;

