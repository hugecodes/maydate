import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

import Button from '../elements/Button';
import Logo from '../elements/Logo';
import BodyText from '../elements/BodyText';

export default class Welcome extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ styles.container }>
        <Logo />
        <Text style={ styles.header }>Welcome</Text>
        <Text style={ styles.header }>to Maydate.</Text>
        <BodyText style={ styles.body }>
          Never sit through a bad date again.
        </BodyText>
        <Button onPress={ this.showSettings }>
          Get started!
        </Button>
      </View>
    );
  }

  showSettings = () => {
    this.props.navigation.navigate('Setup');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2F2F',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    color: '#fff',
    fontSize: 52,
    lineHeight: 52,
    textAlign: 'center',
    fontFamily: 'open-sans-regular',
  },
});
