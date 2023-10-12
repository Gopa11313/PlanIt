import { StatusBar, View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const SignUp = ({ navigation }) => {
  const handleSignUp = () => {
    navigation.navigate("Dashboard");
  };

  const gotoLogin = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <SafeAreaView style={style.container}>
      <View>
        <Text style={style.appName}>PlanIt</Text>
      </View>
      <View style={style.inputContainer}>
        <TextInput
          label="Name"
          right={
            <TextInput.Icon
              icon={() => <Icon name="person" size={24} color="black" />}
            />
          }
          mode="flat"
          style={{ margin: 10, backgroundColor: "#ededed" }}
          activeUnderlineColor="#4285F4"
          underlineColor="black"
        />
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
          label="Username"
          right={
            <TextInput.Icon
              icon={() => (
                <Icon name="account-circle" size={24} color="black" />
              )}
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
        <TextInput
          label="Re-Password"
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
      <View style={style.signInButton}>
        <Pressable onPress={handleSignUp}>
          <Text style={style.buttonText}>Sign Up</Text>
        </Pressable>
      </View>

      <View style={style.gotoLogin}>
        <Text>Already a member? </Text>
        <Pressable onPress={gotoLogin}>
          <Text style={style.gotoLoginBtn}>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

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
    marginBottom: 30,
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
  signInButton: {
    width: "50%",
    height: 60,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 100,
    // marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  gotoLogin: {
    // flex: 1,
    flexDirection: "row",
  },
  gotoLoginBtn: {
    fontWeight: "700",
    color: "#4285F4",
  },
});

export default SignUp;
