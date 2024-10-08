import React from 'react';

import {Alert, SafeAreaView} from 'react-native';

import {useAuthStore} from '../hooks/useStore';
import {supabase} from '../utils/supabase';
import {flex_center} from '../constants';
import RegisterForm from '../components/Forms/RegisterForm';
import BackButton from '../components/Shared/BackButton';

type formData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const RegisterScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const {login} = useAuthStore();

  async function signUp(data: formData) {
    setLoading(true);
    const {
      data: {session},
      error,
    } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
      },
    });

    if (session) {
      console.log(session, 'logged in');
      login(session.access_token);
    }

    if (error) {
      Alert.alert(error.message);
    }

    setLoading(false);
  }

  return (
    <SafeAreaView style={flex_center}>
      <BackButton />
      <RegisterForm loading={loading} submit={signUp} />
    </SafeAreaView>
  );
};
