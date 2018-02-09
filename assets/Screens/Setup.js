import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { SecureStore } from 'expo';

export default class Setup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: null,
    };
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
          onPress={ this.savePhoneNumber }
        />
        <View style={{ marginTop: 40 }}>
          <Button
            title='Get me out of here'
            color='#ff0000'
            onPress={ this.getMeOutOfHere }
          />
        </View>
      </View>
    );
  }

  setPhoneNumber = (phoneNumber) => {
    const cleanNum = phoneNumber.replace(/-/g, '');
    this.setState({ phoneNumber: cleanNum });
  }

  savePhoneNumber = () => {
    const number = this.state.phoneNumber;
    SecureStore.setItemAsync('phoneNumber', number).then(() => {
      this.props.navigation.navigate('Home', { number });
    });
  }

  getMeOutOfHere = () => {
    fetch(`http://52.207.221.31:3000/call?number=${ this.state.phoneNumber }`);
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