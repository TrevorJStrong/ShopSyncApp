import React from 'react';

import {Alert, SafeAreaView} from 'react-native';

import {useAuthStore} from '../hooks/useStore';
import {supabase} from '../utils/supabase';
import {flex_center} from '../constants';
import LoginForm from '../components/Forms/LoginForm';

type formData = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const {login} = useAuthStore();

  async function signIn(data: formData) {
    setLoading(true);
    const {
      data: {session},
      error,
    } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) Alert.alert(error.message);
    if (!session) {
      Alert.alert('Please check your inbox for email verification!');
    }
    if (session) {
      console.log(session, 'logged in');
      login(session.access_token);
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={flex_center}>
      <LoginForm loading={loading} submit={signIn} />
    </SafeAreaView>
  );
};
