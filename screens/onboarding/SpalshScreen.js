import { useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
export default function SplashScreen({ navigation, route }) {
  useEffect(() => {
    navigation.navigate("WelcomePage");
  }, 4000);
  return (
    <SafeAreaView style={style.contianer}>
      <Text>Gopal Spash</Text>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  contianer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
