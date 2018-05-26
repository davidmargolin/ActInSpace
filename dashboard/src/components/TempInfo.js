import React, { Component } from 'react'
import './TempInfo.css'

class TempInfo extends Component {
  render = () => {
    return (
      <div className="tempinfo-cont">
        <p className="tempinfo-bold">Average: </p>
        <p className="tempinfo-light">{this.props.average}asdf</p>
        <p className="tempinfo-bold">Range: </p>
        <p className="tempinfo-light">{this.props.min} - {this.props.max}asdf</p>
      </div>
    )
  }
}

export default TempInfo
