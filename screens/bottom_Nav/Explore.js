import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Modal from "react-native-modal";
import EventCover from "../../assets/EventCover.jpg";

export default function Explore({ navigation, route }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const markerCoordinate = {
    latitude: 37.78825,
    longitude: -122.4324,
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.mapView}
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
            onCalloutPress={toggleModal}
          />
        )}
      </MapView>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View>
            <Image
              source={EventCover}
              style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
            />
            <Text style={styles.category}>Toronto Sunday Events</Text>
          </View>
          <View style={styles.secondModalView}>
            <Text style={styles.description}>
              An event description is a piece of text or copy, outlining the
              details of your event. These details come together to create a
              compelling statement which will help to draw in your target
              audience and even gain new guests!
            </Text>
          </View>
          <Text>Content of the Bottom Sheet</Text>
          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>

      <TextInput
        style={styles.textInput}
        placeholder="Enter a location..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
  modal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    width: "100%",
    borderTopLeftRadius: 20, // Adjust the radius as needed
    borderTopRightRadius: 20,
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
  category: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  secondModalView: {
    marginTop: 10,
  },
  description: {
    color: "black",
  },
});
