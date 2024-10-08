import React from 'react';
import {Text} from 'react-native';

import {colours, font_sizes} from '../../constants';
import {TextProps} from './types';

export const TextComponent = ({
  text,
  style,
  size = 'base',
  color = colours.primary,
  align = 'left',
  testId = 'text',
}: TextProps) => {
  return (
    <Text
      style={{
        ...style,
        fontSize: font_sizes[size],
        color: color,
        fontFamily: 'Montserrat-Regular',
        textAlign: align,
      }}
      testID={testId}>
      {text}
    </Text>
  );
};
