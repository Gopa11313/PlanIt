import React, { useEffect, useState } from "react";

import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
  FlatList,
} from "react-native";
import Calender from "../../assets/calender.png";
import Ticket from "../../assets/ticket.png";
import Dress from "../../assets/dress.png";
import Modal from "react-native-modal";
import Location from "../../assets/location.png";

import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { db } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function HomeProfileDetais({ route }) {
  const { userData } = route.params;
  const [image1, setimage1] = useState("");
  const [image2, setimage2] = useState("");
  useEffect(() => {
    setimage1(userData.Image[0]);
    setimage2(userData.Image[1]);
  }, []);
  const [message, setMessage] = useState("");
  const data = [
    { id: "1", text: "Age", age: userData.Age },
    { id: "2", text: "Alcohal", age: "No" },
    { id: "3", text: "Smoking", age: "No" },
  ];
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    if (isModalVisible == true) {
    }
  };
  const renderItem = ({ item }) => (
    <View style={style.renderItem}>
      <Text>{item.text}:</Text>
      <Text>{item.age}</Text>
      <View style={style.renderEndView} />
    </View>
  );

  const createChat = async () => {
    const Chat = {
      ownerId: await AsyncStorage.getItem("userDocId"),
      ...userData,
      chats: userData.chats
        ? [...userData.chats, { name: userData.name, message }]
        : [{ name: userData.name, message }],
    };

    const insertedDocument = await addDoc(collection(db, "Chats"), Chat);
    console.log(insertedDocument);
    alert("Enjoy.");

    setEmail("");
    setName("");
    setExplanation("");
    setExplanation("");
  };
  return (
    <SafeAreaView style={style.contianer}>
      <ScrollView style={style.scrollView}>
        <View style={style.insideView}>
          <Image
            source={{ uri: image1 }}
            style={style.image}
            onError={(e) =>
              console.log("Error loading image:", e.nativeEvent.error)
            }
          />
          {/* <Image source={{ url: image1 }} style={style.image} /> */}
          <View style={style.secondView}>
            <Text style={style.category}>Quote</Text>
            <View style={style.categoryName}>
              <Text style={style.title}>{userData.Quote}</Text>
            </View>
          </View>
          <Image
            source={{ uri: image2 }}
            style={style.image}
            onError={(e) =>
              console.log("Error loading image:", e.nativeEvent.error)
            }
          />

          <View style={style.thirdView}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal={true}
            />
            <View
              style={{
                width: "100%",
                height: 2,
                backgroundColor: "black",
              }}
            />
            <View style={style.locationCase}>
              <Image source={Location} style={style.locationImage} />
              <Text style={style.location}>{userData.Address}</Text>
            </View>
          </View>
          <View style={style.thirdView}>
            <Text style={style.description}> {userData.Bio}</Text>
            <Pressable style={style.bookmarkBtn} onPress={toggleModal}>
              <Text style={{ color: "white", fontSize: 15 }}>Match</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={style.modal}
      >
        <View style={style.modalContent}>
          <View>
            <Image
              source={{ uri: userData.Image[0] }}
              style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
            />
            <Text style={style.category}> {userData.name}</Text>
          </View>
          <View style={style.messageSection}>
            <TextInput
              style={style.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Send a message"
            />
            <FontAwesome
              name="send"
              size={24}
              color="black"
              onPress={createChat}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  contianer: {
    flex: 1,
    alignItems: "top",
    justifyContent: "top",
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F0F0F0",
  },
  scrollView: {
    width: "100%",
  },
  insideView: {
    padding: 20,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 350,
    marginTop: 15,
    borderRadius: 10,
  },
  secondView: {
    marginTop: 25,
    width: "100%",
    height: 160,
    padding: 15,
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 10,
  },
  category: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  categoryName: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 29,
    fontWeight: "bold",
    color: "black",
  },
  //reder ITem
  renderItem: {
    width: 110, // Adjust the width as needed
    marginHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    height: 110,
  },
  renderImage: {
    width: 18,
    height: 18,
    margin: 5,
  },

  renderEndView: {
    height: 35,
    marginStart: 20,
    width: 2,
    backgroundColor: "black",
  },
  thirdView: {
    marginTop: 25,
    width: "100%",
    height: 180,
    padding: 10,
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 10,
  },
  locationCase: {
    padding: 10,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  location: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  locationImage: {
    width: 18,
    height: 24,
    objectFit: "fill",
    marginEnd: 10,
  },
  description: {
    fontSize: 15,
    color: "black",
    margin: 10,
  },
  bookmarkBtn: {
    backgroundColor: "black",
    padding: 12,
    marginTop: 15,
    borderRadius: 10,
    alignItems: "center",
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
  messageSection: {
    display: "flex",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    marginBottom: 15,
  },
  input: {
    width: "auto",
    borderWidth: 1,
    marginRight: 5,
    flex: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    height: 50,
  },
});
