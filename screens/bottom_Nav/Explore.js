import React, { useEffect, useState } from "react";
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
import Location from "../../assets/location.png";
import { db } from "../../firebaseConfig";
import Icon from "react-native-vector-icons/MaterialIcons";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Pressable } from "react-native";
export default function Explore({ navigation, route }) {
  useEffect(() => {
    getAllEventsData();
  }, []);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [events, setEvents] = useState(null);
  const [searchText, setSearchText] = useState("");
  const markerCoordinate = {
    latitude: 37.78825,
    longitude: -122.4324,
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    console.log(selectedMarker);
  };
  const gotoDeatial = () => {
    toggleModal();
    navigation.navigate("EventDetails", { selectedMarker, fromExplore: true });
  };
  async function getAllEventsData() {
    try {
      const eventsCollection = collection(db, "events"); // Update the collection path to 'users'
      const querySnapshot = await getDocs(eventsCollection); // Update the collection path to "users"
      const eventData = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const eventItem = {
          id: doc.id,
          ...doc.data(),
        };
        eventData.push(eventItem);
      });
      setEvents(eventData);
      console.log("event data: " + eventData);
    } catch (error) {
      console.error("Error retrieving user data:", error);
      throw error;
    }
  }
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
        {events &&
          events.length > 0 &&
          events.map((currMarker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: currMarker.latlng.latitude,
                longitude: currMarker.latlng.longitude,
              }}
              title={currMarker.name}
              // description={currMarker.description }
              onCalloutPress={() => {
                toggleModal();
                setSelectedMarker(currMarker); // Update selectedMarker
              }}
            />
          ))}
      </MapView>
      {selectedMarker && (
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <View>
              <Image
                source={{ uri: selectedMarker.image }}
                style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
              />
              <Text style={styles.category}> {selectedMarker.name}</Text>
            </View>
            <View style={styles.secondModalView}>
              <Text style={styles.descrp}>
                {selectedMarker.description}
                {/* An event description is a piece of text or copy, outlining the
                details of your event. These details come together to create a
                compelling statement which will help to draw in your target
                audience and even gain new guests! */}
              </Text>
            </View>
            <View style={styles.thirdModalView}>
              <Image source={Location} />
              <Text style={{ marginStart: 10 }}>{selectedMarker.location}</Text>
            </View>
            <View style={styles.thirdModalView}>
              <Icon name="email" size={24} color="black" />
              <Text style={{ marginStart: 10 }}>getintotouch@gmail.com</Text>
            </View>

            <Pressable style={styles.viewMore} onPress={gotoDeatial}>
              <Text style={{ color: "white", fontSize: 18 }}>View More</Text>
            </Pressable>
          </View>
        </Modal>
      )}
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
  descrp: {
    color: "black",
  },
  thirdModalView: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  viewMore: {
    marginTop: 10,
    backgroundColor: "black",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 5,
  },
});
