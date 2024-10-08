import React from 'react';
import {Keyboard} from 'react-native';

export const useKeyboard = () => {
  const [isKeyboardActive, setIsKeyboardActive] = React.useState(false);

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardActive(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardActive(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isKeyboardActive;
};
