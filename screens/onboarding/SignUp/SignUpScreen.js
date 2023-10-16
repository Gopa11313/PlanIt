import { useState } from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../../firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

import Logo from "../../../assets/photos/logo.png";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const gotoLogin = () => {
    navigation.navigate("LoginScreen");
  };

  const createUser = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("User account created & signed in!");
        storeUserData();
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };
  const storeUserData = async () => {
    const userDetails = {
      name: name,
      email: email,
      userName: userName,
    };
    const insertedDocument = await addDoc(collection(db, "Users"), userDetails);
    navigation.navigate("Dashboard");
  };
  const signUP = () => {
    createUser();
  };
  return (
    <SafeAreaView style={style.container}>
      <View style={style.topView}>
        <Image source={Logo} style={style.logo} />
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
          value={name}
          onChangeText={setName}
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
          value={email}
          onChangeText={setEmail}
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
          value={userName}
          onChangeText={setUserName}
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
          value={password}
          onChangeText={setPassword}
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
        <Pressable onPress={createUser}>
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
    marginBottom: 20,
  },
  inputContainer: {
    width: "90%",
    marginVertical: 30,
  },

  signInButton: {
    width: "50%",
    height: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 50,
    // marginTop: 20,
    // marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
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
