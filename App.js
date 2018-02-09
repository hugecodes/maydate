import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { SecureStore } from 'expo';

import Navigator from './assets/Navigators';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    try {
      SecureStore.getItemAsync('phoneNumber')
      .then((phoneNumber) => {
        this.props.navigation.navigate('Home', { phoneNumber });
      })
    } catch(error) {
      this.props.navigation.navigate('Setup');
    }
  }

  render() {
    return <Navigator />;
  }
}
