import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  StatusBar,
  View,
  Image,
} from "react-native";
import Logo from "../../../assets/photos/logo.png";
import Welcome1 from "../../../assets/photos/welcome_img1.jpg";
import Welcome2 from "../../../assets/photos/welcome_img2.jpg";
import Welcome3 from "../../../assets/photos/welcome_img3.jpg";
import PagerView from "react-native-pager-view";
export default function WelcomePageScreen({ navigation, route }) {
  useEffect(() => {}, []);
  const [pressedItemm, setPressedItem] = useState(0);
  const onNextPress = () => {
    if (pressedItemm === 2) {
      navigation.navigate("LoginScreen");
    } else {
      setPressedItem(pressedItemm + 1);
    }
  };
  return (
    <SafeAreaView style={style.contianer}>
      <Image style={style.logo} source={Logo} />
      <PagerView
        style={style.pagerView}
        initialPage={pressedItemm}
        collapsable={false}
      >
        <View style={style.page} key="1">
          <Image style={style.img} source={Welcome1} />
          <Text style={style.description}>
            Find your interest, Events and make {"\n"}
            friends
          </Text>
        </View>
        <View style={style.page} key="2">
          <Image style={style.img} source={Welcome2} />
          <Text style={style.description}>
            Personalize and fine your events
            {"\n"} and interest
          </Text>
        </View>
        <View style={style.page} key="3">
          <Image style={style.img} source={Welcome3} />
          <Text style={style.description}>
            Find events near you all based on {"\n"} your interest
          </Text>
        </View>
      </PagerView>

      <Pressable onPress={onNextPress} style={style.btnCase}>
        <Text style={style.btnText}> Next</Text>
      </Pressable>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  contianer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  logo: {
    height: 60,
    width: 70,
    objectFit: "fill",
  },
  pagerView: {
    width: "100%",
    height: "65%",
    alignContent: "center",
  },
  page: {
    flex: 1,
    justifyContent: "center", // Horizontal center
    alignItems: "center",
  },
  btnCase: {
    color: "white",
    height: "5%",
    width: 90,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  btnText: {
    color: "white",
  },
  img: {
    width: "100%",
    height: "60%",
    objectFit: "fill",
  },
  description: {
    alignItems: "center",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
