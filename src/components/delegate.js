import React, {Component}  from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import superagent from 'superagent'

export const delegateReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_DELEGATEPOST':
      return JSON.parse(action.payload);
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
  loadJSON() {
    const url = 'https://jsonplaceholder.typicode.com/posts';

//    return (dispatch, getState) => {
      console.log('does thunk capture hee???', url);
      superagent
        .get(url)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) throw err;
          console.log('return from jsonplaceholder: ', res);
          dispatch({type: 'LOAD_DELEGATEPOST', payload: res.body})
        });
//    }
  }

  componentDidMount() {
    this.loadJSON();
  }

  render() {
    console.log(this.props.jsonpost);
    return (
      <div className="row well">
        Load JSON.
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  jsonpost: state.delegateReducer
})

Delegate = connect(mapStateToProps)(Delegate);

export default Delegate;

