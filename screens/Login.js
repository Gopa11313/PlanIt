import * as React from "react";
import { Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = ({ navigation }) => {
  const handleLogIn = () => {
    navigation.navigate("Home");
  };
  const gotoSignUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <SafeAreaView>
      <TextInput placeholder="Email/Username" />
      <TextInput placeholder="Password" />
      <Pressable onPress={handleLogIn}>Login</Pressable>

      <Text>New to PlanIt?</Text>
      <Pressable onPress={gotoSignUp}>Sign Up</Pressable>
    </SafeAreaView>
  );
};
