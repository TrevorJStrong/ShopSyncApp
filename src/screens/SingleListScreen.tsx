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
import CustomButton from '../components/Shared/Button';
import {ViewComponent} from '../components/Shared/View';
import LoadingIndicator from '../components/LoadingIndicator';
import {queryClient} from '../../queryClient';

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
  const [categoriesItems, setCategoriesItems] = React.useState<any>([]);

  const {data: shoppingListData, isLoading: isShoppingListLoading} = useQuery({
    queryKey: ['shopping_lists', shoppingListId],
    queryFn: () => fetchSingleShoppingList(shoppingListId),
  });

  React.useEffect(() => {
    if (shoppingListData) {
      const categorisedItems = shoppingListData[0]?.list.reduce((acc, item) => {
        if (!acc[item?.category]) {
          acc[item?.category] = [];
        }
        acc[item?.category].push(item);
        return acc;
      }, {});

      setCategoriesItems(categorisedItems);
    }
  }, [shoppingListData]);

  if (shoppingListData && shoppingListData[0]?.list?.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ViewComponent mt={20}>
          <TextComponent text="This list is empty" align="center" />
        </ViewComponent>
        <CustomButton
          onPress={() => console.log('create list')}
          title="Add Items Here"
          mt={20}
        />
      </SafeAreaView>
    );
  }

  const itemChecked = (item: any) => {
    const updatedList = shoppingListData[0].list.map((listItem: any) => {
      if (listItem.id === item.id) {
        return {
          ...listItem,
          checked: !listItem.checked,
        };
      }
      return listItem;
    });
    supabase
      .from('shopping_lists')
      .update({list: updatedList})
      .eq('id', shoppingListId)
      .then(() => {
        queryClient.invalidateQueries(['shopping_lists', shoppingListId]);
      });
  };

  const deleteItem = async (id: number) => {
    const updatedList = shoppingListData[0].list.filter(
      (listItem: any) => listItem.id !== id,
    );
    supabase
      .from('shopping_lists')
      .update({list: updatedList})
      .eq('id', shoppingListId)
      .then(() => {
        queryClient.invalidateQueries(['shopping_lists', shoppingListId]);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {isShoppingListLoading ? (
          <LoadingIndicator />
        ) : (
          Object.keys(categoriesItems).map(category => (
            <ViewComponent key={category} width="100%" mt={10}>
              <TextComponent
                size="lg"
                text={category}
                weight="bold"
                style={styles.categoryName}
              />

              {categoriesItems[category].map(item => (
                <View key={item.id} style={styles.item}>
                  <TextComponent text={item.name} />
                  <View style={styles.itemOptions}>
                    <Pressable onPress={() => itemChecked(item)}>
                      <TextComponent text={item.checked ? '✅' : '❌'} />
                    </Pressable>
                    <Pressable onPress={() => deleteItem(item.id)}>
                      <TextComponent text="Delete" />
                    </Pressable>
                  </View>
                </View>
              ))}
            </ViewComponent>
          ))
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
  categoryName: {
    padding: 5,
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
