import { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
} from "react-native";
import Logo from "../../assets/photos/logo.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SplashScreen({ navigation, route }) {
  const auth = getAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  useEffect(async () => {
    const value = await AsyncStorage.getItem("userDocId");
    if (value != null) {
      navigation.navigate("Dashboard");
    } else {
      navigation.navigate("WelcomePage");
    }
  }, []);
  return (
    <SafeAreaView style={style.contianer}>
      <Image style={style.img} source={Logo} />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  contianer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  img: {
    height: 300,
    width: 300,
    objectFit: "fill",
  },
  title: {
    color: "black",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "600",
  },
});
