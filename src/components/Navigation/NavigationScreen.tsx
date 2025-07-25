import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';
import ScooterRoutingService from '../../services/routing';

const MAPBOX_ACCESS_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN'; // This should be moved to config

const NavigationScreen: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [_route, setRoute] = useState(null);
  const [_isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Request location permission and start tracking
    Geolocation.requestAuthorization('whenInUse');
    startLocationTracking();
  }, []);

  const startLocationTracking = () => {
    Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([longitude, latitude]);
      },
      (error) => console.log('Location error:', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Update every 10 meters
        interval: 5000, // Check every 5 seconds
      }
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const startNavigation = async (destination: [number, number]) => {
    if (!userLocation) return;

    const routingService = new ScooterRoutingService(MAPBOX_ACCESS_TOKEN);
    const routeData = await routingService.getScooterRoute({
      coordinates: [userLocation, destination],
      routeType: 'safe',
      avoidHighways: true,
      maxSpeedLimit: 45
    });

    setRoute(routeData);
    setIsNavigating(true);
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        // showUserLocation={true}
        // userTrackingMode={MapboxGL.UserTrackingModes.Follow}
      >
        {userLocation && (
          <MapboxGL.Camera
            centerCoordinate={userLocation}
            zoomLevel={16}
            animationMode="flyTo"
            animationDuration={1000}
          />
        )}
        
        {/* {route && (
          <MapboxGL.ShapeSource id="routeSource" shape={route.geometry}>
            <MapboxGL.LineLayer
              id="routeLine"
              style={lineStyle}
            />
          </MapboxGL.ShapeSource>
        )} */}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 }
});

// const lineStyle = {
//   lineColor: '#3b82f6',
//   lineWidth: 6,
//   lineOpacity: 0.8,
// };

export default NavigationScreen;