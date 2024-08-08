import React from 'react';
import { View } from 'react-native';
import Introview from '../../components/introview/Introview';
import { useStyle } from './style';

const Account = () => {
  const styles = useStyle();
  return (
    <View style={styles.container}>
      <Introview />
    </View>
  );
};



export default Account;
