import React from 'react';
import { StyleSheet, StatusBar, TouchableWithoutFeedback, View, Vibration } from 'react-native';
import { SecureStore } from 'expo';

export default class Home extends React.Component {
  static navigationOptions = {
    header: null, // Hide the nav bar
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onLongPress={ this.getMeOutOfHere }
        delayLongPress={ 1000 }
      >
        <View style={ styles.container }>
          <StatusBar hidden={ true } />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  getMeOutOfHere = () => {
    SecureStore.getItemAsync('phoneNumber').then((phoneNumber) => {
      if (!phoneNumber) {
        return;
      }
      Vibration.vibrate(500);
      fetch(`http://52.207.221.31:3000/call?number=${ phoneNumber }`);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
