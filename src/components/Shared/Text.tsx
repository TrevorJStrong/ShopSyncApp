import React from 'react';
import {Text, TextStyle} from 'react-native';
import {colours, font_sizes} from '../../constants';

type TextProps = {
  text: string;
  style?: TextStyle;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';
};

export const TextComponent = ({
  text,
  style,
  size = 'base',
  color = colours.primary,
  align = 'auto',
}: TextProps) => {
  return (
    <Text
      style={{
        ...style,
        fontSize: font_sizes[size],
        color: color,
        textAlign: align,
      }}>
      {text}
    </Text>
  );
};
