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
import { v4 as uuidv4 } from "uuid";
import Logo from "../../../assets/photos/logo.png";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errors, setErrors] = useState({});

  const gotoLogin = () => {
    navigation.navigate("LoginScreen");
  };

  const validateInputs = () => {
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
    }

    if (!userName) {
      errors.userName = "Username is required";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password !== rePassword) {
      errors.rePassword = "Passwords do not match";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    return email.includes("@"); // Implement more robust email validation if needed
  };

  const createUser = () => {
    if (validateInputs()) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("User account created & signed in!");
          storeUserData();
        })
        .catch((error) => {
          console.error("Sign up failed:", error);
        });
    }
  };

  const storeUserData = async () => {
    const userDetails = {
      Id: uuidv4(),
      name: name,
      email: email,
      userName: userName,
    };
    const insertedDocument = await addDoc(collection(db, "Users"), userDetails);
    console.log("docID: " + insertedDocument.id);
    await AsyncStorage.setItem(
      "userDocId",
      JSON.stringify(insertedDocument.id)
    );
    navigation.navigate("Dashboard");
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
        {errors.name && <Text style={style.errorText}>{errors.name}</Text>}
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
        {errors.email && <Text style={style.errorText}>{errors.email}</Text>}
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
        {errors.userName && (
          <Text style={style.errorText}>{errors.userName}</Text>
        )}
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
        {errors.password && (
          <Text style={style.errorText}>{errors.password}</Text>
        )}
        <TextInput
          label="Re-Password"
          right={
            <TextInput.Icon
              icon={() => <Icon name="lock" size={24} color="black" />}
            />
          }
          secureTextEntry={true}
          mode="flat"
          value={rePassword}
          onChangeText={setRePassword}
          style={{ margin: 10, backgroundColor: "#ededed" }}
          activeUnderlineColor="#4285F4"
          underlineColor="black"
        />
        {errors.rePassword && (
          <Text style={style.errorText}>{errors.rePassword}</Text>
        )}
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
    marginVertical: 20, // Reduced margin to fit smaller screens
  },
  input: {
    margin: 10,
    backgroundColor: "#ededed",
  },
  signInButton: {
    width: "50%",
    height: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 30, // Reduced margin to fit smaller screens
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  gotoLogin: {
    flexDirection: "row",
  },
  gotoLoginBtn: {
    fontWeight: "700",
    color: "#4285F4",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
  },
});

export default SignUp;
