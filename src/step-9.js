import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import _ from 'lodash'
import { loadPeople, addPerson } from './../helpers/getFakeData'


const loadAction = (people) => ({
  type: 'LOAD_PEOPLE',
  payload: people
});
const prevAction = () => {
  const people = loadPeople(10);
  return {
    type: 'PREV_PEOPLE',
    payload: people
  }
};
const nextAction = () => {
  const people = loadPeople(10);
  return {
    type: 'NEXT_PEOPLE',
    payload: people
  }
};
const sortAction = (sortBy, seq) => {
  console.log('sortAction: ', sortBy, seq);
  return {
    type: 'SORT_PEOPLE',
    sortBy: sortBy,
    seq: seq
  }
};

//TODO
const addAction = () => ({
  type: 'ADD_PERSON'
});

export const reducers = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_PEOPLE':
    case 'PREV_PEOPLE':
    case 'NEXT_PEOPLE':
      return action.payload;
    case 'ADD_PERSON':
      const person = addPerson();
      return [...state, person];
    case 'DELETE_PERSON':
      return state.filter(s => s.id !== action.payload);
    case 'SORT_PEOPLE':
      //_.orderBy(users, ['user', 'age'], ['asc', 'desc']);
      return _.orderBy(state, [action.sortBy], [action.seq]);
  }
  return state;
}

const SortingAsc = ({sort, name}) => (
  <a href="#"
     title={'sort by ' + name}
     onClick={() => { sort(name, 'asc') }}>
    <span className="glyphicon glyphicon-sort-by-alphabet"></span>
  </a>
)
const SortingDesc = ({sort, name}) => (
  <a href="#"
     title={'sort by ' + name + ' desc'}
     onClick={() => { sort(name, 'desc') }}>
    <span className="glyphicon glyphicon-sort-by-alphabet-alt"></span>
  </a>
)

const Header = ({sort, seq}) => (
  <thead>
  <tr>
    <th>#</th>
    <th>Avatar</th>
    <th>Name &nbsp;
      <SortingAsc sort={sort} name="name"/> &nbsp;&nbsp;
      <SortingDesc sort={sort} name="name"/>
    </th>
    <th>Email&nbsp;
      <SortingAsc sort={sort} name="email"/> &nbsp;&nbsp;
      <SortingDesc sort={sort} name="email"/>
    </th>
    <th>Phone&nbsp;
      <SortingAsc sort={sort} name="phone"/> &nbsp;&nbsp;
      <SortingDesc sort={sort} name="phone"/>
    </th>
    <th>URL</th>
    <th>Delete</th>
  </tr>
  </thead>
)

const Detail = ({idx, person, onClickName, deletePerson}) => (
  <tr>
    <td scope="row">{idx + 1}</td>
    <td><img src={person.avatar} style={{maxWidth:30,mxHeight:30}}/></td>
    <td><a href="#"
           onClick={()=>onClickName(person.id)}>
      {person.name}
    </a></td>
    <td>{person.email}</td>
    <td>{person.phone}</td>
    <td><a href={person.url}>{person.url}</a></td>
    <td>
      <button className="btn btn-danger"
              onClick={()=>deletePerson(person.id)}
              title={'remove ' + person.name}>
        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
      </button>
    </td>
  </tr>
)


class List extends Component {
  constructor(props) {
    super(props);
    this.state = {loadNumber: 10};
    this.deletePerson = this.deletePerson.bind(this);
    this.showPersonDesc = this.showPersonDesc.bind(this);
  }

  componentDidMount() {
    const people = loadPeople(this.state.loadNumber);
    return this.props.loadAction(people);
  }

  deletePerson(id) {
    return this.props.dispatch({
      type: 'DELETE_PERSON',
      payload: id
    });
  }

  showPersonDesc(id) {
    let thisPerson = this.props.people.find(p => p.id === id);
    alert(thisPerson.desc);
  }

  render() {
    if (!this.props.people) {
      return <div>Loading...</div>;
    }
    return (
      <div className="container">
        <div className="well"><h2>Bootstrap Table</h2>
          <button className="btn btn-info"
                  onClick={this.props.addAction}
                  style={{float:'right', paddingRight:30, marginTop:-20}}
            ><span className="glyphicon glyphicon-plus"></span>Add Person
          </button>
          <a href="#" aria-label="Previous"
             onClick={this.props.prevAction}>
            <span aria-hidden="true">&laquo;</span>Prev<span aria-hidden="true">&laquo;</span>
          </a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a href="#" aria-label="Next"
             onClick={this.props.nextAction}>
            <span aria-hidden="true">&raquo;</span>Next<span aria-hidden="true">&raquo;</span>
          </a>
        </div>

        <div className="row">
          <table className="table table-bordered">
            <Header sort={this.props.sortAction}/>
            <tbody>
            {this.props.people.map((person, i) => (
              <Detail
                key={i}
                onClickName={this.showPersonDesc.bind(this)}
                deletePerson={this.deletePerson.bind(this)}
                person={person}
                idx={i}/>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {people: state.people}
}
// I still want to use `dispatch` in components.
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadAction, prevAction, nextAction, sortAction, addAction, dispatch
  }, dispatch)
}

List = connect(mapStateToProps, mapDispatchToProps)(List);

export default List;
/**
 * comment so used for main.js
 *
 const store = createStore(reducers);
 ReactDOM.render(
 <Provider store={store}>
 <List />
 </Provider>,
 document.getElementById('root')
 )
 */