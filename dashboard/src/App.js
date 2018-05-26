import React, { Component } from 'react';
import TempGraph from './components/TempGraph'
import TempInfo from './components/TempInfo'
import VoltInfo from './components/VoltInfo'
import VoltGraph from './components/VoltGraph'
import SpeedGraph from './components/SpeedGraph'
import SpeedInfo from './components/SpeedInfo'
import './App.css'

class App extends Component {

  constructor(props){
    super(props);
    this.tempChild = React.createRef();
    this.voltChild = React.createRef();
    this.speedChild = React.createRef();
  }

  addTempPoint = (temp) => {
    let timestamp = this.getTimestamp();
    var data = {temp: temp, time: timestamp}
    this.tempChild.current.addPoint(data);
  }

  addVoltPoint = (volt) => {
    let timestamp = this.getTimestamp();
    var data = {volt: volt, time: timestamp}
    this.voltChild.current.addPoint(data);
  }

  addSpeedPoint = (speed) => {
    let timestamp = this.getTimestamp();
    let data = {speed: speed, time: timestamp}
    this.speedChild.current.addPoint(data);
  }

  getTimestamp = () => {
    let date = new Date();
    let minutesless = false;
    if(date.getMinutes() / 10 <= 1)
      minutesless = true;
    let secondsless = false;
    if(date.getSeconds() / 10 <= 1)
      secondsless = true;
    let hoursless = false;
    if(date.getHours() / 10 <= 1)
      hoursless = true;
    let timestamp = (hoursless ? '0' : '') + date.getHours() + ":" + (minutesless ? '0' : '') + date.getMinutes() + ":" + (secondsless ? '0' : '') + date.getSeconds();
    return timestamp
  }

  parsePacket = (x) => {
    //000000000 00000000 10001110 1000001
    let temp = x & 127;
    x = x >> 7;
    let volt = x & 255;
    volt /= 10.0;
    let speed = x >> 8;
    this.addTempPoint(temp);
    this.addVoltPoint(volt);
    this.addSpeedPoint(speed);
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  render() {
    return (
      <div className="app-page">
        <div className="app-header">
          <p className="app-head-text">Analytics Dashboard</p>
        </div>
        <div className="app-cont">
          <div className="rowA">
            <div className="temp-cont">
              <p className="temp-text">Temperature</p>
              <TempGraph ref={this.tempChild} data={testtempdata}/>
              <TempInfo />
              <button className="testbutton" onClick={(event) => {this.addTempPoint(event)}}>Add Data</button>
            </div>
            <div className="volt-cont">
              <p className="volt-text">Battery Voltage</p>
              <VoltGraph ref={this.voltChild} data={testvoltdata}/>
              <VoltInfo />
              <button className="testbutton" onClick={(event) => {this.addVoltPoint(event)}}>Add Data</button>
            </div>
          </div>
          <div className="speed-cont">
            <p className="speed-text">Speed</p>
            <SpeedGraph ref={this.speedChild} data={testspeeddata}/>
            <SpeedInfo />
            <button className="testbutton" onClick={(event) => {this.addSpeedPoint(event)}}>Add Data</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

const testtempdata = [
  {time: '12:14PM', temp: 75}, {time: '12:14PM', temp: 77}, {time: '12:14PM', temp: 80},
  {time: '12:14PM', temp: 81}, {time: '12:14PM', temp: 78}, {time: '12:14PM', temp: 79},
  {time: '12:14PM', temp: 75}, {time: '12:14PM', temp: 71}, {time: '12:14PM', temp: 66}
]

const testvoltdata = [
  {time: '12:14PM', volt: 175}, {time: '12:14PM', volt: 177}, {time: '12:14PM', volt: 280},
  {time: '12:14PM', volt: 281}, {time: '12:14PM', volt: 178}, {time: '12:14PM', volt: 379},
  {time: '12:14PM', volt: 175}, {time: '12:14PM', volt: 271}, {time: '12:14PM', volt: 266}
]

const testspeeddata = [
  {time: '12:14PM', speed: 175}, {time: '12:14PM', speed: 177}, {time: '12:14PM', speed: 280},
  {time: '12:14PM', speed: 281}, {time: '12:14PM', speed: 178}, {time: '12:14PM', speed: 379},
  {time: '12:14PM', speed: 175}, {time: '12:14PM', speed: 271}, {time: '12:14PM', speed: 266}
]

const mask = 4286609885;
