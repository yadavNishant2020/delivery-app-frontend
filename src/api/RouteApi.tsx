import polyline from '@mapbox/polyline';

// Google Maps API Key
const API_KEY = 'AIzaSyDb90253IH7KyPUine6eJlHXTwwH6vj7Mk';

// Cache to store routes locally
const routeCache = new Map<string, Array<{ latitude: number; longitude: number }>>();

// Minimum delay between consecutive requests (in milliseconds)
const MIN_DELAY_BETWEEN_REQUESTS_MS = 3000; // 3 seconds
let lastRequestTime = 0; // To track the last request time

// Function to introduce a delay (in milliseconds)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch route with rate limiting, caching, and retry logic
export const fetchRoute = async (
  pickupLocation: { latitude: number; longitude: number },
  dropLocation: { latitude: number; longitude: number },
  retries = 3, // Number of retries for `OVER_QUERY_LIMIT`
  delayMs = 1000 // Initial delay for retrying
): Promise<Array<{ latitude: number; longitude: number }>> => {
  const origin = `${pickupLocation.latitude},${pickupLocation.longitude}`;
  const destination = `${dropLocation.latitude},${dropLocation.longitude}`;
  const routeKey = `${origin}-${destination}`; // Unique cache key based on origin and destination

  // Check if the route is cached
  if (routeCache.has(routeKey)) {
    return routeCache.get(routeKey)!;
  }

  // Check for rate limiting
  const now = Date.now();
  if (now - lastRequestTime < MIN_DELAY_BETWEEN_REQUESTS_MS) {
    const delayTime = MIN_DELAY_BETWEEN_REQUESTS_MS - (now - lastRequestTime);
    await delay(delayTime);
  }
  lastRequestTime = now;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.status === 'OK') {
      const encodedPoints = data.routes[0].overview_polyline.points;
      const points = polyline.decode(encodedPoints).map(([latitude, longitude]) => ({ latitude, longitude }));
      routeCache.set(routeKey, points);
      return points;
    } else if (data.status === 'OVER_QUERY_LIMIT') {
      throw new Error('OVER_QUERY_LIMIT');
    } else {
      throw new Error(data.status);
    }
  } catch (error) {
    if (retries > 0 && error instanceof Error && error.message === 'OVER_QUERY_LIMIT') {
      await delay(delayMs);
      return fetchRoute(pickupLocation, dropLocation, retries - 1, delayMs * 2);
    } else {
      throw error;
    }
  }
};

export const fetchRoutesBatch = async (
  locations: Array<{ pickupLocation: { latitude: number; longitude: number }; dropLocation: { latitude: number; longitude: number } }>
): Promise<Array<Array<{ latitude: number; longitude: number }>>> => {
  const results: Array<Array<{ latitude: number; longitude: number }>> = [];

  for (const { pickupLocation, dropLocation } of locations) {
    try {
      const route = await fetchRoute(pickupLocation, dropLocation);
      results.push(route);


      await delay(2000);
    } catch (error) {
      results.push([]);
    }
  }

  return results;
};
