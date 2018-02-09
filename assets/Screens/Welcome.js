import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

import Button from '../elements/Button';

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
        <Image
          source={ require('../logo.png') }
          style={ styles.logo }
        />
        <Text style={ styles.header }>Welcome</Text>
        <Text style={ styles.header }>to Maydate.</Text>
        <Text style={ styles.body }>Never sit through a bad date again.</Text>
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
  logo: {
    height: 120,
    resizeMode: Image.resizeMode.contain,
    marginTop: 80,
    marginBottom: 40,
  },
  header: {
    color: '#fff',
    fontSize: 52,
    lineHeight: 52,
    textAlign: 'center',
    fontFamily: 'open-sans-regular',
  },
  body: {
    color: '#fff',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'open-sans-regular',
    width: '80%',
    marginTop: 40,
    marginBottom: 40,
  },
});
