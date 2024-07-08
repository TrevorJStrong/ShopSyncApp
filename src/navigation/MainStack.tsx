import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ShoppingListsScreen} from '../screens/ShoppingListsScreen';
import {SingleShopListScreen} from '../screens/SingleListScreen';
import {AuthScreen} from '../screens/AuthScreen';
import {useAuthStore} from '../hooks/useStore';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
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
            }}
          />
          <Stack.Screen
            name="SingleShoppingList"
            component={SingleShopListScreen}
          />
        </>
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
