import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, PermissionsAndroid, Switch,ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

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
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const[isLoading, setIsLoading] =useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [mapError, setMapError] = useState<Error | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);


  let watchId: number | undefined;

  useEffect(() => {
    // Request location permission when the component mounts
    requestLocationPermission();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Position received:', position);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setIsLoading(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setGeoError(error.message);
        setIsLoading(false);
      },
      { enableHighAccuracy: true }
    );
    
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
      setIsLoading(false);
    }

    return () => {
      if (watchId !== undefined) {
        Geolocation.clearWatch(watchId);
      }
      setIsLoading(false);
    };
  }, [isTracking]);

  const handleToggleTracking = () => {
    setIsTracking(prev => !prev);
    setGeoError(null); // Reset geo error when toggling tracking
   
  };

  return (
    <View style={styles.container}>
      {mapError && <Text style={styles.errorText}>Map Error: {mapError.message}</Text>}
      {geoError && <Text style={styles.errorText}>Geolocation Error: {geoError}</Text>}
      <MapView
        style={styles.map}
        region={location? {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: location.latitudeDelta,
          longitudeDelta: location.longitudeDelta,
        } : undefined}
      >
      
        {isTracking && location && (
          <Marker
            coordinate={location}
            title="Current Location"
          />
        )}

      </MapView>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>
          {isTracking ? 'Live Location' : 'Tracking off'}
        </Text>
        <Switch
          value={isTracking}
          onValueChange={handleToggleTracking}
       
        />
      </View>
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
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  errorText: {
    color: 'red',
    margin: 10,
  },
  toggleContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 20,
    elevation: 5,
  },
  toggleLabel: {
    fontSize: 16,
    marginRight: 10,
    color: 'black'
  },
  
});

export default CustomMapView;
