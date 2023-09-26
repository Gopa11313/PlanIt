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
export default function SplashScreen({ navigation, route }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    navigation.navigate("WelcomePage");
  }, 4000);
  return (
    <SafeAreaView style={style.contianer}>
      <Animated.View
        style={[
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Image style={style.img} source={Logo} />
      </Animated.View>

      <Text style={style.title}>PlantIt</Text>
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
    height: 250,
    width: 250,
    objectFit: "fill",
  },
  title: {
    color: "black",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "600",
  },
});
