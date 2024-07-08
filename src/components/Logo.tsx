import React from 'react';
import {Image, View} from 'react-native';

import {TextComponent} from './Shared/Text';

const Logo = () => {
  return (
    <View>
      {/* <Image
        source={require('../../assets/shopsync-logo.jpg')}
        // style={{height: 200, width: 200}}
      /> */}
      <TextComponent size="4xl" align="center" text="SHOPSYNC" />
      <TextComponent align="center" text="Share, Sync, Shop" />
    </View>
  );
};

export default Logo;
