import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TextComponent} from './Text';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.container}>
      <TextComponent text="Go Back" />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
  },
});
