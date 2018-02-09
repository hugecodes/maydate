import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { SecureStore, Permissions } from 'expo';

export default class Home extends React.Component {
  static navigationOptions = {
    title: '𝕄𝔸𝕐𝔻𝔸𝕋𝔼',
  };

  constructor(props) {
    super(props);

    this.state = {
      haveRecordingPermissions: false
    }
  }

  componentDidMount() {
    this.getAccessToRecording();
  }

  render() {
    const { haveRecordingPermissions } = this.state;

    return (
      <View>
        <Text>Home Screen</Text>
        { haveRecordingPermissions && <Text>We Good</Text> }
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

  getAccessToRecording = async () => {
    console.log('running');
    try {
      const { status } = await Permissions.askAsync(Permissions.CONTACTS);
      if (status === 'granted') {
        this.setState({ haveRecordingPermissions: true });
      }
    } catch(error) {
      console.log(error);
    }
    
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
