import { useEffect } from "react";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TextInput,
  Text,
  View,
} from "react-native";

export default function LoginScreen({ navigation, rute }) {
  const handleLogIn = () => {
    navigation.navigate("Dashboard");
  };

  const gotoSignUp = () => {
    navigation.navigate("SignUpScreen");
  };

  useEffect(() => {}, []);
  return (
    <SafeAreaView style={style.container}>
      <View>
        <Text style={style.appName}>PlanIt</Text>
      </View>
      <View style={style.inputContainer}>
        <TextInput placeholder="Email/Username" />
        <TextInput placeholder="Password" />
      </View>

      <View style={style.loginButton}>
        <Pressable onPress={handleLogIn}>
          <Text style={style.loginButton}>Login</Text>
        </Pressable>
      </View>

      <View style={style.gotoSignUp}>
        <Pressable onPress={gotoSignUp}>
          <Text>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 300,
    height: 130,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginVertical: 10,
    borderWidth: 5,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
  },
  loginButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
