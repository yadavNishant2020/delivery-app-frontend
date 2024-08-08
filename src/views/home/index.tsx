import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomMapView from '../../components/mapview/Mapview'; 
import { useTheme } from '../../theme';
import { useStyle } from './style';

const Map = () => {
  const theme = useTheme();
  const styles = useStyle(theme);
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

export default Map;
