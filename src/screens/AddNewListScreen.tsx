import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

import CustomInput from '../components/Shared/Input';
import CustomButton from '../components/Shared/Button';
import {align_middle} from '../constants';
import {createList} from '../services/createList';
import {useNavigation} from '@react-navigation/native';
import {queryClient} from '../../queryClient';
type formData = {
  listName: string;
};

const AddNewListScreen = () => {
  const {control, handleSubmit} = useForm();
  const [loading, setLoading] = React.useState(false);

  const navigation = useNavigation();

  const onSubmit = async (data: formData) => {
    setLoading(true);
    try {
      await createList(data);
      queryClient.refetchQueries(['shopping_lists'] as any);
      navigation.navigate('ShoppingLists');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
        loading={loading}
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
