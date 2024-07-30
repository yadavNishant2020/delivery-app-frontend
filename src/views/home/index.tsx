import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomMapView from '../../components/Mapview'; 

const Home = () => {
  return (
    <View style={styles.container}>
      <CustomMapView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default Home;
