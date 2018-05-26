import React, { Component } from 'react'
import './TempInfo.css'

class TempInfo extends Component {

  constructor(props){
    super(props);
    this.state={
      i: 0,
      average: 0,
      ceilaverage: 0,
      min: 0,
      max: 0,
    }
  }

  addPoint = (data) => {
    let i = this.state.i + 1;
    this.setState({i: i});
    let average = this.state.average;
    let min = this.state.min;
    let max = this.state.max;
    average = (((i-1) * average) + data) / i
    let ceilaverage = Math.ceil(average);
    this.setState({average, ceilaverage})
    if(i - 1 !== 0){
      if(data < min && data !== 0)
        this.setState({min: data})
      else if(data > max)
        this.setState({max: data})
    }
    else{
      this.setState({min: data, max: data})
    }
  }

  render = () => {
    return (
      <div className="tempinfo-cont">
        <p className="tempinfo-bold">Avg: </p>
        <p className="tempinfo-light">{this.state.ceilaverage}°F</p>
        <p className="tempinfo-bold">Range: </p>
        <p className="tempinfo-light">{this.state.min}°F - {this.state.max}°F</p>
      </div>
    )
  }
}

export default TempInfo
