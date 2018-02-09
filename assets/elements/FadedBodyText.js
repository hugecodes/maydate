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
    color: '#9B9B9B',
    fontSize: 20,
    textAlign: 'left',
    fontFamily: 'plain-regular',
    width: '80%',
    marginBottom: 20,
  },
});
