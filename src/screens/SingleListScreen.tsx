import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';

import {supabase} from '../utils/supabase';
import {TextComponent} from '../components/Shared/Text';
import ModalComponent from '../components/Shared/Modal';
import CreateListForm from '../components/CreateListForm';

const fetchSingleShoppingList = async (id: number) => {
  const {data: shopping_list, error} = await supabase
    .from('shopping_lists')
    .select()
    .eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  return shopping_list;
};

export const SingleShopListScreen = ({route}) => {
  const {id: shoppingListId} = route.params;

  const [visible, setVisible] = React.useState(false);

  const {data: shoppingListData, isLoading: isShoppingListLoading} = useQuery({
    queryKey: ['shopping_lists', shoppingListId],
    queryFn: () => fetchSingleShoppingList(shoppingListId),
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {isShoppingListLoading ? (
          <TextComponent text="Loading..." />
        ) : (
          <View>
            {shoppingListData[0].list.map(item => (
              <View key={item.id} style={styles.item}>
                <TextComponent text={item.name} />
                <View style={styles.itemOptions}>
                  <TextComponent text="Edit" />
                  <TextComponent text="Done" />
                  <TextComponent text="Delete" />
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <ModalComponent visible={visible} setVisible={setVisible}>
        <CreateListForm />
      </ModalComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  itemOptions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
});
