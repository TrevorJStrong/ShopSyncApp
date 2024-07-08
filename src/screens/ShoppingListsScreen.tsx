import React, {Fragment, useEffect, useState} from 'react';

import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {supabase} from '../utils/supabase';
import {TextComponent} from '../components/Shared/Text';

const fetchLists = async () => {
  const {data: shopping_lists, error} = await supabase
    .from('shopping_lists')
    .select('*');

  console.log(shopping_lists, 'users');

  if (error) {
    console.log('error', error);
  }
};

export const ShoppingListsScreen = () => {
  fetchLists();

  const renderList = ({item}) => {
    return (
      <View key={item.id}>
        <TextComponent text={item.name} />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={shopping_lists}
        renderItem={({item}) => {
          renderList({item});
        }}
        keyExtractor={item => item.toString()}
      />
    </SafeAreaView>
  );
};
