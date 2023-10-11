import { useEffect, useState } from "react";
import { Image } from "react-native";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import Logo from "../../../assets/photos/logo.png";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogIn = async () => {
    try {
      const auth = getAuth(); // Initialize the auth object
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in successfully!", userCredential.user.uid);
      navigation.navigate("Dashboard");
    } catch (error) {
      alert(error);
      console.error("Error during login:", error);
    }
  };

  const gotoSignUp = () => {
    navigation.navigate("SignUpScreen");
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.topView}>
        <Image source={Logo} style={style.logo} />
        <Text style={style.appName}>PlanIt</Text>
      </View>

      <View style={style.inputContainer}>
        <TextInput
          label="Email"
          right={<TextInput.Icon icon="email" />}
          mode="flat"
          value={email}
          onChangeText={setEmail}
          style={{ margin: 10, backgroundColor: "#ededed" }}
          activeUnderlineColor="#4285F4"
          underlineColor="yellow"
        />
        <TextInput
          label="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          right={<TextInput.Icon icon="eye" />}
          style={{ margin: 10, backgroundColor: "#ededed" }}
          activeUnderlineColor="black"
          underlineColor="yellow"
        />
      </View>

      <View style={style.loginButton}>
        <Pressable onPress={handleLogIn}>
          <Text style={style.buttonText}>Login</Text>
        </Pressable>
      </View>

      <View style={style.gotoSignUp}>
        <Text>New Here? </Text>
        <Pressable onPress={gotoSignUp}>
          <Text style={style.gotoSignUpBtn}>Sign Up</Text>
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
  topView: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
    objectFit: "fill",
  },
  appName: {
    fontSize: 40,
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    marginBottom: 50,
  },
  inputContainer: {
    width: "90%",
    marginVertical: 30,
  },
  loginButton: {
    width: "50%",
    height: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 100,
    // marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  gotoSignUp: {
    // flex: 1,
    flexDirection: "row",
  },
  gotoSignUpBtn: {
    fontWeight: "700",
    color: "#4285F4",
  },
});
