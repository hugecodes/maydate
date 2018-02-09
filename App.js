import React from 'react';
import { SecureStore, Font } from 'expo';
import { StackNavigator } from 'react-navigation';

import Home from './assets/Screens/Home';
import Setup from './assets/Screens/Setup';
import Blackout from './assets/Screens/Blackout';
import Welcome from './assets/Screens/Welcome';

const routes = {
  Setup: { screen: Setup },
  Home: { screen: Home },
  Blackout: { screen: Blackout },
  Welcome: { screen: Welcome },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: null,
      phoneNumberChecked: false,
      fontsLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-regular': require('./assets/Open_Sans/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/Open_Sans/OpenSans-Bold.ttf'),
    });

    try {
      SecureStore.getItemAsync('phoneNumber').then((phoneNumber) => {
        this.setState({ phoneNumber, phoneNumberChecked: true, fontsLoaded: true });
      });
    } catch(error) {
      this.setState({ phoneNumberChecked: true, fontsLoaded: true });
    }
  }

  render() {
    if (!this.state.phoneNumberChecked) {
      return null;
    }

    return React.createElement(StackNavigator(routes, {
      initialRouteName: this.state.phoneNumber ? 'Home' : 'Welcome',
      initialRouteParams: {
        phoneNumber: this.state.phoneNumber,
      },
    }));
  }
}
