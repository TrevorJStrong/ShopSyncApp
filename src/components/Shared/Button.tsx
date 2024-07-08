import React from 'react';
import {Pressable, StyleSheet, ActivityIndicator, View, DimensionValue} from 'react-native';
import {TextComponent} from './Text';
import {colours} from '../../constants';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  buttonColour?: string;
  textColour?: string;
  loading: boolean;
  icon?: React.ReactNode;
  accessibilityLabel?: string;
  mt?: number;
  mb?: number;
  w?: DimensionValue;
};

const CustomButton = ({
  title,
  onPress,
  variant = 'contained',
  buttonColour,
  textColour = colours.white,
  loading = false,
  icon = null,
  accessibilityLabel,
  mt = 0,
  mb = 0,
  w = '90%',
}: ButtonProps) => {
  let buttonStyle;
  // let textStyle;
  let iconElement;

  if (variant === 'contained') {
    buttonStyle = {
      ...styles.contained,
      backgroundColor: buttonColour ?? colours.primary,
    };
    // textStyle = {color: textColour ?? colours.white};
  } else if (variant === 'outlined') {
    buttonStyle = {
      ...styles.outlined,
      borderColor: buttonColour ?? colours.primary,
    };
    // textStyle = {color: buttonColour ?? colours.primary};
  } else {
    buttonStyle = styles.text;
    // textStyle = {color: buttonColour ?? colours.primary};
  }

  if (loading) {
    buttonStyle = {
      ...buttonStyle,
      opacity: 0.7,
    };
  }

  if (icon) {
    iconElement = <View style={styles.icon}>{icon}</View>;
  }

  return (
    <Pressable
      style={[
        buttonStyle,
        loading && styles.disabled,
        {marginTop: mt, marginBottom: mb, width: w},
      ]}
      onPress={!loading ? onPress : undefined}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color={textColour ?? colours.white} />
      ) : (
        <View style={styles.content}>
          {iconElement}
          <TextComponent text={title} color={textColour} />
        </View>
      )}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  contained: {
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  outlined: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  text: {
    padding: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  disabled: {
    opacity: 0.7,
  },
});
