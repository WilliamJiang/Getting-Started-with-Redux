import React, {Component} from 'react'
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import {ubsCalculate, ubsReset} from './action'
import data from './data.json'

const DataList = ({data}) => (
  <div className="row">
    <BootstrapTable data={data} striped={true} hover={true}>
      <TableHeaderColumn dataField="CompanyCode" isKey={true} dataSort={true}>CompanyCode</TableHeaderColumn>
      <TableHeaderColumn dataField="Account" dataSort={true}>Account</TableHeaderColumn>
      <TableHeaderColumn dataField="City" dataSort={true}>City</TableHeaderColumn>
      <TableHeaderColumn dataField="Country" dataSort={true}>Country</TableHeaderColumn>
      <TableHeaderColumn dataField="CreditRating" dataSort={true}>CreditRating</TableHeaderColumn>
      <TableHeaderColumn dataField="Currency" dataSort={true}>Currency</TableHeaderColumn>
      <TableHeaderColumn dataField="Amount" dataSort={true}>Amount</TableHeaderColumn>
    </BootstrapTable>
  </div>
)

class UBSApp extends Component {

  constructor(props) {
    super(props);
    this.getSum = this.getSum.bind(this);
  }

  defer(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getSum() {
    this.defer(500).then(() => {
      this.props.ubsCalculate(data);
    })
  }

  render() {
    //if (!this.props.ubsNumber || Object.keys(this.props.ubsNumber).length === 0) {
    //  return (
    //    <h3>Loading...</h3>
    //  )
    //}
    const list = Object.keys(this.props.ubsNumber).map((key, i) => (
      <li className="list-group-item" key={i}><strong>{key}</strong>: <i>{this.props.ubsNumber[key]}</i></li>
    ))
    return (
      <div>
        <h2 className="alert alert-danger">Calculate Number App
          &nbsp; &nbsp;
          <button type="button" className="btn btn-warn" onClick={this.getSum}>Get Amount Summary</button>
        </h2>
        <ul className="list-group">{list}</ul>
        <DataList data={data}/>
      </div>
    )
  }
}

UBSApp = connect((state, ownProps) => ({
    'ubsNumber': state.ubsReducer
  }),
  {ubsCalculate, ubsReset}
)(UBSApp)

export default UBSApp;