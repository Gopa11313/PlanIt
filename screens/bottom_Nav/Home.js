import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import Location from "../../assets/location.png";
import MainSection from "../../assets/mainSection.png";

import Gurkirat from "../../assets/gurkirat.png";
export default function Home() {
  return (
    <SafeAreaView style={styles.continer}>
      <View style={styles.insideView}>
        <View style={styles.locationCase}>
          <Image style={styles.locationImage} source={Location} />
          <Text style={styles.location}>Sherwood Park, Toronto, ON</Text>
        </View>
        <Text style={styles.profileName}>Gurkirat, JT</Text>
        <View style={styles.mainSection}>
          <ImageBackground
            style={styles.mainImage}
            source={MainSection}
            resizeMode="contain"
          >
            <View style={styles.mainInsideView}>
              <Image style={styles.profileImage} source={Gurkirat} />
            </View>
          </ImageBackground>
        </View>
      </View>
    </SafeAreaView>
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
  },
});
