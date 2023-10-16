import React from "react";
import {
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
  Text,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Gurkirat from "../../assets/gurkirat.png";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { getAuth } from "firebase/auth";

export default function Settings({ navigation }) {
  const handleLogout = async () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      alert("User Logged out");
      navigation.navigate("LoginScreen");
      console.log("User signed out!");
    });
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView contentContainerStyle={style.scrollViewContent}>
        <View style={style.insideView}>
          <Text style={style.profileName}>Profile</Text>

          <Image style={style.dp} source={Gurkirat} />

          <View style={style.subContainers}>
            <Text style={style.containerHeader}>General</Text>
            <Text style={style.subContainersContent}>Gurkirat Jaitla</Text>
            <Text style={style.subContainersContent}>gurkirat@gmail.com</Text>
            <Text style={style.subContainersContent}>647-897-xxxx</Text>
          </View>

          <View style={style.subContainers}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 3,
              }}
            >
              <Text style={style.containerHeader}>About Me</Text>
              <MaterialIcons name="edit" size={24} color="black" />
            </View>
            <Pressable>
              <Text style={style.subContainersContent}>Interest</Text>
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
            <Pressable style={style.logoutButton} onPress={handleLogout}>
              <Text style={style.buttonText}>Logout</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
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
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  logoutButton: {
    width: 200,
    height: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
