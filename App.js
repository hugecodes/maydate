import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { SecureStore } from 'expo';

export default class App extends React.Component {
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
        <Text>Phone number to call:</Text>
        <TextInput
          style={ styles.input }
          keyboardType='phone-pad'
          placeholder='Put yer number here'
          onChangeText={ this.setPhoneNumber }
          value={ this.state.phoneNumber }
        />
        <Button
          title='Save'
          style={{ fontSize: 28, padding: 10 }}
          onPress={ this.savePhoneNumber }
        />
      </View>
    );
  }

  setPhoneNumber = (phoneNumber) => {
    this.setState({ phoneNumber });
  }

  savePhoneNumber = () => {
    SecureStore.setItemAsync('phoneNumber', this.state.phoneNumber);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 150,
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
