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
        { haveRecordingPermissions && <Text>We Good</Text> }
        <Button
          title='Get me out of here'
          color='#ff0000'
          onPress={ this.showBlackout }
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

  showBlackout = () => {
    this.props.navigation.navigate('Blackout');
  }

  showSettings = () => {
    this.props.navigation.navigate('Setup');
  }

}
