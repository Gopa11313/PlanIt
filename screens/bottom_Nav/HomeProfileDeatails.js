import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  FlatList,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import Location from "../../assets/location.png";
import { v4 as uuidv4 } from "uuid";
import { FontAwesome } from "@expo/vector-icons";
import Location from "../../assets/location.png";
import { db } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function HomeProfileDetais({ route }) {
  const { userData } = route.params;
  const [image1, setimage1] = useState("");
  const [image2, setimage2] = useState("");
  useEffect(() => {
    const { id, ...userDataWithoutId } = userData;
    console.log(userData);
    console.log(userData);
    setimage1(userData.Image[0]);
    setimage2(userData.Image[1]);
  }, []);
  const [message, setMessage] = useState("");
  const data = [
    { id: "1", text: "Age", age: userData.Age },
    { id: "2", text: "Alcohol", age: "No" },
    { id: "3", text: "Smoking", age: "No" },
  ];
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderItem = ({ item }) => (
    <View style={styles.renderItem}>
      <Text>{item.text}:</Text>
      <Text>{item.age}</Text>
      <View style={styles.renderEndView} />
    </View>
  );

  const createChat = async () => {
    const { id, ...userDataWithoutId } = userData;
    console.log(userDataWithoutId);
    const Chat = {
      Id: uuidv4(),
      ownerId: await AsyncStorage.getItem("userDocId"),
      ...userDataWithoutId,
      chats: userData.chats
        ? [...userData.chats, { name: userData.name, message }]
        : [{ name: "Your Name", message }],
    };

    const insertedDocument = await addDoc(collection(db, "Chats"), Chat);
    alert("Enjoy.");

    setMessage("");
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

          <View style={styles.thirdView}>
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
          <View style={styles.thirdView}>
            <Text style={styles.description}>{userData.Bio}</Text>
            <Pressable style={styles.bookmarkBtn} onPress={toggleModal}>
              <Text style={styles.buttonText}>Match</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View>
            <Image
              source={{ uri: userData.Image[0] }}
              style={styles.modalImage}
            />
            <Text style={styles.category}> {userData.name}</Text>
          </View>
          <View style={styles.messageSection}>
            <TextInput
              style={styles.input}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
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
  // renderItem
  renderItem: {
    width: 110,
    marginHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    height: 110,
  },
  renderEndView: {
    height: 35,
    marginStart: 20,
    width: 2,
    backgroundColor: "black",
  },
  separator: {
    width: "100%",
    height: 2,
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
  buttonText: {
    color: "white",
    fontSize: 15,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  messageSection: {
    display: "flex",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    marginRight: 5,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    height: 50,
  },
});
