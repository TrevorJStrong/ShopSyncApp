import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {colours} from '../../constants';

type InputProps = TextInputProps & {
  width?: string;
};

const CustomInput = ({...props}: InputProps) => {
  return <TextInput style={[styles.input]} {...props} />;
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colours.primary,
    borderRadius: 5,
    paddingVertical: 10,
    marginVertical: 10,
    paddingHorizontal: 5
  },
});
