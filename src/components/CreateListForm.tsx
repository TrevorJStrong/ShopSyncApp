import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomInput from './Shared/Input';
import CustomButton from './Shared/Button';

const CreateListForm = () => {
  return (
    <View style={styles.form}>
      <View>
        <CustomInput placeholder="List Name" />
      </View>
      <CustomButton
        title="Create List"
        onPress={() => console.log('Create List')}
        w={'100%'}
      />
    </View>
  );
};

export default CreateListForm;

const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    gap: 10,
    width: '90%',
  },
});
