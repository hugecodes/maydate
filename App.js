import React from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
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
        />
        <Button
          title='Save and arm'
          style={{ fontSize: 28, padding: 10 }}
        />
      </View>
    );
  }

  setPhoneNumber = (phoneNumber) => {
    this.setState({ phoneNumber });
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
