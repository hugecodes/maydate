import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { SecureStore } from 'expo';

export default class Home extends React.Component {
  static navigationOptions = {
    title: '𝕄𝔸𝕐𝔻𝔸𝕋𝔼',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Button
          title='Get me out of here'
          color='#ff0000'
          onPress={ this.getMeOutOfHere }
        />
        <Button
          title='Settings'
          onPress={ this.showSettings }
        />
      </View>
    )
  }

  getMeOutOfHere = () => {
    SecureStore.getItemAsync('phoneNumber').then((phoneNumber) => {
      if (!phoneNumber) {
        return;
      }
      fetch(`http://52.207.221.31:3000/call?number=${ phoneNumber }`);
    });
  }

  showSettings = () => {
    this.props.navigation.navigate('Setup');
  }

}
