import React from 'react';
import { StyleSheet, View } from 'react-native';
import Introview from '../../components/Introview';

const Intro = () => {
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

export default Intro;
