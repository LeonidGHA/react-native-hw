import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

const LocationHooks = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        Alert.alert(errorMsg);
        return;
      }

      getLocation();
    })();
  }, []);

  return { location, setLocation, getLocation };
};

export default LocationHooks;
