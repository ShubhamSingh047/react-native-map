import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { MapView, Location as LocationService, Marker } from 'expo-maps';

const CurrentLocationMap = () => {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await LocationService.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied');
      }

      let location = await LocationService.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMessage) {
    text = errorMessage;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="My Location"
            description="This is my current location"
          />
        </MapView>
      ) : (
        <Text>{text}</Text>
      )}
    </View>
  );
};

export default CurrentLocationMap;
