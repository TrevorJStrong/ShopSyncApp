import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import Config from 'react-native-config';

import {queryClient} from './queryClient';
import RootStack from './src/navigation';
import {useAuthStore} from './src/hooks/useStore';

if (__DEV__) {
  require('./reactotron.ts');
}
const App = () => {
  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize(Config.ONESIGNAL_APP_ID ?? '');

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
