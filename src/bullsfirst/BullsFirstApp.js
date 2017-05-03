import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import ReactHighCharts from 'react-highcharts'
import data from './data.json'

// just react, no redux.
// Notice: `b` needs capitalize, otherwise not parse.
const BullsfirstHeader = ({title, subTitle, addRow, reset}) => {
  return (
    <header id="bullsfirst-header">
      <h3>{title} - {subTitle} ({ moment().format('YYYY-MM-DD')})</h3>

      <nav className="actions">
        <button className="btn btn-default" onClick={addRow}>Add</button>
        <button className="btn btn-warning" onClick={reset}>Reset</button>
      </nav>
    </header>
  )
}

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const moneyFormatter = (dollar) => dollar.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');


const TableHeader = ({ths}) => (
  <tr>
    <th>No.</th>
    {ths.map(t => <th key={t}>{capitalizeFirstLetter(t)}</th>)}
  </tr>
)


class BullsFirst extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tcolumns: Object.keys(data[0]),
      rows: data,
      total: {
        name: '',
        marketValue: 0,
        cash: 0,
        legend: 'none'
      },
      highchart_default: {
        plotOptions: {
          pie: {
            cursor: "pointer",
            depth: 35,
            dataLabels: {
              enabled: true,
              format: "{point.name}"
            }
          }
        },
        title: {
          text: ""
        },
        tooltip: {
          pointFormat: "Occurrences: <b>{point.y}</b>"
        }
      }
    }
    this.addRow = this.addRow.bind(this)
  }

  addRow = () => {
    let newRow = {
      name: 'New Account',
      marketValue: Math.random() * 100000,
      cash: Math.random() * 400000,
      legend: 'cyan'
    }

    this.setState({
      rows: this.state.rows.concat(newRow)
    })
  }

  resetRow = () => {
    this.setState({rows: data})
  }

  updateTotal = () => {
    const marketValue = this.state.rows.reduce((a, b) => a += b.marketValue, 0);
    const cash = this.state.rows.reduce((a, b) => a += b.cash, 0);
    return [marketValue, cash];
  }

  displayTotal = () => {
    const total = this.updateTotal();
    return (
      <tr className="totals">
        <td><strong>Total</strong></td>
        <td>&nbsp;</td>
        <td>
          <strong><i className="glyphicon glyphicon-usd"></i>{moneyFormatter(total[0])}</strong>
        </td>
        <td>
          <strong><i className="glyphicon glyphicon-usd"></i>{moneyFormatter(total[1])}</strong>
        </td>
        <td>&nbsp;</td>
      </tr>
    )
  }


  render() {
    let marketValueConfig = {}, cashConfig = {};

    if (Array.isArray(this.state.rows) && this.state.rows.length > 0) {
      const ms = this.state.rows.map(m=>m.marketValue)
      const cs = this.state.rows.map(c=>c.cash);

      marketValueConfig = Object.assign({}, this.state.highchart_default, {
        series: [{
          name: "MarketValue",
          data: ms,
          type: "pie"
        }]
      });
      cashConfig = Object.assign({}, this.state.highchart_default, {
        series: [{
          data: cs,
          name: 'Cash',
          type: 'pie'
        }]
      });
    }

    const list = this.state.rows.map((v, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{v.name}</td>
        <td><i className="glyphicon glyphicon-usd"></i>{moneyFormatter(v.marketValue)}</td>
        <td><i className="glyphicon glyphicon-usd"></i>{moneyFormatter(v.cash)}</td>
        <td style={{backgroundColor: v.legend}}>&nbsp;</td>
      </tr>
    ))

    return (
      <div id="bullsfirst-main">
        <div className="row">
          <BullsfirstHeader
            title="React BullsFirst"
            subTitle="Calling All Bull Markets"
            addRow={this.addRow}
            reset={this.resetRow}/>
        </div>
        <div className="row">
          <div className="col-md-6">
            <table className="table table-bordered">
              <thead>
              <TableHeader ths={this.state.tcolumns}/>
              </thead>
              <tbody>{list}</tbody>
              <tfoot>{this.displayTotal()}</tfoot>
            </table>
          </div>
          <div className="col-md-6">
            <ReactHighCharts config={marketValueConfig}></ReactHighCharts>

            <ReactHighCharts config={cashConfig}></ReactHighCharts>
          </div>
        </div>
      </div>
    )
  }
}

export default BullsFirst;
