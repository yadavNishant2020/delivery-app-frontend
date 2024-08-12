import polyline from '@mapbox/polyline';

const API_KEY = 'AIzaSyBO16CkrsOyh7rKbIEP6uiEWFFB5ZRBCiM';

export const fetchRoute = async (pickupLocation: { latitude: any; longitude: any; }, dropLocation: { latitude: any; longitude: any; }) => {
  const origin = `${pickupLocation.latitude},${pickupLocation.longitude}`;
  const destination = `${dropLocation.latitude},${dropLocation.longitude}`;
  
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`);
    const data = await response.json();
    
    if (data.status === 'OK') {
      const encodedPoints = data.routes[0].overview_polyline.points;
      const points = polyline.decode(encodedPoints).map(([latitude, longitude]) => ({ latitude, longitude }));
      return points;
    } else {
      throw new Error(data.status);
    }
  } catch (error) {
    console.error('Error fetching route:', error);
    throw error; // Propagate the error
  }
};
