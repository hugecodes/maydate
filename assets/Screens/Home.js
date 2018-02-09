import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Permissions } from 'expo';

export default class Home extends React.Component {

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

}