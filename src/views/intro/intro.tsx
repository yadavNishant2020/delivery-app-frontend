import React from 'react';
import { View } from 'react-native';
import Introview from '../../components/introview/Introview';

import { useTheme } from '../../theme';
import { useStyle } from './style';

const Account = () => {
  const theme = useTheme();
  const styles = useStyle(theme);
  return (
    <View style={styles.container}>
      <Introview />
    </View>
  );
};



export default Account;
