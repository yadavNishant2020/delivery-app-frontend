import polyline from '@mapbox/polyline';

// Google Maps API Key
const API_KEY = 'AIzaSyDb90253IH7KyPUine6eJlHXTwwH6vj7Mk';

// Simple in-memory cache
const routeCache: { [key: string]: { data: Array<{ latitude: number; longitude: number }>, timestamp: number } } = {};
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Minimum delay between consecutive requests (in milliseconds)
const MIN_DELAY_BETWEEN_REQUESTS_MS = 5000; // 5 seconds
let lastRequestTime = 0;

// Counter for API calls
let apiCallCount = 0;

// Function to introduce a delay (in milliseconds)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch route with rate limiting, caching, retry logic, and logging
export const fetchRoute = async (
  pickupLocation: { latitude: number; longitude: number },
  dropLocation: { latitude: number; longitude: number },
  retries = 3,
  delayMs = 1000
): Promise<Array<{ latitude: number; longitude: number }>> => {
  const origin = `${pickupLocation.latitude},${pickupLocation.longitude}`;
  const destination = `${dropLocation.latitude},${dropLocation.longitude}`;
  const routeKey = `${origin}-${destination}`;

  // Check if the route is cached and not expired
  const cachedRoute = routeCache[routeKey];
  if (cachedRoute && (Date.now() - cachedRoute.timestamp) < CACHE_TTL) {
    console.log('Route found in cache. No API call made.');
    return cachedRoute.data;
  }

  // Check for rate limiting
  const now = Date.now();
  if (now - lastRequestTime < MIN_DELAY_BETWEEN_REQUESTS_MS) {
    const delayTime = MIN_DELAY_BETWEEN_REQUESTS_MS - (now - lastRequestTime);
    await delay(delayTime);
  }
  lastRequestTime = Date.now();

  try {
    console.log(`Making API call to Google Maps Directions API. Call count: ${++apiCallCount}`);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`
    );
    const data = await response.json();

    if (data.status === 'OK') {
      const encodedPoints = data.routes[0].overview_polyline.points;
      const points = polyline.decode(encodedPoints).map(([latitude, longitude]) => ({ latitude, longitude }));
      routeCache[routeKey] = { data: points, timestamp: Date.now() };
      console.log('Route successfully fetched and cached.');
      return points;
    } else if (data.status === 'ZERO_RESULTS') {
      console.log(`No route found between ${origin} and ${destination}. API call count: ${apiCallCount}`);
      return [];
    } else {
      throw new Error(data.status);
    }
  } catch (error) {
    if (retries > 0) {
      console.log(`Error fetching route: ${error}. Retrying in ${delayMs}ms... API call count: ${apiCallCount}`);
      await delay(delayMs);
      return fetchRoute(pickupLocation, dropLocation, retries - 1, delayMs * 2);
    } else {
      console.error(`Failed to fetch route after multiple retries: ${error}. Total API calls: ${apiCallCount}`);
      throw error;
    }
  }
};

// Function to calculate "as the crow flies" distance
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const fetchRoutesBatch = async (
  locations: Array<{ pickupLocation: { latitude: number; longitude: number }; dropLocation: { latitude: number; longitude: number } }>
): Promise<Array<Array<{ latitude: number; longitude: number }>>> => {
  const results: Array<Array<{ latitude: number; longitude: number }>> = [];
  const MAX_WAYPOINTS = 25; // Google's limit for waypoints in a single request

  for (let i = 0; i < locations.length; i += MAX_WAYPOINTS) {
    const batch = locations.slice(i, i + MAX_WAYPOINTS);
    const origins: string[] = [];
    const destinations: string[] = [];
    const shortRoutes: Array<Array<{ latitude: number; longitude: number }>> = [];

    batch.forEach(({ pickupLocation, dropLocation }) => {
      const distance = haversineDistance(
        pickupLocation.latitude,
        pickupLocation.longitude,
        dropLocation.latitude,
        dropLocation.longitude
      );

      if (distance < 1) { // If distance is less than 1 km, use a straight line
        shortRoutes.push([
          { latitude: pickupLocation.latitude, longitude: pickupLocation.longitude },
          { latitude: dropLocation.latitude, longitude: dropLocation.longitude }
        ]);
      } else {
        origins.push(`${pickupLocation.latitude},${pickupLocation.longitude}`);
        destinations.push(`${dropLocation.latitude},${dropLocation.longitude}`);
      }
    });

    if (origins.length > 0) {
      try {
        console.log(`Making batch API call to Google Maps Directions API. Call count: ${++apiCallCount}`);
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origins[0]}&destination=${destinations[0]}` +
          `&waypoints=optimize:true|${origins.slice(1).join('|')}` +
          `&destinations=${destinations.slice(1).join('|')}` +
          `&key=${API_KEY}`
        );
        const data = await response.json();

        if (data.status === 'OK') {
          data.routes[0].legs.forEach((leg: any) => {
            const encodedPoints = leg.steps.map((step: any) => step.polyline.points).join('');
            const points = polyline.decode(encodedPoints).map(([latitude, longitude]) => ({ latitude, longitude }));
            results.push(points);
          });
          console.log(`Batch route successfully fetched. Routes added: ${data.routes[0].legs.length}`);
        } else {
          throw new Error(data.status);
        }
      } catch (error) {
        console.error(`Error in batch request: ${error}. API call count: ${apiCallCount}`);
        // Add empty arrays for failed routes
        results.push(...Array(origins.length).fill([]));
      }
    }

    // Add the short routes to the results
    results.push(...shortRoutes);

    // Delay between batches
    if (i + MAX_WAYPOINTS < locations.length) {
      await delay(MIN_DELAY_BETWEEN_REQUESTS_MS);
    }
  }

  return results;
};