import React from 'react';
import CustomButton from './Shared/Button';
import {StyleSheet, View} from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export const AddNewListBtn = ({title, onPress}: ButtonProps) => {
  return (
    <View style={styles.button}>
      <CustomButton title={title} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
  },
});
