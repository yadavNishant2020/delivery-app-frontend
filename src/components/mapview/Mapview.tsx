import React, { useEffect, useState, useCallback } from 'react';
import MapView, { Marker, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {requestLocationPermission} from "../../permissions/permissions";
import { View, Text, Switch, ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme';
import { useStyle } from './style';

const CustomMapView = () => {
  const theme = useTheme();
    const styles = useStyle(theme);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [mapError, setMapError] = useState<Error | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  const locations = [
    { latitude: 28.4483, longitude:77.0653, title: 'Sector 53, Gurgaon' },
    { latitude: 28.4611, longitude: 77.0800, title: 'Sector 55, Gurgaon' },
  ];

  let watchId: number | undefined;

  const handlePositionUpdate = useCallback((position: { coords: { latitude: number; longitude: number; }; }) => {
    setLocation(prevLocation => {
      // Only update the location if it has changed significantly
      if (!prevLocation ||
        Math.abs(prevLocation.latitude - position.coords.latitude) > 0.001 ||
        Math.abs(prevLocation.longitude - position.coords.longitude) > 0.001) {
        return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
      }
      return prevLocation;
    });
  }, []);

  useEffect(() => {
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
        handlePositionUpdate,
        (error) => {
          console.error('Geolocation error:', error);
          setGeoError(error.message);
        },
        { enableHighAccuracy: true, distanceFilter: 10, interval: 15000 }
      );
    } else {
      if (watchId !== undefined) {
        Geolocation.clearWatch(watchId);
        watchId = undefined;
      }
    }

    return () => {
      if (watchId !== undefined) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [isTracking, handlePositionUpdate]);

  const handleToggleTracking = () => {
    setIsTracking(prev => !prev);
    setGeoError(null);
  };

  return (
    <View style={styles.container}>
      {mapError && <Text style={styles.errorText}>Map Error: {mapError.message}</Text>}
      {geoError && <Text style={styles.errorText}>Geolocation Error: {geoError}</Text>}
      <MapView
        style={styles.map}
        region={location && !isTracking ? {
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

        {locations.map((loc, index) => (
          <Circle
            key={index}
            center={{ latitude: loc.latitude, longitude: loc.longitude }}
            radius={5000}
            strokeColor="#f05e2b"
            fillColor="rgba(255, 130, 37, 0.5)"
          />
        ))}
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


export default CustomMapView;
