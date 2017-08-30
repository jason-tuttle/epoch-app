import React, { Component } from 'react';
import { StyleSheet,
  View,
  Button,
  Text,
} from 'react-native';

class AddTimerButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  render() {
    const { onClick, addSW, addCD } = this.props;
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.addButton}>
          <Button title='＋' color='#FFFFFF' onPress={onClick}/>
        </View>
        <View style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
          <Button title='Stopwatch' onPress={addSW}/>
          <Button title='Countdown' onPress={addCD}/>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  buttonBox: {
    width: '100%'
  },
  newTimerContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#999'
  },
  addButton: {
    height: 36,
    borderColor: '#FFF',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 18,
    overflow: 'hidden',
    display: 'flex'
  },
  choiceTextOpen: {
    position: 'absolute',
    color: '#000',
    backgroundColor: '#FFF',
    left: 0,
  },
  choiceTextClosed: {
    position: 'absolute',
    color: '#000',
    backgroundColor: '#FFF',
    left: '-100%',
  }
});

export default AddTimerButton;
