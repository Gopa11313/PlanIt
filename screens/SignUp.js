import * as React from "react";
import { Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = ({ navigation }) => {
  const handleSignUp = () => {
    navigation.navigate("Home");
  };

  const gotoLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView>
      <TextInput placeholder="Full Name" />
      <TextInput placeholder="Email" />
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" />
      <TextInput placeholder="Re-Enter Password" />
      <Pressable onPress={handleLogIn}>Sign Up</Pressable>

      <Text>Already a user?</Text>
      <Pressable onPress={gotoLogin}>Login</Pressable>
    </SafeAreaView>
  );
};
