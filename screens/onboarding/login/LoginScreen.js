import { useEffect } from "react";
import { StyleSheet, Pressable, TextInput, Text } from "react-native";
export default function LoginScreen({ navigation, rute }) {
  const handleLogIn = () => {
    navigation.navigate("Dashboard");
  };

  const gotoSignUp = () => {
    navigation.navigate("SignUp");
  };
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={style.container}>
      <TextInput placeholder="Email/Username" />
      <TextInput placeholder="Password" />
      <Pressable onPress={handleLogIn}>
        <Text>Login</Text>
      </Pressable>

      <Text>New to PlanIt?</Text>
      <Pressable onPress={gotoSignUp}>
        <Text>Sign Up</Text>
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
