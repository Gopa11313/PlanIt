import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, SafeAreaView } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
export default function Explore({ navigation, route }) {
  const [searchText, setSearchText] = useState("");
  const markerCoordinate = {
    latitude: 37.78825,
    longitude: -122.4324,
  };

  // Function to handle marker press
  const handleMarkerPress = (event) => {
    console.log("pressed");
    navigation.navigate("EventDetails");
  };
  return (
    <SafeAreaView style={style.continer}>
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
            title="San Francsico"
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
  continer: {
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
