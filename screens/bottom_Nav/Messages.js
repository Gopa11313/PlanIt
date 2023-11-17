import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, FlatList, TextInput, StatusBar } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
export default function Messages() {
  const [message, setMessage] = useState("");
  return (
    <View style={style.style}>
      <Text>Messages</Text>
      <FlatList />
      <View style={style.messageSection}>
        <TextInput
          style={style.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Send a message"
        />
        <FontAwesome name="send" size={24} color="black" />
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
});
