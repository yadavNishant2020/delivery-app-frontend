import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import ToggleLocationButton from './ToggleLocationButton';

// Request location permission for Android
const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const CustomMapView = () => {
  const [location, setLocation] = useState({
    latitude: 37.78825, // Default San Francisco coordinates
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [isTracking, setIsTracking] = useState(false);
  const [showLocation, setShowLocation] = useState(true);
  const [mapError, setMapError] = useState<Error | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    // Request location permission when the component mounts
    requestLocationPermission();

    let watchId: number | undefined;

    if (isTracking) {
      watchId = Geolocation.watchPosition(
        (position) => {
          console.log('Position received:', position);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          setGeoError(error.message);
        },
        { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 }
      );
    } else {
      if (watchId !== undefined) {
        Geolocation.clearWatch(watchId);
      }
    }

    return () => {
      if (watchId !== undefined) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [isTracking]);

  const handleToggleTracking = () => {
    setIsTracking(prev => !prev);
    if (showLocation) {
      setShowLocation(false);
    }
  };

  const handleToggleVisibility = () => {
    setShowLocation(prev => !prev);
  };

  return (
    <View style={styles.container}>
      {mapError && <Text style={styles.errorText}>Map Error: {mapError.message}</Text>}
      {geoError && <Text style={styles.errorText}>Geolocation Error: {geoError}</Text>}
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: location.latitudeDelta,
          longitudeDelta: location.longitudeDelta,
        }}
      >
        {showLocation && <Marker coordinate={location} title="Current Location" />}
      </MapView>
      <ToggleLocationButton isTracking={isTracking} onToggle={handleToggleTracking} />
      <TouchableOpacity
        style={styles.visibilityButton}
        onPress={handleToggleVisibility}
      >
        <Text style={styles.visibilityText}>
          {showLocation ? 'Hide Marker' : 'Show Marker'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  errorText: {
    color: 'red',
    margin: 10,
  },
  visibilityButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#28a745',
    alignItems: 'center',
    margin: 10,
  },
  visibilityText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomMapView;
