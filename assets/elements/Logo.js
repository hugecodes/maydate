import React from 'react';
import { StyleSheet, Image } from 'react-native';

export default (props) => {
  return (
    <Image
      source={ require('../logo.png') }
      style={ styles.logo }
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 120,
    resizeMode: Image.resizeMode.contain,
    marginTop: 80,
  },
});
