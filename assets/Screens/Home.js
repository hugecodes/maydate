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
      haveCameraPermissions: false
    }
  }

  componentDidMount() {
    this.getAccessToCamera();
  }

  render() {
    const { haveCameraPermissions } = this.state;

    return (
      <View>
        { haveCameraPermissions && <Text>We Good</Text> }
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

  getAccessToCamera = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === 'granted') {
        this.setState({ haveCameraPermissions: true });
      }
    } catch(error) {
      console.log(error);
    }

  }

  showBlackout = () => {
    this.props.navigation.navigate('Blackout', { haveCameraPermissions: this.state.haveCameraPermissions });
  }

  showSettings = () => {
    this.props.navigation.navigate('Setup');
  }

}
