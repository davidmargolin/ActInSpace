import React, { Component } from 'react';
import ReactHighCharts from 'react-highcharts';
import './TempGraph.css'

class SpeedPieChart extends Component {

  constructor(props){
    super(props);
    this.state={
      config: null,
      addedpoint: false,
      pointinfo: null,
      loading: true,
      rangeA: 0,
      rangeB: 0,
      rangeC: 0,
    }
  }

  componentDidMount = () => {
    console.log(this.props.data)
    this.createConfig();
  }

  addPoint = (data) => {
    if(data <= 30){
      let temp = this.state.rangeA;
      this.setState({rangeA: temp + 1})
    }
    else if(data > 30 && data <= 60){
      let temp = this.state.rangeB;
      this.setState({rangeB: temp + 1})
    }
    if(data > 60){
      let temp = this.state.rangeC;
      this.setState({rangeA: temp + 1})
    }
    this.rangify();
  }

  rangify = () => {
    let a = this.state.rangeA;
    let b = this.state.rangeB;
    let c = this.state.rangeC;
    let total = a + b + c;
    let dataA = (a / total).toFixed(2);
    let dataB = (b / total).toFixed(2);
    let dataC = 100 - dataA - dataB;
    let chart = this.spc.getChart();
    chart.series[0].setData({y: dataA}, {y: dataB}, {y: dataC});
  }

  createConfig = () => {
    this.setState({config: {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        animation: {
                duration: 0
            },
        width: 400
      },
      title: {
        text: 'Speed Ranges'
      },
      subtitle: {
        text: 'Source: Parse Technologies'
      },
      series: [{
        name: 'Car A',
        lineColor: 'gold',
        color: 'gold',
        data: [{
            name: '0 to 30 mph',
            color: 'yellow',
            y: 33.34,
        }, {
            name: '30 to 60 mph',
            color: 'green',
            y: 33.33
        }, {
            name: '> 60 mph',
            color: 'red',
            y: 33.33
        }]
      }]
    }});
    this.setState({loading: false})
  }

  render = () => {
    return(
      <div>
        <div className="graph-cont">
          {this.state.loading ? null :
            <ReactHighCharts className="actual-graph" neverReflow={true} config={this.state.config} ref={a => this.spc = a}></ReactHighCharts>
          }
        </div>
      </div>
    )
  }
}

export default SpeedPieChart
