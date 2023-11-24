import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, FlatList, TextInput, StatusBar } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  addDoc,
  getDocs,
  query,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Messages({ route }) {
  useEffect(() => {
    const { data } = route.params;
    console.log(data);
  });
  const { data } = route.params;
  const [message, setMessage] = useState("");
  const renderItem = ({ item }) => {
    return (
      <View style={style.chatMessage}>
        <View style={style.profileName}>
          <Text>{getInitials(item.name)}</Text>
        </View>
        <Text style={style.message}>{item.message}</Text>
      </View>
    );
  };
  function getInitials(fullName) {
    const words = fullName.split(" ");
    const firstNameInitial = words[0] ? words[0][0] : "";
    const lastNameInitial = words.length > 1 ? words[words.length - 1][0] : "";

    return `${firstNameInitial}${lastNameInitial}`;
  }
  const handleNewMessage = async () => {
    if (message != "") {
      // const newMessage = { message: message, name: data.name };
      const newChatObject = {
        message: "another message",
        name: "Another Name",
      };
      updateChatsArray(data.id, newChatObject);
    } else {
      alert("Please add message to send message!!");
    }
  };
  const updateChatsArray = async (docId, newChat) => {
    try {
      const userDocRef = doc(db, "Chats", docId);
      console.log("Gopal here");
      console.log(userDocRef);
      // Update the 'chats' array by adding a new element
      await updateDoc(userDocRef, {
        chats: arrayUnion(newChat),
      });
      data.chats.add(newChat);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  return (
    <View style={style.container}>
      <FlatList
        data={data.chats}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
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
          onPress={handleNewMessage}
        />
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "top",
    justifyContent: "top",
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F0F0F0",
    padding: 10,
  },
  messageSection: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "baseline",
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
  chatMessage: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  profileName: {
    width: 40,
    height: 40,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },

  message: {
    width: "100%",
    backgroundColor: "gray",
    padding: 10,
    color: "black",
    borderRadius: 5,
    marginLeft: 10,
  },
});
