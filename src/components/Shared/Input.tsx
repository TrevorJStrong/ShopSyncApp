import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import { colours } from '../../constants';

const CustomInput = ({...props}: TextInputProps) => {
  return <TextInput style={styles.input} {...props} />;
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colours.primary,
    borderRadius: 5,
    paddingVertical: 10,
    width: '90%', // 90% of the parent component
    marginVertical: 10,
    paddingHorizontal: 5,
  },
});
