import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as React from "react";

const SelectionScreen = ({ navigation }) => {
  const gotoLogin = () => {
    navigation.navigate("Login");
  };

  const gotoSignUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <SafeAreaView>
      <Text>Planit</Text>
      <Pressable onPress={gotoLogin}>Login</Pressable>
      <Pressable onPress={gotoSignUp}>Sign Up</Pressable>
    </SafeAreaView>
  );
};
