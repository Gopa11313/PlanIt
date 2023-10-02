import { useEffect } from "react";
import { StatusBar, Text } from "react-native";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

export default function SignUpScreen({ navigation, route }) {
  const handleSignUp = () => {
    navigation.navigate("Dashboard");
  };

  const gotoLogin = () => {
    navigation.navigate("Login");
  };
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={style.contianer}>
      <TextInput placeholder="Full Name" />
      <TextInput placeholder="Email" />
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" />
      <TextInput placeholder="Re-Enter Password" />
      <Pressable onPress={handleSignUp}>
        <Text>Sign Up</Text>
      </Pressable>

      <Text>Already a user?</Text>
      <Pressable onPress={gotoLogin}>
        <Text>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  contianer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
