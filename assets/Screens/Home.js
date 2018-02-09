import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SecureStore, Permissions } from 'expo';

import Logo from '../elements/Logo';
import BodyText from '../elements/BodyText';
import FadedBodyText from '../elements/FadedBodyText';
import Button from '../elements/Button';
import TextButton from '../elements/TextButton';

export default class Home extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      haveCameraPermissions: false,
      haveAudioPermissions: false
    }
  }

  componentDidMount() {
    this.getAccessToCamera();
    this.getAccessToAudio();
  }

  render() {
    return (
      <View style={ styles.container }>
        <Logo style={{ marginBottom: 0 }}/>
        <BodyText>
          Your phone will be called in 2 minutes after you set off one of the following triggers:
        </BodyText>
        <FadedBodyText>
          Tap and hold anywhere on the screen for 1 second
        </FadedBodyText>
        <FadedBodyText>
          Stare directly at your phone for 3 seconds
        </FadedBodyText>
        <Button onPress={ this.showBlackout }>
          Let's go.
        </Button>
        <TextButton onPress={ this.showSettings }>
          Settings
        </TextButton>
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

  getAccessToAudio = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (status === 'granted') {
        this.setState({ haveAudioPermissions: true });
      }
    } catch(error) {
      console.log(error);
    }
  }

  showBlackout = () => {
    this.props.navigation.navigate('Blackout', {
      haveCameraPermissions: this.state.haveCameraPermissions,
      haveAudioPermissions: this.state.haveAudioPermissions
    });
  }

  showSettings = () => {
    this.props.navigation.navigate('Setup');
  }

}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#2f2f2f',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
};
