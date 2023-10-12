import React from "react";
import {
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Gurkirat from "../../assets/gurkirat.png";
import { AntDesign } from "@expo/vector-icons";

export default function Settings() {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.insideView}>
        <View>
          <Text style={style.profileName}>Profile</Text>
        </View>

        <View>
          <Image style={style.dp} source={Gurkirat} />
        </View>

        <View style={style.subContainers}>
          <Text style={style.containerHeader}>General</Text>
          <Text style={style.subContainersContent}>Gurkirat Jaitla</Text>
          <Text style={style.subContainersContent}>gurkirat@gmail.com</Text>
          <Text style={style.subContainersContent}>647-897-xxxx</Text>
        </View>

        <View style={style.subContainers}>
          <Text style={style.containerHeader}>About Me</Text>
          <Pressable>
            <Text style={style.subContainersContent}>Interest</Text>
            {/* <AntDesign name="arrowright" size={24} color="black" /> */}
          </Pressable>
          <Pressable>
            <Text style={style.subContainersContent}>Age</Text>
          </Pressable>
          <Pressable>
            <Text style={style.subContainersContent}>Location</Text>
          </Pressable>
          <Pressable>
            <Text style={style.subContainersContent}>Gender</Text>
          </Pressable>
        </View>

        <View>
          <Pressable style={style.logoutButton}>
            <Text style={style.buttonText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
  insideView: {
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  profileName: {
    fontSize: 25,
    margin: 10,
    fontWeight: "bold",
    marginStart: 25,
    color: "black",
  },

  dp: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
  },
  containerHeader: {
    fontSize: 18,
    margin: 7,
    fontWeight: "bold",
    marginStart: 25,
    color: "black",
  },
  subContainersContent: {
    fontSize: 15,
    margin: 7,
    marginStart: 25,
    color: "black",
  },
  subContainers: {
    justifyContent: "center",
    width: "85%",
    marginBottom: 30,
    borderRadius: 20,
    backgroundColor: "white", // Set a background color
    elevation: 4, // Add a soft shadow
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 2, height: 4 }, // Shadow offset
    shadowOpacity: 1, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    borderWidth: 1,
  },

  logoutButton: {
    width: 200,
    height: 60,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    // marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
