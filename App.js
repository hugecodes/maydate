import React from 'react';
import { SecureStore } from 'expo';
import { StackNavigator } from 'react-navigation';

import Home from './assets/Screens/Home';
import Setup from './assets/Screens/Setup';

const routes = {
  Setup: { screen: Setup },
  Home: { screen: Home },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: null,
      phoneNumberChecked: false,
    };
  }

  componentDidMount() {
    try {
      SecureStore.getItemAsync('phoneNumber').then((phoneNumber) => {
        this.setState({ phoneNumber, phoneNumberChecked: true });
      });
    } catch(error) {
      this.setState({ phoneNumberChecked: true });
    }
  }

  render() {
    if (!this.state.phoneNumberChecked) {
      return null;
    }

    return React.createElement(StackNavigator(routes, {
      initialRouteName: this.state.phoneNumber ? 'Home' : 'Setup',
      initialRouteParams: {
        phoneNumber: this.state.phoneNumber,
      },
    }));
  }
}
