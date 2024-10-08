import React from 'react';

import {SafeAreaView, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

import CustomInput from '../Shared/Input';
import CustomButton from '../Shared/Button';
import {flex_center, margin} from '../../constants';
import Logo from '../Logo';
import { TextComponent } from '../Shared/Text';
import { ViewComponent } from '../Shared/View';

type formData = {
  email: string;
  password: string;
};

const RegisterForm = ({submit, loading}) => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: formData) => {
    submit(data);
  };

  return (
    <SafeAreaView style={flex_center}>
      <ViewComponent mb={30}>
        <TextComponent size="3xl" align="center" text="Register" />
      </ViewComponent>
      <Controller
        name="firstName"
        control={control}
        render={({field: {onChange, value}}) => (
          <CustomInput
            placeholder="Enter your first name..."
            onChangeText={value => onChange(value)}
            value={value}
            width="80%"
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({field: {onChange, value}}) => (
          <CustomInput
            placeholder="Enter your last name..."
            onChangeText={value => onChange(value)}
            value={value}
            width="80%"
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({field: {onChange, value}}) => (
          <CustomInput
            placeholder="Enter your email address..."
            keyboardType="email-address"
            onChangeText={value => onChange(value)}
            value={value}
            width="80%"
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
            width="80%"
          />
        )}
      />

      <CustomButton
        title="Sign Up"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        mt={50}
      />
    </SafeAreaView>
  );
};

export default RegisterForm;
