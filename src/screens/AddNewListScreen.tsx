import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

import CustomInput from '../components/Shared/Input';
import CustomButton from '../components/Shared/Button';
import {align_middle} from '../constants';
import {createList} from '../services/createList';
type formData = {
  listName: string;
};

const AddNewListScreen = () => {
  const {control, handleSubmit} = useForm();

  const onSubmit = (data: formData) => {
    createList(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[align_middle as any, {marginTop: 20}]}>
          <View>
            <Controller
              name="listName"
              control={control}
              render={({field: {onChange, value}}) => (
                <CustomInput
                  placeholder="List Name"
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
      <CustomButton
        title="Create List"
        onPress={handleSubmit(onSubmit)}
        w={'90%'}
        mb={30}
      />
    </SafeAreaView>
  );
};

export default AddNewListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
});
