import React from 'react';
import {View, StyleSheet, Pressable, Alert} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import {TextComponent} from './Text';
import {supabase} from '../../utils/supabase';
import {useMutation} from '@tanstack/react-query';
import {queryClient} from '../../../queryClient';

type ListItemProps = {
  id: number;
  title: string;
};

const deleteList = async (id: number) => {
  console.log('id', id);
  const {error, data, status} = await supabase
    .from('shopping_lists')
    .delete()
    .eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  if (status) {
    console.log('status', status);
  }
  if (data) {
    console.log('data', data);
  }
};

export const ListItem = ({id, title}: ListItemProps) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const {mutate} = useMutation({
    mutationFn: () => deleteList(id),
    onSuccess: () => {
      queryClient.refetchQueries(['shopping_lists'] as any);
      Alert.alert('List deleted');
    },
    onError: () => {
      Alert.alert('Error deleting list');
    },
  });

  const deleteAlert = id => {
    Alert.alert('Delete List', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => mutate(id),
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextComponent text={title} />
      </View>
      <View style={styles.icons}>
        <Pressable
          onPress={() =>
            navigation.navigate('SingleList', {
              id,
              title,
            })
          }>
          <TextComponent text="Edit" />
        </Pressable>
        <Pressable onPress={() => deleteAlert(id)}>
          <TextComponent text="Delete" />
        </Pressable>
        <TextComponent text="Share" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
});
