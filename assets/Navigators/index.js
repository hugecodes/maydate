import React from 'react';
import { StackNavigator } from 'react-navigation';

import SetupScreen from '../Screens/Setup';
import HomeScreen from '../Screens/Home';

export default StackNavigator({
  Setup:  {
    screen: SetupScreen
  },
  Home:  {
    screen: HomeScreen
  }
});