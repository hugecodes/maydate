import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default (props) => {
  return (
    <Text style={ styles.delete } onPress={ props.onPress }>
      { props.children }
    </Text>
  );
};

const styles = StyleSheet.create({
  delete: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 16,
    padding: 15,
  },
});
