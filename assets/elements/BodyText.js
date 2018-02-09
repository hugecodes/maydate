import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default (props) => {
  return (
    <Text style={ styles.body }>
      { props.children }
    </Text>
  );
};

const styles = StyleSheet.create({
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
