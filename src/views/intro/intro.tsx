import React from 'react';
import { StyleSheet, View } from 'react-native';
import Introview from '../../components/introview/Introview';

const Account = () => {
  return (
    <View style={styles.container}>
      <Introview />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
   margin: 17,
  },
});

export default Account;
