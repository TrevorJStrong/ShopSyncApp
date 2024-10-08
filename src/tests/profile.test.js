import React from 'react';
import {render, screen} from '@testing-library/react-native';

import ProfileScreen from '../screens/ProfileScreen';

test('should render the profile screens', () => {
  // render ProfileScreen
  render(<ProfileScreen />);

  // get the element with the testID "logout"
  // The benefit of using screen is you no longer need to keep the render call destructure up-to-date as you add/remove the queries you need
  const profileID = screen.getByTestId('profile');

  // expect the element to contain the text "Logout"
  expect(profileID).toBeTruthy();
});
