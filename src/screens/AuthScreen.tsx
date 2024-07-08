import React from 'react';

import {Alert, SafeAreaView, View} from 'react-native';

import {useAuthStore} from '../hooks/useStore';
import {supabase} from '../utils/supabase';
import {flex_center, margin} from '../constants';
import Logo from '../components/Logo';
import AuthForm from '../components/AuthForm';

type formData = {
  email: string;
  password: string;
};

export const AuthScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const {login} = useAuthStore();

  async function signUpWithEmail(data: formData) {
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
      login();
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={flex_center}>
      <View style={{marginBottom: margin.large}}>
        <Logo />
      </View>
      <AuthForm loading={loading} submit={signUpWithEmail} />
    </SafeAreaView>
  );
};
