// step-8.js is a independant app, which can be run directly and not change.
// Here just extract from it

import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css'
import { v4 } from 'uuid';
import faker from '../../node_modules/faker/locale/en'
import moment from 'moment'
import { connect } from 'react-redux';


const ary = ['state', 'action', 'reducer', 'dispatching', 'action creator', 'async action', 'middleware', 'store', 'store creator', 'store enhancer'];

const getComments = ary.map(comment => ({
  id: v4(),
  name: faker.name.findName(),
  post: comment,
  date: moment().format('lll')
}));


//3. reducer:
export const commentReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return [...state, action.payload]
    case 'LOAD_COMMENTS':
      return action.payload;
  }
  return state;
}

//5. component
class CommentList extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'LOAD_COMMENTS',
      payload: getComments
    });
  }

  render() {
    let { comments } = this.props;
    return (
      <div className="row">
        <h2>React Bootstrap Table</h2>
        <BootstrapTable data={comments} striped={true} hover={true}>
          <TableHeaderColumn dataField="name" isKey={true} dataSort={true}>Name</TableHeaderColumn>
          <TableHeaderColumn dataField="post" dataSort={true}>Post</TableHeaderColumn>
          <TableHeaderColumn dataField="date" dataSort={true}>Date</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

//7. bind store with props and methods
CommentList = connect(
  (state) => ({comments: state.comments})
)(CommentList);

export default CommentList;