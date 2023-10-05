import React from "react";
import { StyleSheet, Pressable, TextInput, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = ({ navigation }) => {
  const handleLogIn = () => {
    navigation.navigate("Dashboard");
  };

  const gotoSignUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <SafeAreaView style={styles.container}>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default Login;
