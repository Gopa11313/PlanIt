import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import Location from "../../assets/location.png";
import MainSection from "../../assets/mainSection.png";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import Gurkirat from "../../assets/gurkirat.png";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation, route }) {
  const [userData, setUserData] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [userlocation, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState(0);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    getAllUserData();
  }, []);
  const onSwipeLeft = () => {
    console.log(userData[counter]);
    setData();
  };
  const onSwipeRight = () => {
    toggleModal();
  };
  const setData = () => {
    setImage(userData[counter].Image[0]);
    setLocation(userData[counter].address);
    setBio(userData[counter].Bio);
    setName(userData[counter].name);
    setAge(userData[counter].Age);
    setCounter(counter + 1);
  };
  async function getAllUserData() {
    try {
      const usersCollection = collection(db, "Users"); // Update the collection path to 'users'
      const querySnapshot = await getDocs(usersCollection); // Update the collection path to "users"
      const userData = [];
      const userEmail = await AsyncStorage.getItem("email");
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const user = {
          id: doc.id,
          ...doc.data(),
        };
        console.log(doc.data().email);
        if (userEmail != doc.data().email) {
          userData.push(user);
        }
      });
      setImage[userData[0].Image[0]];
      setUserData(userData);
      console.log("user data: " + userData);
    } catch (error) {
      console.error("Error retrieving user data:", error);
      throw error;
    }
  }
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    if (isModalVisible == true) {
      setData();
    }
    // console.log(selectedMarker);
  };
  const gotoDeatial = () => {
    toggleModal();
    console.log("HERE");
    console.log(userData[counter]);
    navigation.navigate("HomeProfileDetais", {
      userData: userData[counter - 1],
    });
  };
  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      style={styles.continer}
    >
      <SafeAreaView style={styles.insideView}>
        <View style={styles.locationCase}>
          <Image style={styles.locationImage} source={Location} />
          <Text style={styles.location}>
            {userlocation ? userlocation : " Sherwood Park, Toronto, ON"}
          </Text>
        </View>
        <Text style={styles.profileName}>{name ? name : "Gurkirat GT"}</Text>
        <View style={styles.mainSection}>
          <ImageBackground
            style={styles.mainImage}
            source={MainSection}
            resizeMode="contain"
          >
            <View style={styles.mainInsideView}>
              <Image style={styles.profileImage} source={{ url: image }} />
            </View>
          </ImageBackground>
        </View>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <View>
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
              />
              <Text style={styles.category}> {name}</Text>
            </View>
            <View style={styles.secondModalView}>
              <Text style={styles.descrp}>{bio}</Text>
            </View>
            <View style={styles.thirdModalView}>
              <Image source={Location} />
              <Text style={{ marginStart: 10 }}>{userlocation}</Text>
            </View>
            <View style={styles.thirdModalView}>
              <Text>Age:</Text>
              <Text style={{ marginStart: 10 }}>{age}</Text>
            </View>

            <Pressable style={styles.viewMore} onPress={gotoDeatial}>
              <Text style={{ color: "white", fontSize: 18 }}>View More</Text>
            </Pressable>
          </View>
        </Modal>
      </SafeAreaView>
    </GestureRecognizer>
  );
}
const styles = StyleSheet.create({
  continer: {
    flex: 1,
    alignItems: "top",
    justifyContent: "top",
    backgroundColor: "#F0F0F0",
  },
  insideView: {
    padding: 10,
    width: "100%",
  },
  locationCase: {
    height: 60,
    marginStart: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  location: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
  locationImage: {
    width: 18,
    height: 24,
    objectFit: "fill",
    marginEnd: 10,
  },
  mainSection: {
    height: "100%",
    marginTop: 15,
    width: "100%",

    alignItems: "center",
    justifyContent: "top",
    borderRadius: 15,
  },
  mainImage: {
    height: "86%",
    alignItems: "center",
    justifyContent: "top",
    width: "100%",
  },
  profileName: {
    fontSize: 20,
    margin: "none",
    fontWeight: "bold",
    marginStart: 25,
    color: "black",
  },
  mainInsideView: {
    height: "80%",
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: "90%",
    height: "93%",
    marginTop: 20,
    borderRadius: 20,
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
