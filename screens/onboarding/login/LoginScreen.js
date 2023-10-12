import { useEffect } from "react";
import { StatusBar, StyleSheet, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/MaterialIcons";

export default function LoginScreen({ navigation, route }) {
  const Login = ({ navigation }) => {
    const handleLogIn = () => {
      navigation.navigate("Dashboard");
    };
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
        <TextInput
          label="Email"
          right={
            <TextInput.Icon
              icon={() => <Icon name="email" size={24} color="black" />}
            />
          }
          mode="flat"
          style={{ margin: 10, backgroundColor: "#ededed" }}
          activeUnderlineColor="#4285F4"
          underlineColor="black"
        />
        <TextInput
          label="Password"
          right={
            <TextInput.Icon
              icon={() => <Icon name="lock" size={24} color="black" />}
            />
          }
          secureTextEntry={true}
          mode="flat"
          style={{ margin: 10, backgroundColor: "#ededed" }}
          activeUnderlineColor="#4285F4"
          underlineColor="black"
        />
      </View>

      <View style={style.loginButton}>
        <Pressable onPress={Login}>
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
  logo: {
    width: 300,
    height: 130,
  },
  appName: {
    fontSize: 40,
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    marginBottom: 100,
  },
  inputContainer: {
    width: "80%",
    marginVertical: 30,
  },
  // textinput: {
  //   borderWidth: 5,

  //   borderColor: "#ccc",
  //   borderRadius: 5,
  //   paddingHorizontal: 10,
  //   height: 40,
  // },
  loginButton: {
    width: "50%",
    height: 60,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 150,
    // marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
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
