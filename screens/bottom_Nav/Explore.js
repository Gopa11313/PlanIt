import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, SafeAreaView } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location"; // Import Location from expo

export default function Explore({ navigation, route }) {
  const [searchText, setSearchText] = useState("");
  const markerCoordinate = {
    latitude: 37.78825,
    longitude: -122.4324,
  };

  // Function to get user location
  const getCurrentLocation = async () => {
    try {
      // 1. Request permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert(`Permission to access location was denied`);
        return;
      }

      // 2. Get the location
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      console.log(
        "User location:",
        location.coords.latitude,
        location.coords.longitude
      );
      console.log(location);
      alert(JSON.stringify(location));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentLocation(); // Call the function
  }, []);

  // Function to handle marker press
  const handleMarkerPress = (event) => {
    console.log("pressed");
    navigation.navigate("EventDetails");
  };

  return (
    <SafeAreaView style={style.container}>
      <MapView
        style={style.mapView}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markerCoordinate && (
          <Marker
            coordinate={markerCoordinate}
            title="San Francisco"
            description="Meet & dance"
            onCalloutPress={() => {
              handleMarkerPress();
            }}
          />
        )}
      </MapView>
      <TextInput
        style={style.textInput}
        placeholder="Enter a location..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
  textInput: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 55,
    marginEnd: 20,
    marginStart: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "#F0F0F0",
  },
});
