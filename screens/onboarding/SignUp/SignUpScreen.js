import { Text, StyleSheet, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = ({ navigation }) => {
  const handleSignUp = () => {
    navigation.navigate("Dashboard");
  };

  const gotoLogin = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});

export default SignUp;
