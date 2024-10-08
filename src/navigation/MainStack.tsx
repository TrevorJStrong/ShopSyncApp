import React from 'react';
import {Pressable} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ShoppingListsScreen} from '../screens/ShoppingListsScreen';
import {SingleShopListScreen} from '../screens/SingleListScreen';
import {HomeStackParamList} from './types';
import {TextComponent} from '../components/Shared/Text';
import ProfileScreen from '../screens/ProfileScreen';
import {useNavigation} from '@react-navigation/native';
import AddNewListScreen from '../screens/AddNewListScreen';
import {colours} from '../constants';
import AddProduct from '../screens/AddProduct';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HeaderIcons = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
      <TextComponent text="View Profile" />
    </Pressable>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: colours.white,
        },
      }}>
      <Stack.Screen
        name="ShoppingLists"
        component={ShoppingListsScreen}
        options={{
          headerTitle: 'Home',
          headerTransparent: false,
          headerLargeTitle: true,
          headerShadowVisible: false,
          headerLargeTitleShadowVisible: false,
          headerLargeTitleStyle: {
            color: 'black',
          },
          headerRight: () => HeaderIcons(),
        }}
      />
      <Stack.Screen
        name="AddNewList"
        component={AddNewListScreen}
        options={{headerTitle: 'Add New List'}}
      />
      <Stack.Screen
        name="SingleList"
        component={SingleShopListScreen}
        options={({route, navigation}) => ({
          headerTitle: route.params.title,
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('AddProduct', {
                  shoppingListId: route.params.id,
                });
              }}>
              <TextComponent text="Add" />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerTitle: 'Profile'}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
