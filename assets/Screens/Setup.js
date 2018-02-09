import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { SecureStore } from 'expo';

export default class Setup extends React.Component {
  static navigationOptions = {
    title: 'Settings',
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
      <View style={ styles.container }>
        <TextInput
          style={ styles.input }
          keyboardType='phone-pad'
          placeholder='Put yer number here'
          onChangeText={ this.setPhoneNumber }
          value={ this.state.phoneNumber }
        />
        <Button
          title='Save'
          onPress={ this.savePhoneNumber }
        />
        <Button
          title='Delete my number'
          onPress={ this.deleteNumber }
        />
      </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    height: 40,
    width: '80%',
    fontSize: 24,
    marginTop: 30,
    marginBottom: 30,
    padding: 5,
  }
});
