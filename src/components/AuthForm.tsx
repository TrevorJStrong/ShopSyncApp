import React from 'react';

import {SafeAreaView, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

import CustomInput from '../components/Shared/Input';
import CustomButton from '../components/Shared/Button';
import {flex_center, margin} from '../constants';
import Logo from '../components/Logo';

type formData = {
  email: string;
  password: string;
};

const AuthForm = ({submit, loading}) => {
  const {control, handleSubmit} = useForm();

  const onSubmit = (data: formData) => {
    submit(data);
  };

  return (
    <SafeAreaView style={flex_center}>
      <View style={{marginBottom: margin.large}}>
        <Logo />
      </View>
      <Controller
        name="email"
        control={control}
        render={({field: {onChange, value}}) => (
          <CustomInput
            placeholder="Enter your email address..."
            keyboardType="email-address"
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({field: {onChange, value}}) => (
          <CustomInput
            placeholder="Enter your password..."
            secureTextEntry={true}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
      />
      <CustomButton
        title="Sign Up"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        mt={10}
      />
    </SafeAreaView>
  );
};

export default AuthForm;
