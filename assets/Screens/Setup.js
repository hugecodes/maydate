import React from 'react';
import { StyleSheet, Text, TextInput, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SecureStore } from 'expo';

import Logo from '../elements/Logo';
import BodyText from '../elements/BodyText';
import Button from '../elements/Button';
import TextButton from '../elements/TextButton';

export default class Setup extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: null,
    };
  }

  componentDidMount() {
    SecureStore.getItemAsync('phoneNumber').then((phoneNumber) => {
      this.setState({ phoneNumber });
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={ styles.container }>
          <Logo />
          <BodyText style={ styles.body }>
            Enter your phone number:
          </BodyText>
          <TextInput
            style={ styles.input }
            keyboardType='phone-pad'
            placeholder='xxx-xxx-xxxx'
            placeholderTextColor='#9B9B9B'
            onChangeText={ this.setPhoneNumber }
            value={ this.state.phoneNumber }
            underlineColorAndroid='transparent'
          />
          <Button onPress={ this.savePhoneNumber }>
            Next
          </Button>
          <TextButton onPress={ this.deleteNumber }>
            Delete my number
          </TextButton>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  setPhoneNumber = (phoneNumber) => {
    const cleanNum = phoneNumber.replace(/-/g, '');
    this.setState({ phoneNumber: cleanNum });
  }

  savePhoneNumber = () => {
    const phoneNumber = this.state.phoneNumber || '';
    SecureStore.setItemAsync('phoneNumber', phoneNumber).then(() => {
      this.props.navigation.navigate('Home', { phoneNumber });
    });
  }

  deleteNumber = () => {
    SecureStore.deleteItemAsync('phoneNumber');
    this.setState({ phoneNumber: null });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2f2f',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    width: '80%',
    fontSize: 28,
    marginBottom: 30,
    paddingBottom: 20,
    color: '#9B9B9B',
    textAlign: 'center',
    textAlignVertical: 'top',
    borderBottomColor: '#9B9B9B',
    borderBottomWidth: 1,
  },
});
