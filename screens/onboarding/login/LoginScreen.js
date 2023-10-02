import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, StatusBar } from "react-native";
export default function LoginScreen({ navigation, rute }) {
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={style.contianer}>
      <Text>Login Page</Text>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  contianer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
