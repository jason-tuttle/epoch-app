import React from 'react';
import { StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  Image,
  Switch,
  SegmentedControlIOS,
} from 'react-native';
import AddTimerButton from './AddTimerButton';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: {},
      timerIsRunning: false,
      time: 0,
      timeString: '0:00',
      startTime: null,
      stopTime: null,
    }
  }

  updateTime = () => {
    const {startTime} = this.state;
    let theTime = null;
    // get the current time
    const now = new Date(Date.now());
    if (this.state.timerIsRunning) {
      // increment the count if we're timing (so we can use this for reset, too)
      theTime = Math.round((now - startTime) / 1000);
    }
    const mins = Math.floor(theTime / 60);
    const ss = (theTime % 60) % 10;
    const s = Math.floor((theTime % 60) / 10);
    // set the time string into state for display
    this.setState({time: theTime, timeString: `${mins}:${s}${ss}`});
  }

  addTimer = () => {
    console.log('added');
  }

  runTimer = () => {
    // if we're not timing, create a new timer and save in state
    if (!this.state.timerIsRunning) {
      const newTimer = setInterval(this.updateTime, 1000);
      const startTime = new Date(Date.now());
      this.setState({timer: newTimer, startTime});
    } else {
      clearInterval(this.state.timer);
      const stopTime = new Date(Date.now());
      this.setState({...this.state, stopTime})
    }
    this.setState({timerIsRunning: !this.state.timerIsRunning});
  }

  resetTimer = () => {
    this.setState({time: 0, timerIsRunning: false, timeString: '0:00', startTime: null, stopTime: null});
  }

  render() {
    const {timerIsRunning, timeString, startTime, stopTime} = this.state;
    let startTimeString = startTime ? startTime.toTimeString() : '';
    startTimeString = startTimeString.split(' ')[0];
    let stopTimeString = stopTime ? stopTime.toTimeString() : '';
    stopTimeString = stopTimeString.split(' ')[0];
    let buttonText = (timerIsRunning ? 'Stop' : 'Start');
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcome}>EPOCH</Text>
        </View>
        <View style={styles.timer}>
          <View style={styles.timerSubDisplay}>
            <Text style={styles.subLabel}>Started</Text>
            <Text style={styles.subLabel}>{startTimeString}</Text>
            <Text style={styles.subLabel}>Stopped</Text>
            <Text style={styles.subLabel}>{stopTimeString}</Text>
          </View>
          <Text style={styles.timerDisplay}>{timeString}</Text>
        </View>
        <View style={{flex: 0, flexDirection: 'row', alignItems: 'center'}}>
          <Button title={buttonText} color={timerIsRunning ? "#FF0000" : "#00AA00"} onPress={this.runTimer}/>
          <Button title='Reset' color="#AA3333" onPress={this.resetTimer}/>
        </View>
        <View style={styles.addContainer}>
          <AddTimerButton onClick={this.addTimer} addSW={this.addTimer} addCD={this.addTimer} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  header: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 40,
    backgroundColor: '#666666'
  },
  addContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#666666'
  },
  welcome: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  h1: {
    fontFamily: 'Helvetica',
    fontSize: 48,
    fontWeight: 'bold',
  },
  smallImg: {
    width: 100,
    height: 100,
  },
  timer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333333',
  },
  timerDisplay: {
    textAlign: 'right',
    fontSize: 100,
    color: '#FFFFFF',
  },
  timerSubDisplay: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  label: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subLabel: {
    color: '#999999',
    fontWeight: '100',
  }
});
