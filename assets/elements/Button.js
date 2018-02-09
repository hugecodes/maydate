import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default (props) => {
  return (
    <TouchableOpacity style={ styles.button } onPress={ props.onPress }>
      <Text style={ styles.text }>{ props.children }</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    width: '80%',
  },
  text: {
    fontSize: 26,
    color: '#2F2F2F',
    textAlign: 'center',
    fontFamily: 'plain-regular',
  },
});
