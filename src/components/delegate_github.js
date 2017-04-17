import React, {Component}  from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import superagent from 'superagent'

//1. createAction
const loadGethubRepos = () => {
  const url = 'https://api.github.com/users/williamjxj/repos';
  return (dispatch) => {
    superagent
      .get(url)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) throw err;
        dispatch({type: 'LOAD_GITHUB', payload: res.body})
      });
  }
}

//2. reducer:
export const githubReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_GITHUB':
      return action.payload;
      break;
  }
  return state;
}

class Github extends Component {

  componentDidMount() {
    this.props.loadGethubRepos();
  }

  render() {
    if (!this.props.github_repos || this.props.github_repos.length === 0) {
      return (
        <div className="well">
          Loading Github Repository....
        </div>
      )
    }
    const list = this.props.github_repos.map((r, i) => (
      <li className="list-group-item" key={r.id}>
        <h4><a href={r.html_url}>{r.full_name}</a></h4>

        <p>{r.description}</p>
      </li>
    ))
    return (
      <div className="row container">
        <h2>data from williamjxj github repository</h2>
        <ul className="list-group">{list}</ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  github_repos: state.githubReducer
});

Github = connect(mapStateToProps, {
  loadGethubRepos
})(Github);

export default Github;

