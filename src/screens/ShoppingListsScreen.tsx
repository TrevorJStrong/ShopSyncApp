import React from 'react';

import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery} from '@tanstack/react-query';

import {supabase} from '../utils/supabase';
import {TextComponent} from '../components/Shared/Text';
import {AddNewListBtn} from '../components/AddNewListBtn';
import {DataItem} from '../types';
import {ListItem} from '../components/Shared/ListItem';
import {HomeStackParamList} from '../navigation/types';

type ScreenProps = NativeStackScreenProps<HomeStackParamList, 'ShoppingLists'>;

const EmptyComponent = () => (
  <View>
    <TextComponent text="No shopping lists found" />
  </View>
);

const fetchLists = async (): Promise<DataItem[]> => {
  const {data: user} = await supabase.auth.getUser();

  const {data: shoppingLists, error} = await supabase
    .from('shopping_lists')
    .select('*')
    .eq('user_id', user?.user?.id);

  if (error) {
    throw new Error(error.message);
  }

  return shoppingLists;
};
export const ShoppingListsScreen = ({navigation}: ScreenProps) => {
  const {
    data: shoppingLists = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['shopping_lists'],
    queryFn: fetchLists,
  });

  if (isLoading) {
    return (
      <SafeAreaView>
        <TextComponent text="Loading..." />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView>
        <TextComponent text="Error loading lists" />
      </SafeAreaView>
    );
  }

  function renderList({item}: {item: DataItem}) {
    return (
      <View>
        <ListItem id={item.id} title={item.title} />
      </View>
    );
  }

  // const renderList = React.memo(({item}: {item: DataItem}) => (
  //   <ListItem key={item.id} id={item.id} title={item.title} />
  // ));

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shoppingLists}
        renderItem={renderList}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100, paddingTop: 10}}
        ListEmptyComponent={EmptyComponent}
        ListFooterComponent={
          <AddNewListBtn
            title="Add New List"
            onPress={() => navigation.navigate('AddNewList')}
          />
        }
        // Performance props
        maxToRenderPerBatch={20} // Increase the number of items per batch
        updateCellsBatchingPeriod={100} // Increase the time interval between updates
        windowSize={11} // Reduce the number of screens to render
        removeClippedSubviews={true} // Remove offscreen views
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
