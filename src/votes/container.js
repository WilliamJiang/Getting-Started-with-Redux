import React, {Component} from 'react'
import { connect } from 'react-redux';
import {voteAction} from './action'

class VoteApp extends Component {
  render() {
    console.log(this.props);
    return (
      <h2>VoteApp</h2>
    )
  }
}

VoteApp = connect((state, ownProps) => ({
    'voteProps': state.voteReducer
  }),
  {voteAction}
)(VoteApp)

export default VoteApp;