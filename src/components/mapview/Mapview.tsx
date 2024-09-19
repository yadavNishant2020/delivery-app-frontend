import React, { useEffect, useState, useCallback, useMemo } from 'react';
import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission } from "../../permissions/permissions";
import { fetchRoute } from '../../api/RouteApi';
import { View, Text, Switch, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../theme';
import { useStyle } from './style';
import dropoffImage from '../../public/homeIcon.png'; 
import { debounce } from 'lodash'; 
const CustomMapView = ({ route }: any) => {
  const theme = useTheme();
  const styles = useStyle(theme);
  const { pickupLocation = { latitude: 25.3920, longitude: 78.3556 }, dropLocation = { latitude: 25.3720, longitude: 78.5556 } } = route?.params || {};
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [mapError, setMapError] = useState<Error | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<{ latitude: number; longitude: number; }[]>([]);
  const [routeCache, setRouteCache] = useState<{[key: string]: any}>({});

  const locations = useMemo(() => [
    { latitude: 25.3120, longitude: 78.3556, title: 'Sector 53, Gurgaon' },
    { latitude: 25.3120, longitude: 78.5556, title: 'Sector 55, Gurgaon' },
  ], []);

  let watchId: number | undefined;

  const debouncedFetchRoute = useCallback(
    debounce(async (pickup:any, drop:any) => {
      const cacheKey = `${pickup.latitude},${pickup.longitude}-${drop.latitude},${drop.longitude}`;
      if (routeCache[cacheKey]) {
        setRouteCoordinates(routeCache[cacheKey]);
        return;
      }
      
      try {
        const route = await fetchRoute(pickup, drop);
        setRouteCoordinates(route);
        setRouteCache(prev => ({ ...prev, [cacheKey]: route }));
      } catch (error) {
        console.error('Error getting route:', error);
        setMapError(error as Error);
      }
    }, 1000),
    [routeCache]
  );

  const handlePositionUpdate = useCallback((position: { coords: { latitude: number; longitude: number; }; }) => {
    setLocation(prevLocation => {
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
        { enableHighAccuracy: true, distanceFilter: 50, interval: 60000 }
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

  useEffect(() => {
    if (pickupLocation && dropLocation) {
      debouncedFetchRoute(pickupLocation, dropLocation);
    }
  }, [pickupLocation, dropLocation, debouncedFetchRoute]);
    const getRoute = async () => {
      try {
        setIsLoading(true);
        const route = await fetchRoute(pickupLocation, dropLocation);
        setRouteCoordinates(route);
      } catch (error) {
        console.error('Error getting route:', error);
        setMapError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    if (pickupLocation && dropLocation) {
      getRoute();
    }
  }, [pickupLocation, dropLocation]);

  const handleToggleTracking = () => {
    setIsTracking(prev => !prev);
    setGeoError(null);
  };

  const toggleSheet = () => {
    setSheetVisible(!isSheetVisible);
  };

  const mapRegion = useMemo(() => {
    if (location && !isTracking) {
      return {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: location.latitudeDelta,
        longitudeDelta: location.longitudeDelta,
      };
    }
    return undefined;
  }, [location, isTracking]);

  const markers = useMemo(() => locations.map((loc, index) => (
    <Circle
      key={index}
      center={{ latitude: loc.latitude, longitude: loc.longitude }}
      radius={5000}
      strokeColor="#f05e2b"
      fillColor="rgba(255, 130, 37, 0.5)"
    />
  )), [locations]);

  return (
    <View style={styles.container}>
      {mapError && <Text style={styles.errorText}>Map Error: {mapError.message}</Text>}
      {geoError && <Text style={styles.errorText}>Geolocation Error: {geoError}</Text>}
      <MapView
        style={styles.map}
        region={mapRegion}
        onRegionChangeComplete={() => {}}
      >
        {isTracking && location && (
          <Marker
            coordinate={location}
            title="Current Location"
          />
        )}

        {markers}

        {pickupLocation && (
          <Marker
            coordinate={pickupLocation}
            title="Pickup Location"
            pinColor="#f05e2b"
          />
        )}

        {dropLocation && (
          <Marker
            coordinate={dropLocation}
            title="Drop-off Location"
            pinColor="red"
            icon={dropoffImage}
            style={{ width: 30, height: 30 }}
          />
        )}

        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#FF0000"
            strokeWidth={1.5}
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
      {isSheetVisible && (
        <View style={styles.bottomSheet}>
          <Text style={styles.sheetContent}>
            {/* <OrderDeliver pickupLocation={pickupLocation} dropLocation={dropLocation} /> */}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.toggleButton} onPress={toggleSheet}>
        <Image source={require('../../public/Draghandle.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomMapView;
