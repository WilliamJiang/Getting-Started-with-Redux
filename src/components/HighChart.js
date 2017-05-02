import React, { Component } from 'react'
import ReactHighCharts from 'react-highcharts'

class HighChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      config: {
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: [{
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
        }]
      },
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        config: {
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
          },
          series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0]
          }]
        },
      })
      //let chart = this.refs.chart.getChart();
      //chart.xAxis[0].setCategories(['Jan', 'Feb', 'Mar', 'Apr', 'May'], true)
      //chart.series.addPoint({x: 10, y: 12});
      //chart.series.setData([29.9, 71.5, 106.4, 129.2, 144.0], true)
    }, 3000)
  }

  render() {
    return (
      <ReactHighCharts config={this.state.config} ref="chart"></ReactHighCharts>
    )
  }
}

export default HighChart;