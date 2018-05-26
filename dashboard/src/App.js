import React, { Component } from 'react';
import TempGraph from './components/TempGraph'
import TempInfo from './components/TempInfo'
import VoltInfo from './components/VoltInfo'
import VoltGraph from './components/VoltGraph'
import SpeedGraph from './components/SpeedGraph'
import SpeedInfo from './components/SpeedInfo'
import SpeedPieChart from './components/SpeedPieChart'
import * as firebase from 'firebase'
import './App.css'

class App extends Component {

  constructor(props){
    super(props);
    this.tempChild = React.createRef();
    this.voltChild = React.createRef();
    this.voltInfoChild = React.createRef();
    this.speedChild = React.createRef();
    this.speedInfoChild = React.createRef();
  }

  componentDidMount = () => {
    var config = {
      apiKey: "AIzaSyDsv583oj2DgoPL6Rqt-e-oB2t_VWCnPOw",
      authDomain: "parsedrive-7874e.firebaseapp.com",
      databaseURL: "https://parsedrive-7874e.firebaseio.com",
      projectId: "parsedrive-7874e",
      storageBucket: "",
      messagingSenderId: "451356055475"
    };
    firebase.initializeApp(config);
    let ref = firebase.database().ref('/packets');
    ref.on("child_added", (snapshot) => {
      var newPacket = snapshot.val();
      console.log(newPacket)
      this.parsePacket(newPacket)
    });
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
    this.voltInfoChild.current.addPoint(data.volt);
  }

  addSpeedPoint = (speed) => {
    let timestamp = this.getTimestamp();
    let data = {speed: speed, time: timestamp}
    this.speedChild.current.addPoint(data);
    this.speedInfoChild.current.addPoint(data.speed);
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
          <div >
            <img style={{height: 90}} src={require("./images/Logo.png")} />

          </div>
          <div >
            <p className="app-head-text">Analytics Dashboard</p>

          </div>


        </div>
        <div className="app-cont">
          <div className="rowA">
            <div className="temp-cont">
              <p className="temp-text">Temperature</p>
              <TempGraph ref={this.tempChild} data={testtempdata}/>
              <TempInfo />
            </div>
            <div className="volt-cont">
              <p className="volt-text">Battery Voltage</p>
              <VoltGraph ref={this.voltChild} data={testvoltdata}/>
              <VoltInfo ref={this.voltInfoChild}/>
            </div>
          </div>
          <div className="speed-cont-out">
            <p className="speed-text">Speed</p>
            <div className="speed-cont-in">
              <div className="speed-cont">
                <SpeedGraph ref={this.speedChild} data={testspeeddata}/>
                <SpeedInfo ref={this.speedInfoChild}/>
              </div>
              <div className="speed-pie">
                <p>would be speed pie chart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

const testtempdata = [
  {time: 'Start', temp: 0}, {time: 'Start', temp: 0}, {time: 'Start', temp: 0},
  {time: 'Start', temp: 0}, {time: 'Start', temp: 0}, {time: 'Start', temp: 0},
  {time: 'Start', temp: 0}, {time: 'Start', temp: 0}, {time: 'Start', temp: 0}
]

const testvoltdata = [
  {time: 'Start', volt: 0}, {time: 'Start', volt: 0}, {time: 'Start', volt: 0},
  {time: 'Start', volt: 0}, {time: 'Start', volt: 0}, {time: 'Start', volt: 0},
  {time: 'Start', volt: 0}, {time: 'Start', volt: 0}, {time: 'Start', volt: 0}
]

const testspeeddata = [
  {time: 'Start', speed: 0}, {time: 'Start', speed: 0}, {time: 'Start', speed: 0},
  {time: 'Start', speed: 0}, {time: 'Start', speed: 0}, {time: 'Start', speed: 0},
  {time: 'Start', speed: 0}, {time: 'Start', speed: 0}, {time: 'Start', speed: 0},
]

const mask = 4286609885;
