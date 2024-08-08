import React from 'react';
import { View } from 'react-native';
import CustomMapView from '../../components/mapview/Mapview'; 
import { useStyle } from './style';

const Map = () => {
  const styles = useStyle();
  return (
    <View style={styles.container}>
      <CustomMapView />
    </View>
  );
};

export default Map;
