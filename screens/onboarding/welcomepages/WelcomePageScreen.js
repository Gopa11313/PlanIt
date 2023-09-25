import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, Pressable } from "react-native";
import PagerView from "react-native-pager-view";
export default function WelcomePageScreen({ navigation, route }) {
  useEffect(() => {}, []);
  const [pressedItemm, setPressedItem] = useState(1);
  const onNextPress = () => {
    if (pressedItemm == 3) {
      navigation.navigate("LoginScreen");
    }
    setPressedItem(pressedItemm + 1);
  };
  return (
    <SafeAreaView style={style.contianer}>
      <PagerView initialPage={0}>
        <View key="1">
          <Text>First page</Text>
          <Text>Swipe ➡️</Text>
        </View>
        <View key="2">
          <Text>Second page</Text>
        </View>
        <View key="3">
          <Text>Third page</Text>
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
  },
  btnCase: {
    color: "white",
    height: 40,
    width: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  btnText: {
    color: "white",
  },
});
