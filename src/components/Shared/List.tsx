import React from 'react';
import {FlatList} from 'react-native';
import {TextComponent} from './Text';

const List = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      renderItem={({item}) => <TextComponent text={String(item)} />}
      keyExtractor={item => item.toString()}
    />
  );
};

export default List;
