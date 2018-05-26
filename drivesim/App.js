import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
import * as firebase from 'firebase'
import {Audio } from 'expo'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      caron: false,
      speed: 0,
      temp: 65,
      voltage: 0
    }
    this.soundObject = new Audio.Sound();

  }

  componentDidMount=()=>{

    this.soundObject.loadAsync(require('./carstart.mp3')).then(()=>console.log("sound loaded"));

    var config = {
      apiKey: "AIzaSyDsv583oj2DgoPL6Rqt-e-oB2t_VWCnPOw",
      authDomain: "parsedrive-7874e.firebaseapp.com",
      databaseURL: "https://parsedrive-7874e.firebaseio.com",
      projectId: "parsedrive-7874e",
      storageBucket: "",
      messagingSenderId: "451356055475"
    };
    firebase.initializeApp(config);
    this.timer = setInterval(()=>{this.sendData()}, 1000);
  }

  sendData=()=>{
    if (this.state.caron){
      let newref = firebase.database().ref('/packets/'+new Date())

      let bitvoltage = this.state.voltage << 7
      let bitspeed = this.state.speed << 15
      let finalint = bitspeed | bitvoltage | this.state.temp
      newref.set(finalint)

      let mask = 4286609885
      let previousrow = 0
      let step1 = finalint ^ previousrow
      let step2 = step1 & mask
      console.log(finalint.toString(2))
    }

  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{alignItems: 'center',justifyContent: 'center', paddingTop: 25, width: '100%', height: 85, backgroundColor: this.state.caron?'green':'red'}}
          onPress={()=>{
            if (!this.state.caron){
              this.soundObject.setPositionAsync(0).then(()=>console.log("sound reset"));
              this.soundObject.playAsync().then(()=>{console.log("sound played")})
            }
            this.setState({caron: !this.state.caron, voltage: (this.state.caron?0:142), speed: 0})
          }}
        >
          <Text style={{color: 'white', fontSize: 20}}>{"Engine: " + (this.state.caron? "On": "Off")}</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 18, padding: 15}}> Miles Per Hr ({this.state.speed}) </Text>
        <Slider
          value={0}
          onValueChange={(value)=>{this.setState({speed: value})}}
          minimumValue={0}
          maximumValue={250}
          step={1}
          disabled={!this.state.caron}
        />
        <Text style={{fontSize: 18, padding: 15}}> Voltage ({this.state.voltage/10.0}) </Text>

        <Slider
          onValueChange={(value)=>{this.setState({voltage: value})}}
          minimumValue={127}
          maximumValue={150}
          value={this.state.caron?142:0}
          step={1}
          disabled={!this.state.caron}
        />
        <Text style={{fontSize: 18, padding: 15}}> Temp ({this.state.temp}) </Text>
        <Slider
          value={this.state.caron?65:0}
          onValueChange={(value)=>{
            this.setState({temp: value})
          }}
          minimumValue={0}
          maximumValue={120}
          step={1}
          disabled={!this.state.caron}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
