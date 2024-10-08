import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {TextComponent} from '../components/Shared/Text';
import CustomButton from '../components/Shared/Button';
import {useAuthStore} from '../hooks/useStore';
import {supabase} from '../utils/supabase';
import {User} from '../types';
import {ViewComponent} from '../components/Shared/View';

const ProfileScreen = () => {
  const {logout} = useAuthStore();

  const [profile, setProfile] = React.useState<User>({} as User);

  const fetchUserProfile = async () => {
    const {data: sessionData, error: sessionError} =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error('Failed to fetch user profile:', sessionError);
      return;
    }

    if (!sessionData || !sessionData.session?.user) {
      console.warn('No user session found');
      return;
    }

    // Set profile with the user data from session
    setProfile(sessionData.session.user as User);
  };

  React.useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <ViewComponent mb={30}>
          <TextComponent testId="profile" text={profile.email} />
        </ViewComponent>
        <CustomButton
          title="Logout"
          onPress={() => logout()}
          testId="logout_button"
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
