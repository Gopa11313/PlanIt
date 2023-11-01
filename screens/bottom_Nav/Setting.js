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
import pormotionBanner from "../../assets/secondImage.jpg";
import { AntDesign, Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
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
      <ScrollView style={style.scrollViewContent}>
        <View style={style.insideView}>
          <View style={style.topView}>
            <Image style={style.profilImage} source={Gurkirat} />
            <View style={style.profilNameView}>
              <Text style={style.profileName}>Gurkirat</Text>
              <Text style={{ marginStart: 5, fontSize: 12 }}>
                PlanIt Member
              </Text>
            </View>
            <View style={style.iconView}>
              <AntDesign name="edit" size={24} color="black" />
              <Ionicons name="options" size={24} color="black" />
              <AntDesign name="setting" size={24} color="black" />
            </View>
          </View>

          <View style={style.subContainers}>
            <Image source={pormotionBanner} style={style.pormotionBanner} />
          </View>
          <View style={style.options}>
            <AntDesign name="infocirlce" size={30} color="green" />
            <View style={style.optionsInside}>
              <Text style={style.optionsTitle}>Connections</Text>
              <Text style={style.optionsDes}>
                Get connected to people and make friends
              </Text>
            </View>
          </View>
          <View style={style.options}>
            <FontAwesome name="comment" size={30} color="green" />
            <View style={style.optionsInside}>
              <Text style={style.optionsTitle}>What people are saying?</Text>
              <Text style={style.optionsDes}>
                The best app for events and making friends.
              </Text>
            </View>
          </View>

          <View style={style.bottomContainer}>
            <View style={style.bottomInsideContainer}>
              <Entypo name="new" size={24} color="black" />
              <Text style={style.bottomInsideContainerText}>What's new</Text>
            </View>
            <View style={style.bottomInsideContainer}>
              <AntDesign name="questioncircle" size={24} color="black" />
              <Text style={style.bottomInsideContainerText}>Help Center</Text>
            </View>
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
    backgroundColor: "#F0F0F0",
    paddingStart: 15,
    paddingEnd: 15,
  },
  scrollViewContent: {
    height: "100%",
  },

  insideView: {
    alignItems: "center",

    width: "100%",
  },
  topView: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "500",
    marginStart: 5,
    color: "black",
  },
  profilImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  profilNameView: {
    marginStart: 5,
    height: "100%",
    width: "45%",
  },
  iconView: {
    height: "100%",
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  subContainers: {
    justifyContent: "center",
    width: "100%",
    height: 250,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 4,
    marginTop: 15,
  },
  pormotionBanner: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  options: {
    height: 60,
    borderWidth: 1,
    width: "100%",
    marginTop: 16,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "#d3d3d3",
  },
  optionsInside: {
    marginStart: 12,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  optionsDes: {
    fontSize: 13,
  },
  bottomContainer: {
    marginTop: 15,
    flexDirection: "row",
    width: "100%",
  },
  bottomInsideContainer: {
    width: "44%",
    margin: 10,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "#d3d3d3",
  },
  bottomInsideContainerText: {
    marginStart: 10,
  },
  logoutButton: {
    width: 200,
    height: 40,
    marginTop: 15,
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
