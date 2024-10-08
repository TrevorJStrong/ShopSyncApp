import React from 'react';
import {render} from '@testing-library/react-native';
import CustomButton from '../components/Shared/Button';

describe('CustomButton component', () => {
  test('renders correctly', () => {
    const {getByTestId} = render(<CustomButton text="test" />);

    const buttonID = getByTestId('button');

    expect(buttonID).toBeTruthy();
  });

  test('renders text correctly', () => {
    // Arrange
    const {getByText, getByTestId} = render(
      <CustomButton title="Test Button" onPress={() => {}} />,
    );

    // Act
    const buttonText = getByText('Test Button');

    // Assert
    expect(buttonText).toBeTruthy();

    const buttonID = getByTestId('button');
    expect(buttonID).toBeTruthy();
  });
});
