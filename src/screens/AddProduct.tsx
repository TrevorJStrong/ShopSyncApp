import React, {useState} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import uuid from 'react-native-uuid';

import {TextComponent} from '../components/Shared/Text';
import {ViewComponent} from '../components/Shared/View';
import CustomInput from '../components/Shared/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import categories from '../utils/categories.json';
import CustomButton from '../components/Shared/Button';
import {supabase} from '../utils/supabase';
import {useShoppingList} from '../services/getShoppingList';
import {Controller, useForm} from 'react-hook-form';
import {queryClient} from '../../queryClient';

type FormData = {
  itemName: string;
  category: string;
};

const AddProduct = ({navigation, route}) => {
  const {shoppingListId} = route.params;

  const {control, handleSubmit} = useForm();

  const [open, setOpen] = useState(false);

  const {shoppingList, loading} = useShoppingList(shoppingListId);

  const submit = async (formData: FormData) => {
    const newItem = {
      id: uuid.v4(),
      name: formData.itemName,
      category: formData.category,
    };

    const {error} = await supabase
      .from('shopping_lists')
      .update({
        list: [...(shoppingList?.list ?? []), newItem],
      })
      .eq('id', shoppingListId);

    if (error) {
      throw new Error(error.message);
    }

    navigation.goBack();
  };

  const {mutate} = useMutation({
    mutationFn: submit,
    onSuccess: () => {
      queryClient.refetchQueries(['shopping_lists']);
      Alert.alert('Item added to the list');
    },
    onError: error => {
      Alert.alert('Error adding item', error.message);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ViewComponent mt={40}>
        <TextComponent text="Add Item" size="3xl" align="center" />
      </ViewComponent>
      <ViewComponent mt={40}>
        <Controller
          name="itemName"
          control={control}
          render={({field: {onChange, value}}) => (
            <CustomInput
              placeholder="Item Name"
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
        />
      </ViewComponent>
      <ViewComponent mt={10} w={'90%'}>
        <Controller
          name="category"
          control={control}
          render={({field: {onChange, value}}) => (
            <DropDownPicker
              schema={{
                label: 'category',
                value: 'category',
              }}
              open={open}
              value={value}
              items={categories as any}
              itemKey="category"
              setOpen={setOpen}
              setValue={onChange}
              onChangeValue={selectedValue => {
                onChange(selectedValue);
              }}
              placeholder={'Select a category'}
              containerStyle={[styles.dropDown, {marginBottom: open ? 200 : 0}]}
              textStyle={{
                fontFamily: 'Montserrat-Regular',
              }}
              placeholderStyle={{
                color: '#BDBDBD',
              }}
            />
          )}
        />
      </ViewComponent>
      <CustomButton
        title="Add Item"
        onPress={handleSubmit(formData => mutate(formData))}
        // loading={loading}
        mt={50}
      />
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  dropDown: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
  },
});
