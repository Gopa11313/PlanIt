import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView, StyleSheet } from "react-native";

export default function SignUpScreen({ navigation, route }) {
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={style.contianer}>
      <Text>Sign up page</Text>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  contianer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
