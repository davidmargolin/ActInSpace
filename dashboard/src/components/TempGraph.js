import React, { Component } from 'react';
import ReactHighCharts from 'react-highcharts';
import { HighCharts } from 'react-highcharts';
import './TempGraph.css'

class TempGraph extends Component {

  constructor(props){
    super(props);
    this.state={
      config: null,
      addedpoint: false,
      pointinfo: null,
      loading: true,
    }
  }

  componentDidMount = () => {
    console.log(this.props.data)
    this.createConfig();
  }

  addPoint = (pointinfo) => {
    let chart = this.tg.getChart();
    console.log(pointinfo.time)
    chart.series[0].addPoint([pointinfo.temp, pointinfo.speed], true, true)
    let categories = chart.xAxis[0].categories;
    categories.push(pointinfo.time);
    chart.xAxis[0].setCategories(categories, true);
  }

  createConfig = () => {
    console.log(this.props.data)
    let temps = [];
    let times = [];
    for(let i = 0; i < this.props.data.length; i++){
      temps[i] = this.props.data[i].temp;
      times[i] = this.props.data[i].time;
    }
    this.setState({config: {
      chart: {
        type: 'spline',
        animation: {
                duration: 0
            },
        marginRight: 10,
      },
      title: {
        text: 'Vehicle Engine Temperature'
      },
      subtitle: {
        text: 'Source: Parse Technologies'
      },
      xAxis: {
        title: {
          text: 'Time'
        },
        categories: times
      },
      yAxis: {
        title: {
          text: 'Temperature (in Farenheit)'
        }
      },
      series: [{
        name: 'Car A',
        lineColor: 'red',
        color: 'red',
        data: temps
      }]
    }});
    this.setState({loading: false})
  }

  render = () => {
    return(
      <div>
        <div className="graph-cont">
          {this.state.loading ? null :
            <ReactHighCharts className="actual-graph" neverReflow={true} config={this.state.config} ref={a => this.tg = a}></ReactHighCharts>
          }
        </div>
      </div>
    )
  }
}

export default TempGraph
