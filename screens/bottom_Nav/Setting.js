import React from "react";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View, SafeAreaView } from "react-native";
import Gurkirat from "../../assets/gurkirat.png";
import { ScrollView } from "react-native";
import GurkiSecond from "../../assets/gurkiSecond.png";
export default function Settings() {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView style={style.scrollView}>
        <View style={style.insideView}>
          <Image source={Gurkirat} style={style.profileImage} />
          <Text style={style.name}>Gurkirat, JT</Text>
          <Image style={style.image} source={GurkiSecond} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "top",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F0F0F0",
  },
  scrollView: {
    width: "100%",
  },
  insideView: {
    padding: 20,
    width: "100%",
    alignItems: "center",
  },
  profileImage: { width: 150, height: 150, borderRadius: 200 / 2 },
  name: {
    fontSize: 22,
    margin: 10,
    fontWeight: "500",
  },
  image: {
    width: "100%",
    marginTop: 15,
    height: 250,
    borderRadius: 10,
  },
});
